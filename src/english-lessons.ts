import { articles } from './articles';
import {additionalEnglishContent} from './english-expansion';

export type Guide = { title: string; structure: string; checks: string[]; expression: string; natural: string };
const guides: Record<string, Guide[]> = {
 'en-average': [
  {title:'비교의 출발점을 확인하기',structure:'before drawing a conclusion에서 before 뒤의 동명사는 “결론을 내리기 전에”입니다. did ... attract는 실제로 어떤 사람들이 모였는지를 묻습니다.',checks:['B의 완주 빈도가 A보다 높다는 비교를 옮겼나요?','마지막 질문을 “두 게임에 모인 플레이어 구성이 같았는가”로 이해했나요?'],expression:'draw a conclusion → 결론을 내리다',natural:'“같은 종류의 플레이어를 끌어들였는가”도 맞지만, 문맥에서는 “플레이어들의 구성이 같았을까”가 자연스럽습니다.'},
  {title:'가상의 예와 숫자 구분하기',structure:'made-up은 “지어낸, 가상의”입니다. nine of ten은 10명 중 9명이고, while은 두 결과를 대조합니다.',checks:['이 수치가 실제 조사 결과가 아니라 가상의 예라는 점을 남겼나요?','쉬운 단계와 어려운 단계의 분모를 각각 10명·100명으로 구분했나요?'],expression:'success rate → 성공률',natural:'Its rates의 its는 Game B를 가리킵니다. “그것의 비율”보다 “B의 성공률”로 옮기면 분명해집니다.'},
  {title:'범주별 결과와 전체 결과',structure:'Within both categories는 “두 범주 각각에서”입니다. out of는 전체 시도 가운데 성공한 수를 나타냅니다. has reversed는 이미 역전된 결과입니다.',checks:['각 난이도에서는 A가 더 높다는 뜻을 유지했나요?','합쳤을 때는 B의 전체 성공률이 높아진다는 역전을 옮겼나요?'],expression:'The order has reversed. → 순서가 뒤집혔다.',natural:'same number of attempts는 앞의 110번을 받습니다. 숫자를 반복해 “B도 110번 중 82번”이라고 써도 자연스럽습니다.'},
  {title:'차이의 원인은 구성 비율',structure:'comes from은 원인을, combine A with B는 두 요소가 함께 반영됨을 나타냅니다. ones는 levels를 대신합니다.',checks:['A에는 어려운 시도가, B에는 쉬운 시도가 많이 포함됐다고 옮겼나요?','전체 성공률에는 성과와 난이도 분포가 함께 섞인다는 뜻을 담았나요?'],expression:'the mixture of attempts → 시도의 구성',natural:'“난이도의 분배”보다는 “난이도 분포” 또는 “어떤 난이도에 얼마나 도전했는지”가 문맥에 맞습니다.'},
  {title:'rather than의 대조',structure:'can reverse는 “뒤집힐 수 있다”라는 가능성입니다. rather than은 앞의 해석에 무게를 두며, still은 두 사실이 동시에 성립함을 강조합니다.',checks:['항상 역전된다고 단정하지 않았나요?','“산술이 틀리다”가 아니라 “해석에 주의하라”는 뜻을 살렸나요?'],expression:'information that matters to a decision → 결정에 중요한 정보',natural:'“요약은 맞으면서도 중요한 정보를 가릴 수 있다”처럼 두 사실을 연결해 보세요.'},
  {title:'조건과 인과 주장의 한계',structure:'If ... 구문은 목적에 따라 유용한 비교가 달라진다는 조건입니다. Neither view ... proves는 두 관점 모두 그것만으로는 증명하지 못한다는 뜻입니다.',checks:['전체 결과 설명과 비슷한 조건의 난이도 비교를 구분했나요?','같은 사람이 게임을 바꿀 때의 결과까지 증명하는 것은 아니라는 부정을 옮겼나요?'],expression:'a causal claim → 인과관계에 관한 주장',natural:'informative는 단순히 “정보가 많은”보다 “판단에 도움이 되는 정보를 주는”으로 풀면 의미가 선명합니다.'},
  {title:'집단의 결과를 개인에게 옮기지 않기',structure:'is supported by는 근거가 뒷받침한다는 뜻입니다. is not에서는 supported가 생략되었습니다. moves from A to B는 주장 범위의 이동입니다.',checks:['B의 전체 성공 횟수가 더 많다는 주장만 예시로 뒷받침된다고 옮겼나요?','모든 플레이어에게 더 쉽다는 주장은 뒷받침되지 않는다고 옮겼나요?'],expression:'a mixed population → 구성이 섞인 집단',natural:'quietly changes the claim은 “주장을 조용히 바꾼다”보다 “주장의 범위를 슬쩍 바꾼다”가 자연스럽습니다.'},
  {title:'마지막 문장의 의미 연결',structure:'Before trusting it의 it은 평균입니다. who / how / which는 Ask에 연결된 세 질문입니다. means는 두 학습 내용을 연결합니다.',checks:['평균을 믿기 전에 비교 질문부터 분명히 하라는 제안을 옮겼나요?','숫자 뒤에는 포함 대상과 집단 구성에 관한 선택이 있다는 뜻을 담았나요?'],expression:'a compact answer → 압축된 답',natural:'notice the choices behind it은 “그 뒤의 선택을 알아차리다”, 더 풀면 “그 숫자가 만들어진 방식을 살피다”입니다.'}
 ],
 'en-seeds': [
  {title:'목적과 아직 쓰이지 않는 가치',structure:'so that은 책을 보관하는 목적입니다. may be needed는 미래에 필요할 수 있다는 가능성, even when은 양보입니다.',checks:['보존 목적에 연구·복원·사라진 곳에 식물 재도입이 포함되어 있나요?','지금 사용하지 않아도 가치가 있다는 뜻을 옮겼나요?'],expression:'living material → 살아 있는 재료',natural:'return to ideas는 생각이 되돌아온다는 뜻이 아니라, 사람들이 나중에 그 생각을 다시 찾아본다는 뜻입니다.'},
  {title:'살아 있음과 자라고 있음',structure:'keeping ... alive와 keeping ... growing을 대조합니다. are dried and stored는 씨앗에 행해지는 과정을 나타내는 수동태입니다.',checks:['씨앗을 살아 있게 보존하는 것과 계속 성장시키는 것을 구분했나요?','minus twenty를 영하 20도로 옮겼나요?'],expression:'slow deterioration → 변질을 늦추다',natural:'remain usable for longer는 “더 오래 사용할 수 있는 상태를 유지하다”입니다. 살아 있는 씨앗을 바로 자라게 한다는 뜻은 아닙니다.'},
  {title:'Not every의 부분 부정',structure:'Not every ...는 “모든 것이 ...인 것은 아니다”입니다. some ... others ...는 서로 다른 부류를 가리킵니다. rather than은 대조입니다.',checks:['모든 씨앗이 보관 불가능하다는 전체 부정으로 옮기지 않았나요?','방법을 견디는 씨앗끼리도 수명이 다르다는 점을 담았나요?'],expression:'tolerate the method → 그 방법을 견디다',natural:'one recipe는 실제 요리법이 아니라 일률적인 보관 방법의 비유입니다. “하나의 처방”으로 옮길 수 있습니다.'},
  {title:'기록이 있어야 활용할 수 있다',structure:'what plant / where ...는 know의 목적어입니다. whether는 “...인지”이고, capable of 뒤에는 동명사가 옵니다.',checks:['어떤 식물에서, 어디서 수집했는지 기록한다는 뜻을 담았나요?','살아 있는지와 발아 가능한지를 확인한다는 뜻을 옮겼나요?'],expression:'capable of germinating → 발아할 수 있는',natural:'would not offer the same possibilities는 같은 활용 가능성을 제공하지 못한다는 뜻입니다. “아무 가치도 없다”까지 강하게 옮기지는 마세요.'},
  {title:'비유의 범위를 넘지 않기',structure:'because는 초기 버전을 보관하는 이유를 설명합니다. If ...는 기록 없이 파일만 보관했을 때의 조건입니다. not a claim that은 비유의 한계를 밝힙니다.',checks:['지금 쓰지 않는 아이디어 때문에 초기 버전을 보관한다는 이유를 옮겼나요?','씨앗과 디지털 파일이 같다는 주장이 아니라는 단서를 담았나요?'],expression:'reuse → 다시 활용하다',natural:'a note about the version은 버전의 기능이나 맥락을 알려 주는 메모입니다. 단순히 버전 번호만 남긴다는 뜻으로 좁히지 마세요.'},
  {title:'보존 시설과 서식지 보호',structure:'cannot replace는 대체 불가입니다. that a stored collection cannot fully contain은 relationships를 수식합니다. does not make ... unnecessary는 “여전히 필요하다”로 풀 수 있습니다.',checks:['종자은행이 서식지 전체를 대신할 수 없다고 옮겼나요?','종자은행이 있어도 야생 서식지 보호는 필요하다는 뜻을 유지했나요?'],expression:'an entire habitat → 서식지 전체',natural:'work는 직장이나 회사가 아니라 앞으로 수행할 복원·보호 작업을 가리킵니다.'},
  {title:'과거의 행동이 남기는 선택지',structure:'would have preserved는 가정한 미래 시점에서 과거의 수집을 돌아보는 표현입니다. did not need to ... in order to ...는 기여에 모든 예측이 필요하지는 않았다는 뜻입니다.',checks:['사업이 생기기 전에 수집된 식물이 필요할 수 있다는 시간 관계를 담았나요?','모든 미래 용도를 알아야만 기여할 수 있는 것은 아니라는 뜻을 옮겼나요?'],expression:'preserve an option → 선택지를 남겨 두다',natural:'fewer choices는 선택지가 아예 없다는 뜻이 아니라 이전보다 줄어든다는 뜻입니다.'},
  {title:'바로 얻는 결과와 남겨 두는 가능성',structure:'Some ... Others ...는 두 종류의 행동을 대조합니다. by producing은 도움이 되는 방식을 설명합니다. while reminding은 부가적인 의미를 연결합니다.',checks:['즉각적인 성과와 미래 가능성을 남기는 행동을 구분했나요?','within reach를 실현 가능한 범위로 옮겼나요?'],expression:'within reach → 실현 가능한 범위에',natural:'ongoing responsibility는 보관하고 끝나는 일이 아니라 계속 돌봐야 하는 책임이라는 뜻입니다.'}
 ]
};
const additionalGuides=Object.fromEntries(additionalEnglishContent.map(lesson=>[lesson.article.id,lesson.guides]));
export const englishLessons = articles.filter(a => a.language === 'en').map(a => ({...a, guides: guides[a.id] ?? additionalGuides[a.id] ?? []}));
export type EnglishLesson = typeof englishLessons[number];
export type Practice = {translations:string[]; reviewed:boolean[]; completed:boolean; updatedAt?:string};
export type SavedWord = {id:string;articleId:string;term:string;meaning:string;example:string;known:boolean;reviews:number;updatedAt:string};
export const freshPractice = (count:number):Practice => ({translations:Array(count).fill(''),reviewed:Array(count).fill(false),completed:false});
export const catalogId = (articleId:string,term:string) => `catalog:${articleId}:${term}`;
export const catalogWords = englishLessons.flatMap(a=>a.vocabulary.map(w=>({...w,id:catalogId(a.id,w.term),articleId:a.id})));
