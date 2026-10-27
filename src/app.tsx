import {useEffect,useState} from 'react';
import EnglishRoom from './english-room';
export default function App(){
  const [user,setUser]=useState<{id:string;name:string}|null>(null);
  const [message,setMessage]=useState('');
  useEffect(()=>{
    const errors:Record<string,string>={cancelled:'로그인을 취소했어요.',failed:'로그인을 완료하지 못했어요. 다시 시도해 주세요.',expired:'로그인 요청이 만료됐어요. 다시 시작해 주세요.'};
    const url=new URL(window.location.href);const error=url.searchParams.get('auth_error');
    if(error){setMessage(errors[error]??errors.failed);url.searchParams.delete('auth_error');window.history.replaceState(null,'',url.pathname+url.search+url.hash);}
    let active=true;
    fetch('/api/session',{cache:'no-store'}).then(async r=>{if(!r.ok)throw Error();return r.json() as Promise<{user:{id:string;name:string}|null;loginAvailable:boolean}>;}).then(d=>{if(active){setUser(d.user);if(!d.loginAvailable)setMessage('읽기와 해설은 이용할 수 있어요. 로그인·저장 기능은 운영자의 연결 설정 후 열립니다.');}}).catch(()=>{if(active)setMessage('로그인 상태를 확인하지 못했어요. 새로고침 후 다시 시도해 주세요.');});
    return()=>{active=false;};
  },[]);
  return <>{message&&<div className="setup-notice" role="status">{message}</div>}<EnglishRoom key={user?.id??'guest'} user={user}/></>;
}
