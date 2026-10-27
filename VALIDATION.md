# 검증 기록

2026년 10월 28일

- TypeScript 타입 검사 통과.
- Vite 클라이언트 빌드와 정적 HTML 생성 통과.
- 로그인, 사용자별 데이터 격리, 입력 검증, CSRF, 단어장 페이지 구분, 복습, 기존 자료 처리, 세션 만료, 로그아웃, OAuth state/nonce/PKCE 및 실제 RSA 토큰 검증을 포함한 자동 테스트 9개 통과.
- Wrangler Pages Functions 컴파일 통과.
- Cloudflare workerd 실행기와 D1에서 세션 조회, 위조된 신원 헤더 거부, 단어 저장·조회, 로그아웃 후 세션 폐기를 확인.
- 로컬 D1 마이그레이션 3개 적용 통과.
- 개인 키와 기존 호스팅의 인증 의존성이 클라이언트 번들에 포함되지 않는지 검사.
- 기존 공개 Sites의 소스는 수정하지 않음. 이 프로젝트는 별도 외부 배포판.
- GitHub의 Cloudflare Pages 배포 검사 성공을 확인.
- 운영 주소 `https://night-library-394.pages.dev/`와 `/privacy/`의 HTTP 200 응답과 페이지 제목을 확인.
- 운영 `/api/health`에서 `ok: true`, `storageConfigured: true`를 확인. 이는 D1 바인딩 존재 확인이며 실제 테이블 조회·저장 검증은 아님.
- Google 연결 전 `/api/session`이 `user: null`, `loginAvailable: false`를 반환함을 확인.
- 배포별 미리보기 주소에는 `X-Robots-Tag: noindex`가 있고 고정 운영 주소에는 해당 헤더가 없음을 확인.

- 잉글담 표시 이름, 한국어 검색 제목과 소개, 공개 영어 지문 모음·독해 공부 방법 페이지를 추가.
- 정적 공개 페이지 전체의 고유한 제목·설명, 단일 H1, canonical·Open Graph·구조화된 데이터, 내부 링크 및 사이트맵을 자동 검사함.
- 영어 지문 상세 HTML에 문단별 참고 해석·구문 해설·단어 예문이 포함됨을 확인함.
- 공유 이미지의 1200×630 크기와 표시를 확인함.
- 사용자가 실제 Google 계정 로그인 성공을 확인함.

미완료: 자동 브라우저 환경의 접근 제한으로 시각 검증을 마치지 못함. 운영 D1의 실제 학습 기록 저장, 실제 무료 플랜 CPU 사용량, 부하 시험, AdSense 심사 결과는 미검증.

비밀 키는 포함하지 않음. 전달받은 실제 D1 Database ID, 확인한 고정 운영 주소와 Google Client ID를 `wrangler.json`에 반영함. 사용자 제공 Cloudflare 화면에서 로그인용 Secret 두 개가 암호화되어 등록된 표시를 확인함. 실제 Google 로그인이 된다는 사용자 확인을 받음. 원격 D1 마이그레이션 적용 여부는 아직 검증하지 않음. 기존 Sites의 학습 기록은 자동 이전되지 않음.

Google Search Console·네이버 소유권 확인 코드와 사이트맵 제출은 계정 소유자의 설정이 남아 있음. 검색 순위나 색인 생성 여부는 검증하지 않음.
