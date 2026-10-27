import {useCallback,useEffect,useRef,useState} from 'react';
import {BookOpen,CheckCircle2,ChevronDown,NotebookPen,Smartphone,Bookmark,ArrowRight} from 'lucide-react';
import {englishLessons} from './english-lessons';

export type ScreenPreference='auto'|'mobile';
export type StudyPanel='read'|'practice'|'vocabulary';
const preferenceKey='engldam-screen';

export function useMobileLayout(){
  const [preference,setPreference]=useState<ScreenPreference>('auto');
  const [narrow,setNarrow]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia('(max-width: 800px)');
    const sync=()=>setNarrow(media.matches);
    sync();media.addEventListener('change',sync);
    try{if(localStorage.getItem(preferenceKey)==='mobile')setPreference('mobile');}catch{}
    return()=>media.removeEventListener('change',sync);
  },[]);
  const changePreference=useCallback((next:ScreenPreference)=>{
    setPreference(next);
    try{localStorage.setItem(preferenceKey,next);}catch{}
  },[]);
  return {preference,compact:narrow||preference==='mobile',changePreference};
}

export function ScreenSettings({preference,compact,onChange}:{preference:ScreenPreference;compact:boolean;onChange:(next:ScreenPreference)=>void}){
  return <div className="en-screen-settings">
    <label htmlFor="en-screen-preference"><Smartphone size={17}/>화면 보기</label>
    <select id="en-screen-preference" value={preference} onChange={e=>onChange(e.target.value==='mobile'?'mobile':'auto')}>
      <option value="auto">자동 · 기기에 맞춤</option><option value="mobile">모바일 보기</option>
    </select>
    <span>{compact?'한 번에 한 화면씩 편하게':'원문과 해석을 나란히'}</span>
  </div>;
}

const panels=[{id:'read',label:'원문',Icon:BookOpen},{id:'practice',label:'해석·해설',Icon:NotebookPen},{id:'vocabulary',label:'단어',Icon:Bookmark}] as const;
export function StudyTabs({selected,onChange}:{selected:StudyPanel;onChange:(next:StudyPanel)=>void}){
  const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  return <div className="en-study-tabs" role="tablist" aria-label="학습 화면">
    {panels.map(({id,label,Icon},index)=><button key={id} ref={el=>{tabs.current[index]=el;}} id={'en-tab-'+id} type="button" role="tab" aria-selected={selected===id} aria-controls={'en-panel-'+id} tabIndex={selected===id?0:-1} onClick={()=>onChange(id)} onKeyDown={e=>{
      let next=index;
      if(e.key==='ArrowRight')next=(index+1)%panels.length;
      else if(e.key==='ArrowLeft')next=(index+panels.length-1)%panels.length;
      else if(e.key==='Home')next=0;
      else if(e.key==='End')next=panels.length-1;
      else return;
      e.preventDefault();onChange(panels[next].id);tabs.current[next]?.focus();
    }}><Icon size={17}/>{label}</button>)}
  </div>;
}

export function LessonChooser({selected,isComplete,onChoose}:{selected:string;isComplete:(id:string)=>boolean;onChoose:(id:string)=>void}){
  const [open,setOpen]=useState(false);
  const current=englishLessons.find(a=>a.id===selected)!;
  const number=englishLessons.indexOf(current)+1;
  return <section className="en-lesson-chooser" aria-label="학습할 글 선택">
    <div className="en-current-lesson">
      <span className="en-current-number">{String(number).padStart(2,'0')}<small> / {englishLessons.length}</small></span>
      <div><small>{current.category}</small><p lang="en">{current.title}</p></div>
      <button type="button" aria-expanded={open} aria-controls="en-lesson-options" onClick={()=>setOpen(!open)}>{open?'목록 닫기':'지문 바꾸기'}<ChevronDown size={17}/></button>
    </div>
    <div id="en-lesson-options" hidden={!open}>
      <div className="en-lesson-picker">{englishLessons.map((a,i)=><button type="button" key={a.id} className={selected===a.id?'selected':''} aria-pressed={selected===a.id} onClick={()=>{onChoose(a.id);setOpen(false);}}>
        <span className="en-lesson-number">{String(i+1).padStart(2,'0')}</span><span><small>{a.category}</small><b>{a.title}</b></span>{isComplete(a.id)?<CheckCircle2 size={18}/>:<ArrowRight size={18}/>}</button>)}
      </div>
    </div>
  </section>;
}
