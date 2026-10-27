import {englishLessons,catalogWords} from '../src/english-lessons';
import {z} from 'zod';
import type {User} from './types';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store'}});
const text=(n:number)=>z.string().trim().min(1).max(n).refine(v=>!v.includes('\0'));
async function readBody(request:Request){
 const limit=110000;
 if(Number(request.headers.get('content-length')??0)>limit)throw new RangeError('body limit');
 const reader=request.body?.getReader();if(!reader)return '';
 const decoder=new TextDecoder();let bytes=0,result='';
 try{while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>limit){await reader.cancel();throw new RangeError('body limit');}result+=decoder.decode(value,{stream:true});}return result+decoder.decode();}finally{reader.releaseLock();}
}
const schema=z.discriminatedUnion('type',[
 z.object({type:z.literal('practice'),articleId:text(80),translations:z.array(z.string().max(4000)).max(20),reviewed:z.array(z.boolean()).max(20),completed:z.boolean()}),
 z.object({type:z.literal('catalog'),id:text(240)}),
 z.object({type:z.literal('custom'),id:z.string().regex(/^custom:[0-9a-f-]{36}$/),articleId:text(80),term:text(80),meaning:text(300),example:z.string().trim().max(600)}),
 z.object({type:z.literal('review'),id:text(240),known:z.boolean()}),
 z.object({type:z.literal('deleteWord'),id:text(240)}),
 z.object({type:z.literal('deletePractice'),articleId:text(80)})
]);
export async function GET(request:Request, db:D1Database, user:User|null){
 if(!user)return json({error:'로그인한 뒤 학습 기록을 불러올 수 있어요.'},401);
 const cursor=new URL(request.url).searchParams.get('cursor')??'';
 if(cursor.length>240||cursor.includes('\0'))return json({error:'단어장 주소를 확인해 주세요.'},400);
 try{
  const ids=englishLessons.map(a=>a.id);const marks=ids.map(()=>'?').join(',');
  const words=await db.prepare('SELECT id,article_id,term,meaning,example,known,reviews,updated_at FROM english_vocabulary WHERE user_id=? AND id>? ORDER BY id LIMIT 51').bind(user.userId,cursor).all();
  const rows=words.results.slice(0,50);
  const vocabulary=rows.map(w=>({id:w.id,articleId:w.article_id,term:w.term,meaning:w.meaning,example:w.example,known:!!w.known,reviews:w.reviews,updatedAt:w.updated_at}));
  const nextCursor=words.results.length>50?String(rows[rows.length-1].id):null;
  if(cursor)return json({vocabulary,nextCursor});
  const [sessions,old,legacy,count]=await Promise.all([
   db.prepare(`SELECT article_id,translations,reviewed,completed,updated_at FROM english_practice WHERE user_id=? AND article_id IN (${marks})`).bind(user.userId,...ids).all(),
   db.prepare(`SELECT article_id,translation,updated_at FROM readings WHERE user_id=? AND article_id IN (${marks})`).bind(user.userId,...ids).all(),
   db.prepare(`SELECT w.word_key,w.created_at FROM words w WHERE w.user_id=? AND w.word_key IN (${catalogWords.map(()=>'?').join(',')}) AND NOT EXISTS(SELECT 1 FROM english_vocabulary v WHERE v.user_id=w.user_id AND v.id=('catalog:' || w.word_key))`).bind(user.userId,...catalogWords.map(w=>w.id.slice(8))).all(),
   db.prepare('SELECT COUNT(*) AS total FROM english_vocabulary WHERE user_id=?').bind(user.userId).first<{total:number}>()
  ]);
  const legacyWords=legacy.results.flatMap(w=>{const c=catalogWords.find(c=>c.id===`catalog:${w.word_key}`);return c?[{...c,known:false,reviews:0,updatedAt:String(w.created_at)}]:[]});
  return json({vocabulary:[...vocabulary,...legacyWords],nextCursor,totalWords:Number(count?.total??0)+legacyWords.length,
   practices:sessions.results.map(s=>({articleId:s.article_id,translations:JSON.parse(String(s.translations)),reviewed:JSON.parse(String(s.reviewed)),completed:!!s.completed,updatedAt:s.updated_at})),
   legacyReadings:old.results.filter(r=>r.translation).map(r=>({articleId:r.article_id,translation:r.translation,updatedAt:r.updated_at}))});
 }catch{ return json({error:'기록을 불러오지 못했어요. 작성 중인 내용은 유지됩니다. 잠시 뒤 다시 시도해 주세요.'},503); }
}
export async function PUT(request:Request, db:D1Database, user:User|null){
 if(!user)return json({error:'로그인 후 저장할 수 있어요.'},401);
 if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'요청을 확인할 수 없어요.'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'요청 형식을 확인해 주세요.'},415);
 let v:z.infer<typeof schema>;
 try{const raw=await readBody(request);const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return json({error:'입력 길이와 내용을 확인해 주세요.'},400);v=parsed.data;}catch(e){return e instanceof RangeError?json({error:'한 번에 저장할 수 있는 분량을 넘었어요.'},413):json({error:'입력 내용을 확인해 주세요.'},400);}
 try{
  const now=new Date().toISOString();
  if(v.type==='practice'){
   const lesson=englishLessons.find(a=>a.id===v.articleId);if(!lesson||v.translations.length!==lesson.paragraphs.length||v.reviewed.length!==lesson.paragraphs.length)return json({error:'글과 문단 수를 확인해 주세요.'},400);
   if(v.completed&&(!v.translations.every(t=>t.trim())||!v.reviewed.every(Boolean)))return json({error:'모든 문단의 해석을 작성하고 피드백을 확인해 주세요.'},400);
   await db.prepare('INSERT INTO english_practice (user_id,article_id,translations,reviewed,completed,updated_at) VALUES (?,?,?,?,?,?) ON CONFLICT(user_id,article_id) DO UPDATE SET translations=excluded.translations,reviewed=excluded.reviewed,completed=excluded.completed,updated_at=excluded.updated_at').bind(user.userId,v.articleId,JSON.stringify(v.translations),JSON.stringify(v.reviewed),Number(v.completed),now).run();
   return json({ok:true,updatedAt:now});
  }
  if(v.type==='deletePractice'){
   if(!englishLessons.some(a=>a.id===v.articleId))return json({error:'글을 찾지 못했어요.'},400);
   await db.prepare('DELETE FROM english_practice WHERE user_id=? AND article_id=?').bind(user.userId,v.articleId).run();return json({ok:true});
  }
  if(v.type==='catalog'||v.type==='custom'){
   const word=v.type==='catalog'?catalogWords.find(w=>w.id===v.id):v;
   if(!word||!englishLessons.some(a=>a.id===word.articleId))return json({error:'단어를 확인해 주세요.'},400);
   await db.prepare('INSERT INTO english_vocabulary (user_id,id,article_id,term,meaning,example,known,reviews,updated_at) VALUES (?,?,?,?,?,?,0,0,?) ON CONFLICT(user_id,id) DO UPDATE SET term=excluded.term,meaning=excluded.meaning,example=excluded.example,updated_at=excluded.updated_at').bind(user.userId,word.id,word.articleId,word.term,word.meaning,word.example,now).run();
   const saved=await db.prepare('SELECT known,reviews FROM english_vocabulary WHERE user_id=? AND id=?').bind(user.userId,word.id).first<{known:number;reviews:number}>();
   return json({ok:true,word:{id:word.id,articleId:word.articleId,term:word.term,meaning:word.meaning,example:word.example,known:!!saved?.known,reviews:saved?.reviews??0,updatedAt:now}});
  }
  if(v.type==='review'){
   if(v.id.startsWith('catalog:')){const c=catalogWords.find(w=>w.id===v.id);if(!c)return json({error:'단어를 찾지 못했어요.'},404);
    const legacy=await db.prepare('SELECT word_key FROM words WHERE user_id=? AND word_key=?').bind(user.userId,v.id.slice(8)).first();
    if(legacy)await db.prepare('INSERT INTO english_vocabulary (user_id,id,article_id,term,meaning,example,known,reviews,updated_at) VALUES (?,?,?,?,?,?,0,0,?) ON CONFLICT(user_id,id) DO NOTHING').bind(user.userId,c.id,c.articleId,c.term,c.meaning,c.example,now).run();
   }
   const result=await db.prepare('UPDATE english_vocabulary SET known=?,reviews=reviews+1,updated_at=? WHERE user_id=? AND id=?').bind(Number(v.known),now,user.userId,v.id).run();
   if(!result.meta.changes)return json({error:'저장된 단어를 찾지 못했어요.'},404);return json({ok:true,updatedAt:now});
  }
  await db.batch([db.prepare('DELETE FROM english_vocabulary WHERE user_id=? AND id=?').bind(user.userId,v.id),db.prepare('DELETE FROM words WHERE user_id=? AND word_key=?').bind(user.userId,v.id.startsWith('catalog:')?v.id.slice(8):v.id)]);
  return json({ok:true});
 }catch{return json({error:'저장하지 못했어요. 작성 중인 내용을 그대로 두고 다시 시도해 주세요.'},503);}
}
