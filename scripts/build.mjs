import {build as viteBuild} from 'vite';
import {build} from 'esbuild';
import {mkdir,readFile} from 'node:fs/promises';
await viteBuild();
await mkdir('.cache',{recursive:true});
await build({entryPoints:['scripts/render.tsx'],outfile:'.cache/render.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic'});
const {render}=await import('../.cache/render.mjs');
const config=JSON.parse(await readFile('wrangler.json','utf8'));
await render(process.env.SITE_URL||config.vars.APP_URL||'',{
  googleVerification:process.env.GOOGLE_SITE_VERIFICATION||config.vars.GOOGLE_SITE_VERIFICATION||'',
  naverVerification:process.env.NAVER_SITE_VERIFICATION||config.vars.NAVER_SITE_VERIFICATION||'',
});
