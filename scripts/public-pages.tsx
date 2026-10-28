import type {ReactNode} from 'react';
import {articles} from '../src/articles';
import {englishLessons} from '../src/english-lessons';
import {SITE_NAME,READING_PATH,GUIDE_PATH,STUDY_PATH,ERROR_REPORT_LINK,ERROR_REPORT_EMAIL,lessonSearchInfo} from '../src/site';

export function PublicLayout({children,current}:{children:ReactNode;current?:string}){
  return <div className="workspace">
    <a className="skip-link" href="#main-content">본문으로 이동</a>
    <header className="topbar public-topbar">
      <a className="brand" href="/" aria-label="잉글담 홈"><span className="brand-mark"><img src="/favicon.svg" width="36" height="36" alt=""/></span><span>{SITE_NAME}<small>ENGLISH READING PRACTICE</small></span></a>
      <nav className="public-nav" aria-label="사이트 메뉴">{[[STUDY_PATH,'해석 연습'],[READING_PATH,'지문 모음'],[GUIDE_PATH,'공부 방법'],['/about/','소개']].map(([href,name])=><a key={href} href={href} aria-current={current===href?'page':undefined}>{name}</a>)}</nav>
    </header>
    <main className="public-main" id="main-content">{children}</main>
    <footer className="footer"><span>{SITE_NAME} <i>/</i> teaneu</span><nav aria-label="사이트 안내"><a href="/about/">소개</a><a href="/privacy/">개인정보</a><a href={ERROR_REPORT_LINK} title={ERROR_REPORT_EMAIL}>오류 제보</a></nav></footer>
  </div>;
}

function Breadcrumbs({title,lesson=false}:{title:string;lesson?:boolean}){
  return <nav className="reading-breadcrumbs" aria-label="현재 위치"><ol><li><a href="/">잉글담</a></li>{lesson&&<li><a href={READING_PATH}>영어 독해 지문</a></li>}<li aria-current="page">{title}</li></ol></nav>;
}

export function Home(){
  return <PublicLayout current="/">
    <section className="reading-heading welcome-heading">
      <p className="eyebrow">ABOUT ENGLDAM</p>
      <h1>영어를 읽고, 해석하고,<br/>내 것으로 담다.</h1>
      <p>잉글담은 영어 원문을 직접 한국어로 옮겨 보고, 참고 번역과 해설로 점검하며 배운 표현을 단어장에 담는 영어 독해 학습 공간입니다.</p>
      <div className="guide-actions welcome-actions"><a className="button primary" href={STUDY_PATH}>영어 공부 시작하기 <span aria-hidden="true">→</span></a><a className="button secondary" href={READING_PATH}>{englishLessons.length}편의 지문 둘러보기</a></div>
      <p className="reading-small-note welcome-note">원문·해석 연습·참고 해설은 로그인 없이 이용할 수 있어요.<br/>해석과 단어를 계정에 저장하려면 Google 로그인이 필요해요.</p>
    </section>
    <section className="welcome-steps" aria-labelledby="welcome-how">
      <h2 id="welcome-how">한 문단씩, 이렇게 공부해요.</h2>
      <div>
        <article><span>01</span><h3>내 말로 해석하기</h3><p>먼저 영어 원문을 읽고 한국어 해석을 적어 보세요. 잘 모르겠는 부분은 ?로 남겨도 괜찮아요.</p></article>
        <article><span>02</span><h3>참고 해설과 비교하기</h3><p>문단별 참고 번역과 구문 해설로 빠뜨린 의미를 확인해요. 해설은 미리 준비된 학습 자료예요.</p></article>
        <article><span>03</span><h3>단어를 담고 복습하기</h3><p>기억할 단어와 예문을 단어장에 저장하고, 카드로 다시 떠올려 보세요. 저장한 해석도 이어서 공부할 수 있어요.</p></article>
      </div>
    </section>
    <section className="info-sheet welcome-more"><h2>궁금한 주제를 영어로 읽어보세요.</h2><p>경제·심리·기술·과학·환경·통계까지, 다양한 주제의 영어 지문을 준비했어요. 휴대폰에서는 원문·해석·단어를 탭으로 전환하며 공부할 수 있습니다.</p><p>사용자가 작성한 해석을 자동 채점하거나 AI로 첨삭하는 기능은 현재 제공하지 않습니다. 참고 해설을 비교하며 스스로 점검하는 방식이에요.</p><a className="reading-text-link" href="/about/">잉글담의 학습 방식과 운영 안내 →</a></section>
  </PublicLayout>;
}

function LessonCards({exclude}:{exclude?:string}){
  return <div className="reading-cards">{englishLessons.filter(a=>a.id!==exclude).map(a=>{
    const info=lessonSearchInfo[a.id];
    return <article className="reading-card" key={a.id}>
      <p className="eyebrow">{a.category}</p><h2><a href={'/read/'+a.id+'/'}>{info?.title??a.title}</a></h2>
      <p className="reading-english-title" lang="en">{a.title}</p><p>{a.subtitle}</p>
      <p className="reading-card-focus">{info?.focus} · {a.paragraphs.length}문단 · 약 {a.minutes}분</p>
      <a className="reading-text-link" href={'/read/'+a.id+'/'}>원문·해석·해설 읽기 <span aria-hidden="true">→</span></a>
    </article>;
  })}</div>;
}

export function EnglishDirectory(){
  return <PublicLayout current={READING_PATH}><Breadcrumbs title="영어 독해 지문 모음"/>
    <section className="reading-heading"><p className="eyebrow">ENGLISH READING COLLECTION</p><h1>영어 독해 지문과<br/>문단별 해석·해설.</h1><p>경제·심리·기술·과학·환경·통계 이야기를 영어로 읽어보세요. 원문을 먼저 이해하고, 참고 번역과 문장 구조를 비교하며 나만의 해석을 다듬을 수 있습니다.</p><div className="reading-labels"><span>원문과 참고 해석</span><span>구문·표현 해설</span><span>예문이 있는 단어</span></div></section>
    <LessonCards/>
    <section className="info-sheet reading-how"><h2>영어 지문으로 공부하는 순서</h2><ol><li>원문을 한 문단씩 읽고 중심 내용을 생각합니다.</li><li>해석 연습 화면에서 자신의 말로 한국어 해석을 적습니다.</li><li>참고 번역과 해설을 열어 빠진 의미와 문장 연결을 확인합니다.</li><li>기억할 단어와 표현은 Google 로그인 후 단어장에 저장합니다.</li></ol><p>해설은 미리 준비한 학습 자료입니다. 작성한 해석을 자동 채점하거나 AI로 첨삭하는 기능은 현재 제공하지 않습니다.</p><a className="reading-text-link" href={GUIDE_PATH}>예문으로 보는 영어 독해 공부 방법 →</a></section>
  </PublicLayout>;
}

export function StudyGuide(){
  return <PublicLayout current={GUIDE_PATH}><Breadcrumbs title="영어 독해 공부 방법"/>
    <article className="info-sheet study-guide"><p className="eyebrow">READ · TRANSLATE · REMEMBER</p><h1>영어 독해 공부법:<br/>직접 해석하고 비교하기.</h1><p>번역을 읽을 때는 이해되는 문장도 혼자 해석하려면 막힐 수 있습니다. 잉글담에서는 짧은 영어 지문을 문단별로 읽고, 자신의 해석과 참고 해설을 비교하는 연습을 합니다. 처음부터 매끄럽게 번역하기보다 문장이 전하는 의미를 끝까지 따라가는 것이 목표입니다.</p>
      <nav className="guide-contents" aria-label="학습 방법 목차"><a href="#read">1. 문장의 뼈대 찾기</a><a href="#translate">2. 직접 해석하기</a><a href="#compare">3. 참고 해설로 점검하기</a><a href="#vocabulary">4. 단어를 문맥과 함께 복습하기</a></nav>
      <section id="read"><h2>1. 모르는 단어보다 문장의 뼈대부터</h2><p>원문을 한 번 읽으며 누가 무엇을 하는지 찾아보세요. 주어와 동사를 짚은 뒤, 앞뒤 문장을 잇는 표현을 살핍니다. because는 이유를, however는 흐름의 전환을 알려줍니다. 모르는 단어가 있어도 표시만 해 두고 문단 전체가 어떤 이야기를 하는지 먼저 생각해보세요.</p><p>긴 문장은 목적·이유·조건을 설명하는 덩어리로 나누면 읽기 수월합니다. 모든 단어의 사전 뜻을 찾기 전에, 그 덩어리가 앞 문장과 어떤 관계인지 확인하는 연습입니다.</p></section>
      <section id="translate"><h2>2. 영어 문장을 자신의 말로 옮기기</h2><p>잉글담의 <a href={STUDY_PATH+'?lesson=en-seeds'}>종자은행 지문</a>에는 다음 문장이 나옵니다.</p><blockquote lang="en">Keeping seeds alive is different from keeping them growing.</blockquote><p><strong>Keeping seeds alive</strong>는 “씨앗을 살아 있게 유지하는 것”, <strong>keeping them growing</strong>은 “씨앗이 계속 자라게 하는 것”입니다. <strong>is different from</strong>이 두 행동을 비교합니다. 따라서 “씨앗을 살아 있게 유지하는 것은 계속 자라게 하는 것과 다르다”로 옮길 수 있습니다.</p><p>여기서 them은 앞의 seeds를 받습니다. alive와 growing을 모두 “살다”로만 옮기면 이 문장의 중요한 차이가 사라집니다. 같은 주제를 가리키는 말과 대비되는 말을 함께 살펴보세요.</p><p>해석 연습 화면에서 문단 번호를 누르면 입력할 문단을 고를 수 있습니다. 잘 모르겠는 부분은 ?로 남기고, 먼저 이해한 내용을 적어도 괜찮습니다.</p></section>
      <section id="compare"><h2>3. 정답 문구보다 빠진 의미를 점검하기</h2><p>해석을 적은 다음 참고 번역과 구문 해설을 확인하세요. 단어 선택이 다르더라도 같은 의미를 전달하면 적절한 해석일 수 있습니다. 문장 구조, 부정의 범위, 원인과 결과, 비교 대상을 빠뜨리지 않았는지 살피는 편이 도움이 됩니다.</p><p>예를 들어 <strong lang="en">Not every seed can be treated this way.</strong>는 “모든 씨앗에 이 방법을 적용할 수 있는 것은 아니다”라는 부분 부정입니다. “어떤 씨앗에도 적용할 수 없다”로 옮기면 의미가 달라집니다. 틀린 표현 하나를 지우는 데서 끝내지 말고, 어떤 구조 때문에 뜻이 바뀌었는지 기록해보세요.</p><p>잉글담의 피드백은 미리 준비한 참고 해설입니다. 사용자의 해석을 AI가 분석하거나 정확도 점수를 매기지는 않습니다. 학습 완료 표시는 문단 작성과 해설 확인 여부를 나타냅니다.</p></section>
      <section id="vocabulary"><h2>4. 온라인 단어장에 뜻과 예문 함께 남기기</h2><p>새 단어는 본문에서 어떤 의미로 쓰였는지와 함께 남겨보세요. 단어 하나보다 <strong lang="en">draw a conclusion</strong>처럼 함께 쓰이는 표현을 통째로 저장하면 다음에 비슷한 문장을 읽을 때 떠올리기 좋습니다.</p><p>본문 옆의 + 버튼으로 단어를 담거나, 단어장에서 뜻과 예문을 직접 추가할 수 있습니다. Google 로그인 후 저장한 단어는 카드로 복습할 수 있고, 다시 볼 단어와 익숙한 단어를 구분할 수 있습니다.</p><p>다음 학습 때는 먼저 뜻을 가린 채 예문을 읽고 의미를 떠올려보세요. 저장한 해석도 다시 읽어보고, 처음에 어렵게 느꼈던 구조를 스스로 설명해보면 좋습니다.</p></section>
      <h2>잉글담에서 바로 시작하기</h2><p>영어 원문과 해설은 로그인 없이 읽을 수 있습니다. 해석과 단어를 계정에 저장하려면 Google 로그인이 필요합니다. 글은 운영자가 수동으로 추가하며, 매일 새 글이 자동 발행되는 서비스는 아닙니다.</p><div className="guide-actions"><a className="button primary" href={STUDY_PATH}>영어 공부 시작하기</a><a className="button secondary" href={READING_PATH}>영어 독해 지문 고르기</a></div>
    </article>
  </PublicLayout>;
}

export function About(){
  return <PublicLayout current="/about/"><Breadcrumbs title="잉글담 소개"/><section className="info-sheet"><p className="eyebrow">ABOUT ENGLDAM</p><h1>읽고, 해석하고,<br/>내 영어로 담다.</h1><p>잉글담은 영어 원문을 직접 한국어로 옮겨 보고, 준비된 해설과 참고 번역으로 점검하며 단어를 남기는 영어 독해 학습 공간입니다. English와 “담다”를 연결해, 읽은 문장과 배운 표현을 자신의 것으로 쌓아간다는 뜻을 담았습니다.</p><h2>스스로 해석하는 영어 공부</h2><p>원문을 읽고 문단별로 해석을 작성합니다. 전체 해석은 빈 줄로 나눠 붙여넣을 수 있습니다. 해설을 열면 참고 번역, 핵심 의미, 문장 구조와 자연스러운 표현을 함께 볼 수 있습니다. <a href={GUIDE_PATH}>영어 독해 공부 방법</a>에서 실제 예문으로 학습 순서를 확인할 수 있습니다.</p><h2>참고 해설의 범위</h2><p>사용자의 해석을 AI가 분석하거나 자동 채점하지 않습니다. 참고 번역과 달라도 같은 의미를 담았다면 적절한 해석일 수 있습니다. 학습 완료 표시는 문단 작성과 해설 확인 여부를 나타냅니다.</p><h2>나만의 단어장과 학습 기록</h2><p>본문의 단어를 담거나 뜻과 예문을 직접 추가하고, 카드로 복습할 수 있습니다. Google 계정으로 로그인하면 작성한 해석과 단어장, 복습 상태가 본인의 계정에 저장됩니다. 학습 기록을 다른 이용자에게 공개하는 기능은 없습니다.</p><h2>글을 만드는 방법과 운영</h2><p>운영자는 teaneu입니다. 공개 자료를 확인하고 AI를 활용해 학습용 글을 새로 작성했습니다. 참고 자료는 각 글에 표시합니다. 숫자 예시는 개념을 설명하기 위한 가상의 구성입니다. 글과 해설은 운영자가 수동으로 추가합니다.</p><h2>영어 독해 자료</h2><p><a href={READING_PATH}>영어 지문 모음</a>에서 다양한 주제의 원문·참고 해석·핵심 단어를 읽을 수 있습니다.</p><a className="button primary" href={STUDY_PATH}>영어 공부 시작하기</a></section></PublicLayout>;
}

export function ArticlePage({id}:{id:string}){
  const a=articles.find(a=>a.id===id)!;
  const lesson=englishLessons.find(a=>a.id===id);
  const info=lessonSearchInfo[id];
  return <PublicLayout><Breadcrumbs title={info?.title??a.title} lesson={!!lesson}/>
    <article className="article-sheet public-article">
      <div className="article-meta"><span>{a.category}</span><span>{a.minutes}분 읽기 · {a.paragraphs.length}문단</span></div>
      <header className="article-title-row"><div><h1 lang={lesson?'ko':a.language}>{info?.title??a.title}</h1>{lesson&&<p className="reading-english-title" lang="en">{a.title}</p>}<p className="article-subtitle">{a.subtitle}</p></div></header>
      <p className="reading-byline">작성·운영: teaneu · {SITE_NAME}</p>
      {lesson&&<><p className="reading-lead">{info?.description}</p><p><a className="button primary" href={STUDY_PATH+'?lesson='+a.id}>내 해석을 직접 써 보기</a></p><p className="reading-small-note">먼저 원문을 읽고 해석한 뒤 참고 해설을 열어보세요. 아래 자료는 미리 준비한 해설이며 자동 첨삭 결과가 아닙니다.</p></>}
      <div className="article-divider"/>
      {lesson?<div className="reading-paragraphs"><h2>영어 원문과 문단별 해석</h2>{lesson.paragraphs.map((p,i)=><section className="reading-paragraph" id={'paragraph-'+(i+1)} key={i}><h3>{String(i+1).padStart(2,'0')} · {lesson.guides[i].title}</h3><p lang="en" className="reading-original">{p}</p><details className="reading-explanation"><summary>참고 해석·구문 해설 보기</summary><div><h4>참고 번역</h4><p>{lesson.translation?.[i]}</p><h4>문장 구조와 표현</h4><p>{lesson.guides[i].structure}</p><p><strong>{lesson.guides[i].expression}</strong></p><h4>해석 점검</h4><ul>{lesson.guides[i].checks.map(c=><li key={c}>{c}</li>)}</ul><p>{lesson.guides[i].natural}</p></div></details></section>)}</div>:<div className="article-body" lang={a.language}>{a.paragraphs.map((p,i)=><p key={i}><span className="paragraph-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{p}</p>)}</div>}
      {lesson&&<section className="reading-vocabulary"><h2>핵심 영어 단어와 예문</h2><div className="reading-table-wrap"><table><thead><tr><th scope="col">단어·표현</th><th scope="col">뜻</th><th scope="col">예문</th></tr></thead><tbody>{a.vocabulary.map(w=><tr key={w.term}><th scope="row" lang="en">{w.term}</th><td>{w.meaning}</td><td lang="en">{w.example}</td></tr>)}</tbody></table></div><p className="reading-small-note">해석 연습 화면에서 Google 로그인 후 나만의 단어장에 담을 수 있습니다.</p></section>}
      <div className="public-reflection"><h2>생각해 볼 질문</h2><p>{a.prompt}</p></div>
      <div className="sources"><span>참고 자료</span>{a.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.name}</a>)}<p>공개 자료를 참고하고 AI를 활용하여 새로 작성한 학습용 글입니다. 사례와 비유는 이해를 돕기 위한 구성입니다.</p></div>
    </article>
    {lesson&&<><div className="public-after"><a className="button primary" href={STUDY_PATH+'?lesson='+a.id}>이 글로 영어 해석 연습하기</a><a className="button secondary" href={GUIDE_PATH}>독해 공부 방법 보기</a></div><section className="related-reading"><h2>다음에 읽을 영어 지문</h2><LessonCards exclude={id}/><a className="reading-text-link" href={READING_PATH}>영어 독해 지문 전체 보기 →</a></section></>}
  </PublicLayout>;
}

export function Privacy(){return <PublicLayout><section className="info-sheet"><p className="eyebrow">PRIVACY</p><h1>개인정보 안내</h1><p className="policy-date">적용일: 2026년 10월 28일 · 운영: teaneu</p><h2>로그인 없이 이용하기</h2><p>영어 본문과 해설은 로그인 없이 이용할 수 있습니다. 회원가입 양식으로 비밀번호나 전화번호를 받지 않습니다.</p><h2>Google 로그인과 계정</h2><p>로그인은 Google의 OpenID Connect 서비스를 이용합니다. Google이 확인한 계정 식별자, 이메일, 표시 이름을 계정 확인을 위해 Cloudflare D1에 보관합니다. Google 비밀번호, Google 액세스 토큰과 ID 토큰은 학습 데이터베이스에 저장하지 않습니다.</p><h2>저장하는 학습 정보</h2><p>계정별로 문단 해석, 해설 확인 여부, 학습 완료 상태와 저장 시각을 보관합니다. 단어장의 단어·뜻·예문, 복습 횟수와 익숙함 상태도 보관합니다. 다른 방문자에게 학습 기록을 공개하는 기능은 없습니다. 단어는 단어장에서 삭제할 수 있고, 저장한 기록은 학습 기록 화면에서 파일로 내보낼 수 있습니다. 전체 계정·기록을 직접 삭제하는 화면은 현재 제공하지 않습니다.</p><h2>쿠키와 기기 저장소</h2><p>로그인 요청 확인 쿠키는 최대 10분 동안 사용합니다. 로그인 상태를 유지하는 필수 쿠키와 서버 세션은 최대 30일 동안 유지하며, 로그아웃 시 현재 세션을 삭제합니다. 만료 세션은 로그인 처리 중 정리합니다. 서버에는 세션 토큰의 해시를 저장합니다.</p><p>화면 밝기·글자 크기·화면 보기·원문 칸 높이 설정은 로컬 저장소에, 저장 전 초안은 같은 탭의 세션 저장소에 보관합니다. 브라우저의 사이트 데이터 삭제 기능으로 기기 저장 내용을 제거할 수 있습니다. 서버에 저장한 기록은 별개입니다.</p><h2>외부 AI 전송</h2><p>현재 자동 첨삭 기능은 연결되어 있지 않습니다. 작성한 해석을 외부 AI API에 전송하지 않습니다.</p><h2>호스팅과 로그인 제공자</h2><p>페이지는 Cloudflare Pages, 로그인·저장은 Pages Functions와 D1에서 처리합니다. 제공자가 처리하는 로그인·접속 정보에는 해당 제공자의 정책이 적용됩니다. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare 개인정보처리방침</a>과 <a href="https://policies.google.com/privacy?hl=ko" target="_blank" rel="noreferrer">Google 개인정보처리방침</a>을 확인할 수 있습니다.</p><h2>광고와 방문 분석</h2><p>현재 Google AdSense 광고 스크립트와 별도의 방문 분석 코드는 설치하지 않았습니다. 심사용 계정 확인 메타 태그를 추가할 수 있으나, 이는 광고를 표시하는 스크립트와는 별개입니다. 실제 광고 또는 방문 분석을 도입할 때 이 안내와 필요한 동의 절차를 함께 갱신합니다.</p><p>Google 광고를 도입하면 Google과 파트너가 쿠키 등을 사용해 광고를 제공할 수 있습니다. 관련 설명은 <a href="https://policies.google.com/technologies/partner-sites?hl=ko" target="_blank" rel="noreferrer">Google 파트너 사이트 안내</a>에서 확인할 수 있습니다.</p></section></PublicLayout>;}
