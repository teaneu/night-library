import {createRemoteJWKSet,jwtVerify,SignJWT,type JWTPayload} from 'jose';
import type {Env,User} from './types';

const encoder=new TextEncoder();
const googleKeys=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
const SESSION_SECONDS=60*60*24*30;
type Flow={state:string;verifier:string;nonce:string};
const privateHeaders={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow'};
export const json=(data:unknown,status=200)=>Response.json(data,{status,headers:privateHeaders});

export function appOrigin(env:Env):string|null{
  try{
    const u=new URL(env.APP_URL);
    const local=['localhost','127.0.0.1','[::1]'].includes(u.hostname);
    if(u.username||u.password||u.pathname!=='/'||u.search||u.hash||(u.protocol!=='https:'&&!(local&&u.protocol==='http:')))return null;
    return u.origin;
  }catch{return null;}
}
export function configured(env:Env):boolean{
  return !!(appOrigin(env)&&env.DB&&env.GOOGLE_CLIENT_ID?.endsWith('.apps.googleusercontent.com')&&env.GOOGLE_CLIENT_SECRET&&env.SESSION_SECRET&&env.SESSION_SECRET.length>=32);
}
export function base64url(bytes:Uint8Array):string{
  return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
}
export const randomToken=()=>base64url(crypto.getRandomValues(new Uint8Array(32)));
export async function digest(value:string){return base64url(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value))));}
function name(request:Request,kind:'session'|'flow'){
  return `${new URL(request.url).protocol==='https:'?'__Host-':''}nl-${kind}`;
}
function cookie(request:Request,kind:'session'|'flow',value:string,age:number){
  const secure=new URL(request.url).protocol==='https:'?'; Secure':'';
  return `${name(request,kind)}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${age}${secure}`;
}
function readCookie(request:Request,kind:'session'|'flow'){
  const key=name(request,kind)+'=';
  return request.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(key))?.slice(key.length)??'';
}
function redirect(location:string,cookies:string[]=[]){
  const headers=new Headers({...privateHeaders,Location:location});
  for(const value of cookies)headers.append('Set-Cookie',value);
  return new Response(null,{status:303,headers});
}
function setupPage(){
  return new Response('<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>로그인 연결 안내</title><body><main><h1>로그인 연결을 준비하고 있어요.</h1><p>읽기와 해설은 지금도 이용할 수 있어요. 운영자의 Google 로그인·데이터베이스 설정 후 기록 저장이 열립니다.</p><a href="/study/">학습 화면으로 돌아가기</a></main></body></html>',{status:503,headers:{...privateHeaders,'Content-Type':'text/html; charset=utf-8'}});
}

export function validateGoogleClaims(p:JWTPayload,clientId:string,nonce:string){
  if(p.nonce!==nonce||typeof p.sub!=='string'||!p.sub.length||p.sub.length>255||typeof p.email!=='string'||p.email.length>320||p.email_verified!==true||(p.azp!==undefined&&p.azp!==clientId))throw Error('Invalid Google identity');
  return {id:'google:'+p.sub,email:p.email,name:typeof p.name==='string'&&p.name.trim()?p.name.trim().slice(0,100):p.email.split('@')[0].slice(0,100)};
}

type Dependencies={fetcher?:typeof fetch;verifyIdToken?:(token:string,clientId:string)=>Promise<JWTPayload>};
export async function verifyGoogleIdToken(token:string,clientId:string,keys:Parameters<typeof jwtVerify>[1]=googleKeys){
  const {payload}=await jwtVerify(token,keys,{algorithms:['RS256'],issuer:['https://accounts.google.com','accounts.google.com'],audience:clientId,requiredClaims:['exp','iat','sub','nonce'],clockTolerance:30,maxTokenAge:'10 minutes'});
  return payload;
}
export function createAuth(deps:Dependencies={}){
  const fetcher=deps.fetcher??((input,init)=>fetch(input,init));
  const verifyIdToken=deps.verifyIdToken??verifyGoogleIdToken;
  return {
    async login(request:Request,env:Env){
      if(request.method!=='GET')return json({error:'허용되지 않은 요청입니다.'},405);
      if(!configured(env))return setupPage();
      if(new URL(request.url).origin!==appOrigin(env))return json({error:'등록된 사이트 주소에서 로그인해 주세요.'},400);
      const flow:Flow={state:randomToken(),verifier:randomToken(),nonce:randomToken()};
      const token=await new SignJWT(flow).setProtectedHeader({alg:'HS256'}).setIssuer('night-library').setAudience('google-flow').setIssuedAt().setExpirationTime('10 minutes').sign(encoder.encode(env.SESSION_SECRET!));
      const url=new URL('https://accounts.google.com/o/oauth2/v2/auth');
      url.search=new URLSearchParams({client_id:env.GOOGLE_CLIENT_ID,redirect_uri:appOrigin(env)+'/auth/callback',response_type:'code',scope:'openid email profile',state:flow.state,nonce:flow.nonce,code_challenge:await digest(flow.verifier),code_challenge_method:'S256',prompt:'select_account'}).toString();
      return redirect(url.href,[cookie(request,'flow',token,600)]);
    },
    async callback(request:Request,env:Env){
      if(request.method!=='GET')return json({error:'허용되지 않은 요청입니다.'},405);
      if(!configured(env))return setupPage();
      if(new URL(request.url).origin!==appOrigin(env))return json({error:'사이트 주소가 일치하지 않습니다.'},400);
      const clear=cookie(request,'flow','',0);
      const fail=(kind='failed')=>redirect('/study/?auth_error='+kind,[clear]);
      try{
        const raw=readCookie(request,'flow');if(!raw||raw.length>3000)return fail('expired');
        const {payload}=await jwtVerify(raw,encoder.encode(env.SESSION_SECRET!),{algorithms:['HS256'],issuer:'night-library',audience:'google-flow',requiredClaims:['exp','iat']});
        const flow=payload as JWTPayload&Flow;
        const params=new URL(request.url).searchParams;
        if(typeof flow.state!=='string'||typeof flow.verifier!=='string'||typeof flow.nonce!=='string'||params.get('state')!==flow.state)return fail();
        if(params.has('error'))return fail('cancelled');
        const code=params.get('code');if(!code||code.length>4096)return fail();
        const response=await fetcher('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:env.GOOGLE_CLIENT_ID,client_secret:env.GOOGLE_CLIENT_SECRET!,code,grant_type:'authorization_code',redirect_uri:appOrigin(env)+'/auth/callback',code_verifier:flow.verifier}),signal:AbortSignal.timeout(10000)});
        if(!response.ok)return fail();
        const tokens=await response.json() as {id_token?:string};
        if(typeof tokens.id_token!=='string'||tokens.id_token.length>16000)return fail();
        const profile=validateGoogleClaims(await verifyIdToken(tokens.id_token,env.GOOGLE_CLIENT_ID),env.GOOGLE_CLIENT_ID,flow.nonce);
        const token=randomToken();const hash=await digest(token);const now=Math.floor(Date.now()/1000);
        const old=readCookie(request,'session');
        const statements=[
          env.DB.prepare('INSERT INTO auth_users(id,email,display_name,updated_at) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET email=excluded.email,display_name=excluded.display_name,updated_at=excluded.updated_at').bind(profile.id,profile.email,profile.name,new Date().toISOString()),
          env.DB.prepare('INSERT INTO auth_sessions(token_hash,user_id,expires_at) VALUES (?,?,?)').bind(hash,profile.id,now+SESSION_SECONDS),
          env.DB.prepare('DELETE FROM auth_sessions WHERE expires_at<=?').bind(now),
        ];
        if(/^[A-Za-z0-9_-]{43}$/.test(old))statements.push(env.DB.prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await digest(old)));
        await env.DB.batch(statements);
        return redirect('/study/',[clear,cookie(request,'session',token,SESSION_SECONDS)]);
      }catch{return fail();}
    },
  };
}

export async function getUser(request:Request,env:Env):Promise<User|null>{
  if(!configured(env)||new URL(request.url).origin!==appOrigin(env))return null;
  const token=readCookie(request,'session');if(!/^[A-Za-z0-9_-]{43}$/.test(token))return null;
  const row=await env.DB.prepare('SELECT u.id,u.display_name FROM auth_sessions s JOIN auth_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').bind(await digest(token),Math.floor(Date.now()/1000)).first<{id:string;display_name:string}>();
  return row?{userId:row.id,displayName:row.display_name}:null;
}
export async function logout(request:Request,env:Env){
  if(request.method!=='POST')return json({error:'로그아웃은 버튼으로 요청해 주세요.'},405);
  if(!appOrigin(env)||request.headers.get('origin')!==appOrigin(env)||new URL(request.url).origin!==appOrigin(env))return json({error:'요청한 사이트를 확인할 수 없습니다.'},403);
  const token=readCookie(request,'session');
  if(env.DB&&/^[A-Za-z0-9_-]{43}$/.test(token))await env.DB.prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await digest(token)).run();
  return redirect('/',[cookie(request,'session','',0),cookie(request,'flow','',0)]);
}
