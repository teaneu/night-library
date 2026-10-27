import {readFileSync,writeFileSync} from 'node:fs';
import {parseArgs} from 'node:util';
const {values}=parseArgs({options:{'database-id':{type:'string'},'site-url':{type:'string'},'google-client-id':{type:'string'},name:{type:'string'}}});
const config=JSON.parse(readFileSync('wrangler.json','utf8'));
if(values['database-id']){
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(values['database-id'])||/^0{8}-/.test(values['database-id']))throw Error('실제 D1 database_id를 입력하세요.');
  config.d1_databases[0].database_id=values['database-id'];
}
if(values['site-url']){
  const u=new URL(values['site-url']);
  if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/')throw Error('경로 없는 실제 HTTPS 사이트 주소를 입력하세요.');
  config.vars.APP_URL=u.origin;
}
if(values['google-client-id']){
  if(!values['google-client-id'].endsWith('.apps.googleusercontent.com'))throw Error('Google 웹 애플리케이션 클라이언트 ID를 입력하세요.');
  config.vars.GOOGLE_CLIENT_ID=values['google-client-id'];
}
if(values.name){if(!/^[a-z0-9][a-z0-9-]{0,62}$/.test(values.name))throw Error('Worker 이름은 소문자·숫자·하이픈을 사용하세요.');config.name=values.name;}
writeFileSync('wrangler.json',JSON.stringify(config,null,2)+'\n');
console.log('wrangler.json을 업데이트했습니다. 비밀 키는 이 파일에 저장하지 마세요.');
