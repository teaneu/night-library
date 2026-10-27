import {renderToString,renderToStaticMarkup} from 'react-dom/server';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import type {ReactNode} from 'react';
import App from '../src/app';
import {articles} from '../src/articles';
import {englishLessons} from '../src/english-lessons';
import {SITE_NAME,SITE_ENGLISH_NAME,SITE_TITLE,SITE_DESCRIPTION,READING_PATH,GUIDE_PATH,lessonSearchInfo} from '../src/site';
import {PublicLayout,EnglishDirectory,StudyGuide,About,Privacy,ArticlePage} from './public-pages';

const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const jsonLd=(value:unknown)=>JSON.stringify(value).replaceAll('<','\\u003c');
type Route={path:string;title:string;description:string;node:ReactNode;kind?:'article'|'collection';articleId?:string};
type SearchVerification={googleVerification?:string;naverVerification?:string};

export async function render(origin:string,options:SearchVerification={}){
  if(origin){const u=new URL(origin);if(u.protocol!=='https:'||u.origin!==origin.replace(/\/$/,''))throw Error('SITE_URL은 경로 없는 실제 HTTPS 주소여야 합니다.');origin=u.origin;}
  const html=await readFile('dist/index.html','utf8');
  const styles=[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(x=>x[0]).join('');
  const publisher=process.env.ADSENSE_PUBLISHER_ID??'';
  if(publisher&&!/^ca-pub-\d{16}$/.test(publisher))throw Error('ADSENSE_PUBLISHER_ID 형식을 확인하세요.');
  let verification=publisher?`<meta name="google-adsense-account" content="${publisher}">`:'';
  for(const [name,value] of [['google-site-verification',options.googleVerification],['naver-site-verification',options.naverVerification]]){
    if(!value)continue;
    if(!/^[A-Za-z0-9_-]{8,256}$/.test(value))throw Error(name+' 확인 코드 형식을 확인하세요.');
    verification+=`<meta name="${name}" content="${escape(value)}">`;
  }

  const routes:Route[]=[
    {path:READING_PATH,title:'영어 독해 지문 모음 · 원문·해석·해설 | 잉글담',description:'과학·환경·통계 주제의 영어 독해 지문을 읽고 문단별 참고 해석과 구문 해설로 공부하세요. 핵심 단어와 예문, 직접 해석하는 연습 화면을 제공합니다.',kind:'collection',node:<EnglishDirectory/>},
    {path:GUIDE_PATH,title:'영어 독해 공부법 · 문장 해석과 단어 복습 | 잉글담',description:'영어 문장을 직접 해석하고 참고 번역과 비교하는 독해 공부법을 알아보세요. 실제 예문으로 주어·동사, 부분 부정, 단어장 복습 방법을 설명합니다.',node:<StudyGuide/>},
    {path:'/about/',title:'잉글담 소개 | 스스로 해석하는 영어 공부',description:'잉글담은 영어 읽기와 해석 연습, 참고 해설, 나만의 단어장과 학습 기록을 제공하는 영어 독해 학습 공간입니다. 운영과 학습 자료의 범위를 안내합니다.',node:<About/>},
    {path:'/privacy/',title:'개인정보 안내 | 잉글담',description:'잉글담의 Google 로그인, 학습 기록과 단어장, 필수 쿠키와 데이터 보관에 대한 안내입니다.',node:<Privacy/>},
    ...articles.map(a=>({path:'/read/'+a.id+'/',title:(lessonSearchInfo[a.id]?.title??a.title)+' | '+SITE_NAME,description:lessonSearchInfo[a.id]?.description??a.subtitle,kind:'article' as const,articleId:a.id,node:<ArticlePage id={a.id}/>})),
  ];

  function structuredData(r:Omit<Route,'node'>){
    if(!origin)return '';
    const url=origin+r.path;
    const page:Record<string,unknown>={'@type':r.kind==='collection'?'CollectionPage':'WebPage','@id':url+'#webpage',url,name:r.title,description:r.description,inLanguage:'ko',isPartOf:{'@id':origin+'/#website'}};
    const graph:Record<string,unknown>[]=[page];
    if(r.path==='/')graph.unshift({'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:SITE_NAME,alternateName:SITE_ENGLISH_NAME,inLanguage:'ko',description:SITE_DESCRIPTION});
    if(r.kind==='collection')page.mainEntity={'@type':'ItemList',itemListElement:englishLessons.map((a,i)=>({'@type':'ListItem',position:i+1,name:lessonSearchInfo[a.id]?.title??a.title,url:origin+'/read/'+a.id+'/'}))};
    if(r.articleId){
      const article=articles.find(a=>a.id===r.articleId)!;
      page.mainEntity={'@id':url+'#article'};
      graph.push({'@type':'Article','@id':url+'#article',headline:lessonSearchInfo[article.id]?.title??article.title,description:r.description,inLanguage:article.language==='en'?['en','ko']:'ko',mainEntityOfPage:{'@id':url+'#webpage'},author:{'@type':'Person',name:'teaneu',url:origin+'/about/'},articleSection:article.category,about:{'@type':'Thing',name:article.concept}});
    }
    if(r.path!=='/'){
      const crumbs=[{name:SITE_NAME,path:'/'}];
      if(r.articleId&&lessonSearchInfo[r.articleId])crumbs.push({name:'영어 독해 지문',path:READING_PATH});
      crumbs.push({name:r.articleId?(lessonSearchInfo[r.articleId]?.title??articles.find(a=>a.id===r.articleId)!.title):r.title.split(' | ')[0],path:r.path});
      graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:origin+c.path}))});
    }
    return `<script type="application/ld+json">${jsonLd({'@context':'https://schema.org','@graph':graph})}</script>`;
  }

  function head(r:Omit<Route,'node'>){
    const canonical=origin?`<link rel="canonical" href="${escape(origin+r.path)}"><meta property="og:url" content="${escape(origin+r.path)}"><meta property="og:image" content="${escape(origin+'/social-card.png')}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="잉글담 · 영어 독해와 해석 연습">`:'';
    return `<title>${escape(r.title)}</title><meta name="description" content="${escape(r.description)}"><meta name="robots" content="index, follow, max-image-preview:large"><meta property="og:site_name" content="${SITE_NAME}"><meta property="og:locale" content="ko_KR"><meta property="og:type" content="${r.kind==='article'?'article':'website'}"><meta property="og:title" content="${escape(r.title)}"><meta property="og:description" content="${escape(r.description)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(r.title)}"><meta name="twitter:description" content="${escape(r.description)}">${origin?`<meta name="twitter:image" content="${escape(origin+'/social-card.png')}">`:''}${verification}${canonical}${structuredData(r)}`;
  }

  const home={path:'/',title:SITE_TITLE,description:SITE_DESCRIPTION};
  const homeTemplate=html.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\b[^>]*name="description"[^>]*>/g,'');
  await writeFile('dist/index.html',homeTemplate.replace('<!--ssg-->',renderToString(<App/>)).replace('</head>',head(home)+'</head>'));
  for(const r of routes){
    const file='dist'+r.path+'index.html';await mkdir(dirname(file),{recursive:true});
    await writeFile(file,`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#254ee8"><link rel="icon" href="/favicon.svg">${styles}${head(r)}</head><body>${renderToStaticMarkup(r.node)}</body></html>`);
  }
  await writeFile('dist/404.html',`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>페이지를 찾지 못했어요 | 잉글담</title>${styles}</head><body>${renderToStaticMarkup(<PublicLayout><section className="info-sheet"><h1>이 페이지를 찾지 못했어요.</h1><a className="button primary" href="/">영어 해석 연습으로 돌아가기</a></section></PublicLayout>)}</body></html>`);
  await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /auth/\n'+(origin?'Sitemap: '+origin+'/sitemap.xml\n':''));
  if(origin){
    const paths=['/',...routes.filter(r=>r.path!=='/privacy/').map(r=>r.path)];
    await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+escape(origin+p)+'</loc></url>').join('')+'</urlset>');
  }
  console.log(`잉글담 정적 HTML 생성: 메인 + ${routes.length}개 페이지 + 404. 광고·분석 스크립트 없음.`);
}
