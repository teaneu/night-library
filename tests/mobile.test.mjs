import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import {act,createElement} from 'react';
import {renderToString} from 'react-dom/server';

mkdirSync('.cache',{recursive:true});
await build({entryPoints:['src/english-room.tsx'],outfile:'.cache/mobile-room.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic'});

test('mobile study tabs, screen preference and lesson changes preserve drafts and allow account saving',async()=>{
  const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'https://example.test/',pretendToBeVisual:true});
  const w=dom.window;let width=390;
  const queries=[];
  w.matchMedia=query=>{
    const listeners=new Set();
    const media={media:query,get matches(){return query.includes('max-width: 800px')&&width<=800;},addEventListener(_type,listener){listeners.add(listener);},removeEventListener(_type,listener){listeners.delete(listener);},addListener(listener){listeners.add(listener);},removeListener(listener){listeners.delete(listener);},dispatch(){for(const listener of listeners)listener({matches:media.matches});}};
    queries.push(media);return media;
  };
  w.HTMLElement.prototype.scrollIntoView=function(){};w.scrollTo=()=>{};
  const originals=new Map();
  for(const [name,value] of Object.entries({window:w,document:w.document,navigator:w.navigator,HTMLElement:w.HTMLElement,localStorage:w.localStorage,sessionStorage:w.sessionStorage,requestAnimationFrame:callback=>setTimeout(()=>callback(0),0),cancelAnimationFrame:clearTimeout,IS_REACT_ACT_ENVIRONMENT:true})){
    originals.set(name,Object.getOwnPropertyDescriptor(globalThis,name));Object.defineProperty(globalThis,name,{value,writable:true,configurable:true});
  }
  const originalFetch=globalThis.fetch;const saved=[];
  globalThis.fetch=async(_url,init)=>{
    if(init?.method==='PUT'){saved.push(JSON.parse(init.body));return new Response(JSON.stringify({ok:true,updatedAt:'2026-10-28T00:00:00Z'}));}
    return new Response(JSON.stringify({practices:[],vocabulary:[],legacyReadings:[],nextCursor:null,totalWords:0}));
  };
  const {hydrateRoot,createRoot}=await import('react-dom/client');
  const {default:EnglishRoom}=await import('../.cache/mobile-room.mjs');
  const container=w.document.getElementById('root');let root;const hydrationErrors=[];
  const query=selector=>{const element=w.document.querySelector(selector);assert.ok(element,selector);return element;};
  const click=async element=>act(async()=>{element.click();});
  const select=async value=>act(async()=>{const element=query('#en-screen-preference');element.value=value;element.dispatchEvent(new w.Event('change',{bubbles:true}));});
  const resize=async next=>act(async()=>{width=next;for(const media of queries)media.dispatch();});
  try{
    container.innerHTML=renderToString(createElement(EnglishRoom,{user:null}));
    await act(async()=>{root=hydrateRoot(container,createElement(EnglishRoom,{user:null}),{onRecoverableError:error=>hydrationErrors.push(error)});});
    assert.deepEqual(hydrationErrors,[]);
    assert.equal(query('.english-app').dataset.compact,'true');
    assert.equal(w.document.querySelectorAll('[role="tab"]').length,3);
    assert.equal(query('#en-panel-read').hidden,false);
    assert.equal(query('#en-panel-practice').hidden,true);
    assert.equal(query('#en-lesson-options').hidden,true);
    await click(query('[aria-controls="en-lesson-options"]'));
    assert.equal(query('#en-lesson-options').hidden,false);
    const lessons=w.document.querySelectorAll('.en-lesson-picker>button');assert.equal(lessons.length,10);
    await click(lessons[9]);assert.equal(query('#en-lesson-options').hidden,true);
    assert.match(query('.en-current-number').textContent,/10\s*\/\s*10/);
    assert.match(w.location.search,/lesson=en-urban-heat/);
    await click(query('#en-tab-practice'));
    assert.equal(query('#en-panel-read').hidden,true);assert.equal(query('#en-panel-practice').hidden,false);
    await click(w.document.querySelectorAll('.en-part-tabs>button')[1]);
    const textarea=query('#en-translation');const draft='두 번째 문단을 직접 해석한 초안입니다.';
    await act(async()=>{
      Object.getOwnPropertyDescriptor(w.HTMLTextAreaElement.prototype,'value').set.call(textarea,draft);
      textarea.dispatchEvent(new w.Event('input',{bubbles:true}));
    });
    assert.equal(JSON.parse(w.sessionStorage.getItem('english-room:draft:guest'))['en-urban-heat'].translations[1],draft);
    await click(query('#en-tab-vocabulary'));assert.equal(query('#en-panel-vocabulary').hidden,false);
    await click(query('#en-tab-read'));await click(query('#en-tab-practice'));
    assert.equal(query('#en-translation'),textarea);assert.equal(textarea.value,draft);
    await select('mobile');assert.equal(w.localStorage.getItem('engldam-screen'),'mobile');
    await resize(1280);assert.equal(query('.english-app').dataset.compact,'true');
    await select('auto');assert.equal(query('.english-app').dataset.compact,'false');
    assert.equal(w.document.querySelector('[role="tablist"]'),null);
    assert.equal(query('#en-panel-read').hidden,false);assert.equal(query('#en-panel-practice').hidden,false);assert.equal(query('#en-panel-vocabulary').hidden,false);
    assert.equal(query('#en-translation').value,draft);
    await resize(375);
    const practiceTab=query('#en-tab-practice');practiceTab.focus();
    await act(async()=>{practiceTab.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));});
    assert.equal(query('#en-tab-vocabulary').getAttribute('aria-selected'),'true');assert.equal(w.document.activeElement,query('#en-tab-vocabulary'));
    assert.equal(w.document.querySelectorAll('[role="tab"][tabindex="0"]').length,1);
    await select('mobile');await resize(1280);
    await act(async()=>{root.unmount();});
    await act(async()=>{root=createRoot(container);root.render(createElement(EnglishRoom,{user:{id:'alice',name:'Alice'}}));});
    assert.equal(query('#en-screen-preference').value,'mobile');assert.equal(query('.english-app').dataset.compact,'true');
    await click(query('#en-tab-practice'));
    await click(query('.en-input-bottom .secondary'));
    assert.equal(saved.length,1);assert.equal(saved[0].articleId,'en-urban-heat');assert.equal(saved[0].translations[1],draft);
  }finally{
    if(root)await act(async()=>{root.unmount();});
    w.close();globalThis.fetch=originalFetch;
    for(const [name,descriptor] of originals){if(descriptor)Object.defineProperty(globalThis,name,descriptor);else delete globalThis[name];}
  }
});
