import {useEffect,useRef,useState} from 'react';
import type {KeyboardEvent,PointerEvent} from 'react';

const MIN_HEIGHT=120;
const MAX_HEIGHT=640;
const DEFAULT_HEIGHT=220;
const preferenceKey='engldam-source-height';
const clamp=(value:number)=>Math.max(MIN_HEIGHT,Math.min(MAX_HEIGHT,Math.round(value)));
type Drag={pointerId:number;startY:number;startHeight:number;latest:number};

export default function ResizableParagraph({compact,paragraph,index}:{compact:boolean;paragraph:string;index:number}){
  const [height,setHeight]=useState(DEFAULT_HEIGHT);
  const currentHeight=useRef(DEFAULT_HEIGHT);
  const content=useRef<HTMLDivElement>(null);
  const drag=useRef<Drag|null>(null);
  const applyHeight=(value:number)=>{const next=clamp(value);currentHeight.current=next;setHeight(next);return next;};
  const remember=(value:number)=>{try{localStorage.setItem(preferenceKey,String(value));}catch{}};
  useEffect(()=>{
    try{const value=Number(localStorage.getItem(preferenceKey));if(Number.isFinite(value)&&value>=MIN_HEIGHT&&value<=MAX_HEIGHT){currentHeight.current=Math.round(value);setHeight(Math.round(value));}}catch{}
  },[]);
  useEffect(()=>{if(content.current)content.current.scrollTop=0;},[paragraph,index]);

  function start(event:PointerEvent<HTMLDivElement>){
    if(event.isPrimary===false||event.button!==0||drag.current)return;
    event.preventDefault();
    // A touch resize should not dismiss the keyboard while the learner is typing.
    if(event.pointerType!=='touch')event.currentTarget.focus({preventScroll:true});
    drag.current={pointerId:event.pointerId,startY:event.clientY,startHeight:currentHeight.current,latest:currentHeight.current};
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event:PointerEvent<HTMLDivElement>){
    const active=drag.current;if(!active||active.pointerId!==event.pointerId)return;
    active.latest=applyHeight(active.startHeight+event.clientY-active.startY);
  }
  function finish(event:PointerEvent<HTMLDivElement>){
    const active=drag.current;if(!active||active.pointerId!==event.pointerId)return;
    drag.current=null;remember(active.latest);
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function resizeWithKeys(event:KeyboardEvent<HTMLDivElement>){
    let next=currentHeight.current;
    if(event.key==='ArrowDown')next+=24;
    else if(event.key==='ArrowUp')next-=24;
    else if(event.key==='Home')next=MIN_HEIGHT;
    else if(event.key==='End')next=MAX_HEIGHT;
    else return;
    event.preventDefault();remember(applyHeight(next));
  }

  return <div className={'en-source-frame'+(compact?' resizable':'')}>
    <div ref={content} id="en-active-paragraph" className="en-active-source" role="region" aria-label={`${index+1}번 문단 영어 원문`} tabIndex={0} style={compact?{height}:undefined}>
      <span lang="en">PARAGRAPH {String(index+1).padStart(2,'0')}</span><p lang="en">{paragraph}</p>
    </div>
    {compact&&<div className="en-source-resizer" role="separator" tabIndex={0} aria-label="영어 원문 높이" aria-describedby="en-source-resize-help" aria-controls="en-active-paragraph" aria-orientation="horizontal" aria-valuemin={MIN_HEIGHT} aria-valuemax={MAX_HEIGHT} aria-valuenow={height} aria-valuetext={`원문 칸 높이 ${height}픽셀`} onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish} onKeyDown={resizeWithKeys}>
      <span className="en-resize-grip" aria-hidden="true"/><span aria-hidden="true">끌어서 원문 높이 조절</span><span id="en-source-resize-help" className="sr-only">위아래로 끌거나 위아래 방향키로 원문 칸 높이를 조절하세요. 긴 내용은 원문 칸 안에서 스크롤할 수 있습니다.</span>
    </div>}
  </div>;
}
