import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync,mkdirSync,existsSync} from 'node:fs';
import {build} from 'esbuild';
import {SignJWT,generateKeyPair,exportJWK,createLocalJWKSet} from 'jose';

mkdirSync('.cache',{recursive:true});
await build({entryPoints:['worker/index.ts','worker/auth.ts','src/english-lessons.ts'],outdir:'.cache/tests',outbase:'.',bundle:true,platform:'node',format:'esm',packages:'external'});
const worker=(await import('../.cache/tests/worker/index.js')).default;
const {createAuth,getUser,logout,digest,validateGoogleClaims,verifyGoogleIdToken}=await import('../.cache/tests/worker/auth.js');
const {englishLessons,catalogWords}=await import('../.cache/tests/src/english-lessons.js');

function database(){
  const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');
  for(const file of readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sqlite.exec(readFileSync('migrations/'+file,'utf8'));
  const statement=(query,values=[])=>({bind(...v){return statement(query,v);},async all(){return {results:sqlite.prepare(query).all(...values)};},async first(){return sqlite.prepare(query).get(...values)??null;},async run(){return {meta:{changes:Number(sqlite.prepare(query).run(...values).changes)}};}});
  return {sqlite,prepare:statement,async batch(queries){sqlite.exec('BEGIN');try{const results=[];for(const q of queries)results.push(await q.run());sqlite.exec('COMMIT');return results;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
}
const origin='https://example.test';
const makeEnv=DB=>({DB,APP_URL:origin,GOOGLE_CLIENT_ID:'test.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'test-client-secret',SESSION_SECRET:'local-test-secret-only-do-not-use-in-production'});
const req=(path,init={})=>new Request(origin+path,init);
const cookiePair=(response,key)=>response.headers.getSetCookie().find(c=>c.startsWith(key+'='))?.split(';')[0];
async function session(db,id='alice',token='a'.repeat(43)){
  db.sqlite.prepare('INSERT OR IGNORE INTO auth_users VALUES (?,?,?,?)').run(id,id+'@example.test',id,new Date().toISOString());
  db.sqlite.prepare('INSERT OR REPLACE INTO auth_sessions VALUES (?,?,?)').run(await digest(token),id,Math.floor(Date.now()/1000)+3600);
  return '__Host-nl-session='+token;
}

test('guest sessions work before OAuth setup; forged identity headers never authenticate',async()=>{
  const db=database();const env=makeEnv(db);
  let response=await worker.fetch(req('/api/session'),{...env,GOOGLE_CLIENT_SECRET:''});
  assert.deepEqual(await response.json(),{user:null,loginAvailable:false});
  response=await worker.fetch(req('/api/english',{headers:{'oai-authenticated-user-id':'alice','oai-authenticated-user-email':'alice@example.test'}}),env);
  assert.equal(response.status,401);assert.match(response.headers.get('cache-control'),/no-store/);
  db.sqlite.close();
});

test('translation ownership, completion validation, CSRF, pagination and reviews use real SQLite',async()=>{
  const db=database();const env=makeEnv(db);const a=await session(db);const b=await session(db,'bob','b'.repeat(43));
  const call=(body,cookie=a,requestOrigin=origin)=>worker.fetch(req('/api/english',{method:'PUT',headers:{cookie,origin:requestOrigin,'content-type':'application/json'},body:JSON.stringify(body)}),env);
  const get=async(cookie=a,cursor='')=>{const r=await worker.fetch(req('/api/english'+(cursor?'?cursor='+encodeURIComponent(cursor):''),{headers:{cookie}}),env);assert.equal(r.status,200);return r.json();};
  const lesson=englishLessons[0];const p={type:'practice',articleId:lesson.id,translations:lesson.paragraphs.map(()=> '내 해석'),reviewed:lesson.paragraphs.map(()=>true),completed:true};
  assert.equal((await call(p,a,'https://evil.test')).status,403);
  assert.equal((await call({...p,reviewed:p.reviewed.map(()=>false)})).status,400);
  assert.equal((await call({...p,translations:['wrong paragraph count']})).status,400);
  assert.equal((await call({...p,translations:p.translations.map(()=> 'x'.repeat(4001))})).status,400);
  assert.equal((await call({padding:'x'.repeat(110001)})).status,413);
  assert.equal((await call(p)).status,200);assert.equal((await call(p)).status,200);
  assert.equal(db.sqlite.prepare('SELECT COUNT(*) n FROM english_practice').get().n,1);
  assert.equal((await get()).practices[0].completed,true);assert.equal((await get(b)).practices.length,0);
  const word=catalogWords[0];assert.equal((await call({type:'catalog',id:word.id})).status,200);
  assert.equal((await call({type:'review',id:word.id,known:true},b)).status,404);
  assert.equal((await call({type:'review',id:word.id,known:true})).status,200);
  assert.equal((await get()).vocabulary[0].reviews,1);
  assert.equal((await call({type:'deleteWord',id:word.id},b)).status,200);
  assert.equal((await get()).vocabulary.length,1);
  const custom={type:'custom',id:'custom:00000000-0000-4000-8000-000000000000',articleId:lesson.id,term:'a term',meaning:'뜻',example:'<script>alert(1)</script>'};
  for(let i=0;i<54;i++)assert.equal((await call({...custom,id:'custom:00000000-0000-4000-8000-'+String(i).padStart(12,'0')})).status,200);
  assert.equal((await call(custom)).status,200);
  const first=await get();assert.equal(first.totalWords,55);assert.equal(first.vocabulary.length,50);assert.ok(first.nextCursor);
  const next=await get(a,first.nextCursor);assert.equal(next.vocabulary.length,5);assert.equal(next.nextCursor,null);
  assert.equal(new Set([...first.vocabulary,...next.vocabulary].map(w=>w.id)).size,55);
  assert.equal((await get(b)).totalWords,0);
  db.sqlite.close();
});

test('legacy saved words still load and can be reviewed without duplicate counts',async()=>{
  const db=database();const env=makeEnv(db);const cookie=await session(db);const word=catalogWords[1];
  db.sqlite.prepare('INSERT INTO words VALUES (?,?,?)').run('alice',word.id.slice(8),new Date().toISOString());
  let r=await worker.fetch(req('/api/english',{headers:{cookie}}),env);let data=await r.json();assert.equal(data.totalWords,1);
  r=await worker.fetch(req('/api/english',{method:'PUT',headers:{cookie,origin,'content-type':'application/json'},body:JSON.stringify({type:'review',id:word.id,known:true})}),env);assert.equal(r.status,200);
  data=await (await worker.fetch(req('/api/english',{headers:{cookie}}),env)).json();assert.equal(data.totalWords,1);assert.equal(data.vocabulary[0].reviews,1);
  db.sqlite.close();
});

test('expired and modified session cookies fail closed; logout revokes the server session',async()=>{
  const db=database();const env=makeEnv(db);const cookie=await session(db);
  assert.equal((await getUser(req('/api/session',{headers:{cookie}}),env)).userId,'alice');
  assert.equal(await getUser(req('/api/session',{headers:{cookie:cookie.slice(0,-1)+'z'}}),env),null);
  assert.equal((await logout(req('/auth/logout',{method:'GET',headers:{cookie}}),env)).status,405);
  assert.equal((await logout(req('/auth/logout',{method:'POST',headers:{cookie,origin:'https://evil.test'}}),env)).status,403);
  const r=await logout(req('/auth/logout',{method:'POST',headers:{cookie,origin}}),env);assert.equal(r.status,303);assert.match(r.headers.get('set-cookie'),/Max-Age=0/);
  assert.equal(await getUser(req('/api/session',{headers:{cookie}}),env),null);
  await session(db);db.sqlite.prepare('UPDATE auth_sessions SET expires_at=0').run();assert.equal(await getUser(req('/api/session',{headers:{cookie}}),env),null);
  db.sqlite.close();
});

test('Google login binds state, nonce and PKCE to a signed HttpOnly cookie',async()=>{
  const db=database();const env=makeEnv(db);let called=0;let nonce='';let verifier='';
  const auth=createAuth({fetcher:async(url,init)=>{called++;assert.equal(url,'https://oauth2.googleapis.com/token');verifier=init.body.get('code_verifier');assert.equal(init.body.get('redirect_uri'),origin+'/auth/callback');return Response.json({id_token:'signed-token'});},verifyIdToken:async()=>({sub:'google-alice',email:'alice@example.test',email_verified:true,name:'Alice',nonce})});
  let login=await auth.login(req('/auth/login'),env);assert.equal(login.status,303);
  const u=new URL(login.headers.get('location'));nonce=u.searchParams.get('nonce');const state=u.searchParams.get('state');
  assert.equal(u.searchParams.get('code_challenge_method'),'S256');assert.equal(u.searchParams.get('redirect_uri'),origin+'/auth/callback');
  const flowCookie=cookiePair(login,'__Host-nl-flow');assert.ok(flowCookie);assert.match(login.headers.get('set-cookie'),/HttpOnly/);assert.match(login.headers.get('set-cookie'),/Secure/);
  let callback=await auth.callback(req('/auth/callback?state=wrong&code=test',{headers:{cookie:flowCookie}}),env);assert.equal(called,0);assert.match(callback.headers.get('location'),/auth_error/);
  callback=await auth.callback(req('/auth/callback?state='+state+'&code=test',{headers:{cookie:flowCookie}}),env);
  assert.equal(callback.status,303);assert.equal(callback.headers.get('location'),'/');assert.equal(called,1);assert.equal(await digest(verifier),u.searchParams.get('code_challenge'));
  const savedCookie=cookiePair(callback,'__Host-nl-session');assert.ok(savedCookie);assert.equal((await getUser(req('/api/session',{headers:{cookie:savedCookie}}),env)).userId,'google:google-alice');
  const row=db.sqlite.prepare('SELECT token_hash FROM auth_sessions').get();assert.notEqual(row.token_hash,savedCookie.split('=')[1]);
  assert.deepEqual(Object.keys(db.sqlite.prepare('SELECT * FROM auth_users').get()).sort(),['display_name','email','id','updated_at']);
  db.sqlite.close();
});

test('tampered OAuth cookies, missing configuration and alternate origins are rejected',async()=>{
  const db=database();const env=makeEnv(db);let called=0;
  const auth=createAuth({fetcher:async()=>{called++;throw Error('not expected');}});
  assert.equal((await auth.login(req('/auth/login'),{...env,SESSION_SECRET:''})).status,503);
  assert.equal((await auth.login(new Request('https://preview.test/auth/login'),env)).status,400);
  const r=await auth.callback(req('/auth/callback?state=x&code=y',{headers:{cookie:'__Host-nl-flow=forged'}}),env);assert.match(r.headers.get('location'),/auth_error/);assert.equal(called,0);
  db.sqlite.close();
});

test('real RSA ID-token verification checks issuer, audience, signature and expiration',async()=>{
  const {privateKey,publicKey}=await generateKeyPair('RS256');const jwk=await exportJWK(publicKey);jwk.kid='test';jwk.alg='RS256';const keys=createLocalJWKSet({keys:[jwk]});const client='test.apps.googleusercontent.com';
  const token=async({issuer='https://accounts.google.com',audience=client,expires='5 minutes'}={})=>new SignJWT({nonce:'n'}).setProtectedHeader({alg:'RS256',kid:'test'}).setIssuer(issuer).setAudience(audience).setSubject('123').setIssuedAt().setExpirationTime(expires).sign(privateKey);
  assert.equal((await verifyGoogleIdToken(await token(),client,keys)).sub,'123');
  await assert.rejects(verifyGoogleIdToken(await token({issuer:'https://evil.test'}),client,keys));
  await assert.rejects(verifyGoogleIdToken(await token({audience:'different-client'}),client,keys));
  await assert.rejects(verifyGoogleIdToken(await token({expires:'2 minutes ago'}),client,keys));
  const wrongKey=await generateKeyPair('RS256');const forged=await new SignJWT({nonce:'n'}).setProtectedHeader({alg:'RS256',kid:'test'}).setIssuer('https://accounts.google.com').setAudience(client).setSubject('123').setIssuedAt().setExpirationTime('5 minutes').sign(wrongKey.privateKey);
  await assert.rejects(verifyGoogleIdToken(forged,client,keys));
  assert.throws(()=>validateGoogleClaims({sub:'123',email:'a@example.test',email_verified:true,nonce:'wrong'},client,'n'));
  assert.throws(()=>validateGoogleClaims({sub:'123',email:'a@example.test',email_verified:false,nonce:'n'},client,'n'));
});

test('static output contains crawlable lesson text and does not bundle credentials or old auth routes',()=>{
  for(const lesson of englishLessons){assert.equal(lesson.paragraphs.length,lesson.guides.length);assert.equal(lesson.paragraphs.length,lesson.translation.length);assert.ok(lesson.guides.every(g=>g.structure&&g.checks.length&&g.natural));}
  const html=readFileSync('dist/index.html','utf8');assert.ok(html.includes(englishLessons[0].paragraphs[0]));assert.ok(html.includes('개인정보'));
  const routes=JSON.parse(readFileSync('dist/_routes.json','utf8'));assert.deepEqual(routes.include,['/api/*','/auth/*']);
  for(const file of readdirSync('dist/assets').filter(f=>f.endsWith('.js'))){const js=readFileSync('dist/assets/'+file,'utf8');assert.equal(js.includes('GOOGLE_CLIENT_SECRET'),false);assert.equal(js.includes('SESSION_SECRET'),false);assert.equal(js.includes('signin-with-chatgpt'),false);}
  assert.equal(html.includes('adsbygoogle.js'),false);assert.ok(readFileSync('dist/privacy/index.html','utf8').includes('Google'));
});

test('public learning pages are discoverable, consistently branded and keep private routes out of indexing',()=>{
  const origin=JSON.parse(readFileSync('wrangler.json','utf8')).vars.APP_URL;
  const files=readdirSync('dist',{recursive:true}).filter(f=>f==='index.html'||f.endsWith('/index.html'));
  const titles=new Set();const descriptions=new Set();
  for(const file of files){
    const html=readFileSync('dist/'+file,'utf8');
    const path=file==='index.html'?'/':'/'+file.slice(0,-'index.html'.length);
    const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
    const description=html.match(/<meta name="description" content="([^"]*)"/s)?.[1];
    assert.ok(title?.includes('잉글담'),file);assert.ok(description?.length>20,file);
    assert.equal(titles.has(title),false,'duplicate page title');titles.add(title);
    assert.equal(descriptions.has(description),false,'duplicate page description');descriptions.add(description);
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,file+' needs one main heading');
    assert.equal(html.includes('밤의 서재'),false,file);
    assert.equal(html.includes('meta name="keywords"'),false,'avoid keyword stuffing');
    assert.match(html,/<meta property="og:site_name" content="잉글담"/);
    if(origin){
      assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],origin+path);
      const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1]||'null');
      assert.equal(schema?.['@context'],'https://schema.org');
      assert.ok(schema['@graph'].some(n=>n.url===origin+path),file);
      if(path==='/')assert.equal(schema['@graph'].find(n=>n['@type']==='WebSite')?.name,'잉글담');
    }
    for(const match of html.matchAll(/<a\b[^>]*href="(\/[^"#]*)"/g)){
      const url=new URL(match[1],origin||'https://example.test');
      if(url.pathname.startsWith('/auth/'))continue;
      assert.ok(existsSync('dist'+url.pathname+(url.pathname.endsWith('/')?'index.html':'')),'broken public link: '+match[1]+' in '+file);
    }
  }
  assert.ok(files.includes('english-reading/index.html'));
  assert.ok(files.includes('english-reading-guide/index.html'));
  for(const lesson of englishLessons){
    const html=readFileSync('dist/read/'+lesson.id+'/index.html','utf8');
    assert.ok(html.includes(lesson.paragraphs[0]));assert.ok(html.includes(lesson.translation[0]));
    assert.ok(html.includes('핵심 영어 단어와 예문'));assert.ok(html.includes('참고 해석·구문 해설 보기'));
  }
  if(origin){const sitemap=readFileSync('dist/sitemap.xml','utf8');assert.ok(sitemap.includes(origin+'/english-reading/'));assert.ok(sitemap.includes(origin+'/english-reading-guide/'));assert.equal(/\/api\/|\/auth\/|\?/.test(sitemap.replace(/^<\?xml[^>]*>/,'')),false);}
  const png=readFileSync('dist/social-card.png');assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  assert.match(readFileSync('dist/404.html','utf8'),/name="robots" content="noindex"/);
});
