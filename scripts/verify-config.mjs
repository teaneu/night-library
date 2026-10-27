import {readFileSync} from 'node:fs';
const c=JSON.parse(readFileSync('wrangler.json','utf8'));
if(!c.d1_databases[0].database_id||c.d1_databases[0].database_id==='00000000-0000-0000-0000-000000000000'){
  console.error('배포 전 D1을 만들고 실제 database_id를 wrangler.json에 설정하세요. README.md 2단계를 확인하세요.');
  process.exit(1);
}
console.log('D1 배포 설정 확인 완료. Google 로그인은 추가 설정 후 활성화됩니다.');
