import {spawn} from 'node:child_process';
const args=process.argv.slice(2);
const value=(key,fallback)=>{const i=args.indexOf(key);return i>=0?args[i+1]:fallback;};
const port=value('--port','8787');
const ip=value('--host','127.0.0.1');
const child=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','pages','dev','dist','--ip',ip,'--port',port,'--inspector-port','0'],{stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
