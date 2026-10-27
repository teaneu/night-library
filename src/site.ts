import {additionalEnglishContent} from './english-expansion';

export const SITE_NAME = '잉글담';
export const SITE_ENGLISH_NAME = 'Engldam';
export const SITE_TITLE = '잉글담 | 영어 독해·해석 연습과 나만의 단어장';
export const SITE_DESCRIPTION = '영어 원문을 직접 해석하고 문단별 참고 번역과 구문 해설로 점검하세요. 경제·심리·기술·과학·환경·통계 주제의 영어 독해 지문, 단어장과 나만의 학습 기록을 잉글담에서 만나보세요.';
export const READING_PATH = '/english-reading/';
export const GUIDE_PATH = '/english-reading-guide/';
export const STUDY_PATH = '/study/';

export type LessonSearchInfo = {title:string;description:string;focus:string};
export const lessonSearchInfo:Record<string,LessonSearchInfo> = {
  ...Object.fromEntries(additionalEnglishContent.map(lesson=>[lesson.article.id,lesson.search])),
  'en-average': {
    title:'심슨의 역설과 통계 읽기 영어 독해',
    description:'게임 성공률 사례로 심슨의 역설을 이해하는 영어 독해 지문입니다. 영어 원문, 문단별 참고 해석, 구문 해설과 핵심 단어를 함께 공부하세요.',
    focus:'비교 표현·원인 설명·주장의 범위',
  },
  'en-seeds': {
    title:'종자은행과 환경 보존 영어 독해',
    description:'씨앗을 보존하는 과학과 미래의 선택지를 다룬 영어 독해 지문입니다. 문단별 원문·참고 번역·표현 해설과 예문이 있는 단어를 제공합니다.',
    focus:'목적 표현·부분 부정·비유의 의미',
  },
};
