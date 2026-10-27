import {createAuth,configured,appOrigin,getUser,json,logout} from './auth';
import {GET,PUT} from './english-api';
import type {Env} from './types';
const auth=createAuth();
export default {
  async fetch(request:Request,env:Env):Promise<Response>{
    const path=new URL(request.url).pathname;
    try{
      if(path==='/auth/login')return await auth.login(request,env);
      if(path==='/auth/callback')return await auth.callback(request,env);
      if(path==='/auth/logout')return await logout(request,env);
      if(path==='/api/session'){
        if(request.method!=='GET')return json({error:'허용되지 않은 요청입니다.'},405);
        const user=await getUser(request,env);
        return json({user:user?{id:user.userId,name:user.displayName}:null,loginAvailable:configured(env)&&new URL(request.url).origin===appOrigin(env)});
      }
      if(path==='/api/health')return json({ok:true,storageConfigured:!!env.DB,loginConfigured:configured(env)});
      if(path==='/api/english'){
        const user=await getUser(request,env);
        if(request.method==='GET')return await GET(request,env.DB,user);
        if(request.method==='PUT')return await PUT(request,env.DB,user);
        return json({error:'허용되지 않은 요청입니다.'},405);
      }
      if(path.startsWith('/api/')||path.startsWith('/auth/'))return json({error:'주소를 찾지 못했습니다.'},404);
      if(request.method!=='GET'&&request.method!=='HEAD')return json({error:'허용되지 않은 요청입니다.'},405);
      return env.ASSETS?env.ASSETS.fetch(request):json({error:'주소를 찾지 못했습니다.'},404);
    }catch{
      console.error('Engldam request failed:',path);
      return json({error:'요청을 처리하지 못했어요. 작성 중인 내용은 그대로 두고 잠시 뒤 다시 시도해 주세요.'},503);
    }
  },
};
