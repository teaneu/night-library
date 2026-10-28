# 잉글담 — GitHub + Cloudflare 배포 안내

2026년 10월 28일 기준. 이 프로젝트는 기존 사이트에서 영어 읽기·참고 해설·단어장·학습 기록 기능을 가져온 **외부 배포용 소스**입니다. 실제 AI 자동 첨삭과 광고 스크립트는 연결하지 않았습니다.

## 구성

- GitHub: 소스 코드와 학습용 글을 보관합니다. 방문자의 학습 기록은 GitHub에 올리지 않습니다.
- Cloudflare Pages: 빌드 시 생성한 HTML·CSS·JavaScript를 제공합니다. 첫 화면과 공개 글은 JavaScript 실행 전에도 본문이 보입니다.
- Pages Functions: `/api/*`, `/auth/*` 요청만 처리합니다. Workers 기반으로 실행되며 Workers 무료 한도를 공유합니다.
- Cloudflare D1: 사용자별 해석·단어장·학습 기록과 로그인 세션을 보관합니다.
- Google 로그인: 이메일·프로필을 확인합니다. Google 비밀번호는 사이트에서 받지 않습니다.

Pages를 선택한 이유는 무료 `프로젝트이름.pages.dev` 주소와 GitHub 자동 배포를 함께 사용하기 위해서입니다. Workers에 사이트 전체를 매번 서버 렌더링하는 방식 대신, 읽기 화면을 정적으로 제공합니다.

저장소: https://github.com/teaneu/night-library

운영 주소: https://night-library-394.pages.dev/

Cloudflare D1 `night-library-db`와 Pages를 연결했고 운영 주소와 Google Client ID를 `wrangler.json`에 반영했습니다. 사용자가 Google 로그인 성공을 확인했습니다. 실제 학습 기록 저장은 별도로 확인해야 합니다. 이전 Sites 배포는 별개의 사이트이며 그대로 남습니다.

표시 이름은 **잉글담(Engldam)**입니다. GitHub 저장소·Pages 프로젝트·DB의 내부 이름과 운영 주소는 유지합니다. Google 로그인 화면의 이름은 본인 Google Auth Platform의 **Branding → App name**에서 `잉글담`으로 바꿉니다.

`d14c05f4.night-library-394.pages.dev`처럼 앞에 배포 ID가 붙은 주소는 특정 배포의 미리보기 주소입니다. 로그인 설정, 사이트 공유, 심사 신청에는 위의 고정 운영 주소를 사용합니다.

## 첫 화면과 학습 화면

- 고정 운영 주소 `/`에는 잉글담 소개와 `영어 공부 시작하기` 버튼을 보여 줍니다. 상세 소개는 `/about/`에서 읽을 수 있습니다.
- 해석 연습·단어장·학습 기록은 `/study/`에서 이용합니다. 로그인 후에는 학습 화면으로 돌아옵니다. Google에 등록한 `/auth/callback` 주소는 그대로 사용합니다.
- 기존 `/?lesson=지문ID` 링크는 같은 지문의 `/study/?lesson=지문ID`로 이어집니다. 소개의 배경지식 읽기 목록은 제거했습니다.

## 모바일 화면

- 화면 보기는 기본 `자동 · 기기에 맞춤`입니다. 800px 이하에서는 원문·해석/해설·이번 글 단어를 탭으로 전환합니다.
- `화면 보기 → 모바일 보기`를 선택하면 넓은 화면에서도 같은 학습 구성을 사용할 수 있습니다. 기기 로컬 저장소에 설정을 보관합니다.
- 모바일 해석 화면의 영어 원문 칸은 아래 손잡이를 위아래로 끌어 높이를 조절할 수 있습니다. 긴 본문은 칸 안에서 스크롤하고, 선택한 높이는 기기에 저장합니다. 키보드 방향키와 Home/End도 지원합니다.
- 지문 목록은 `지문 바꾸기`로 펼칩니다. 탭이나 화면 보기를 바꿔도 작성 중인 해석은 유지합니다.
- 모바일 해석 입력창 옆의 `기록 저장`은 로그인 후 사용할 수 있습니다. 전체 저장·완료 버튼도 해석 화면 아래에 있습니다.

## 1. 컴퓨터에서 실행 준비

Windows에서 Node.js 24 LTS를 설치합니다. Git 명령으로 소스를 관리하려면 Git도 설치합니다.

PowerShell에서는 `npm.ps1` 실행 정책 오류를 피하도록 아래 예제의 `npm.cmd`와 `npx.cmd`를 사용합니다. Cloudflare 빌드 화면에는 `npm run build`를 그대로 입력합니다.

- Node.js: https://nodejs.org/
- Git: https://git-scm.com/downloads
- GitHub: https://github.com/
- Cloudflare: https://dash.cloudflare.com/

GitHub 저장소에서 **Code → Download ZIP**으로 최신 소스를 내려받아 압축을 풉니다. `package.json`이 있는 폴더에서 PowerShell을 엽니다. 또는 Git이 설치되어 있다면 아래 명령으로 복제합니다.

```powershell
git clone https://github.com/teaneu/night-library.git
cd night-library
```

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd run build
npm.cmd test
```

`npm ci`는 설치, `check`는 타입 검사, `build`는 정적 화면 생성, `test`는 로그인·저장·사용자 격리 검사입니다. 테스트는 빌드 결과도 검사하므로 먼저 `build`를 실행합니다.

로컬 미리보기는 다음 명령을 순서대로 실행합니다.

```powershell
npm.cmd run db:local
npm.cmd run preview
```

터미널에 표시된 주소를 엽니다. Google 로그인 설정 전에도 읽기·해석·해설 확인은 가능합니다. 로그인과 계정 저장은 아래 설정 후 열립니다. 미리보기 종료는 `Ctrl+C`입니다.

## 2. 이미 만든 D1에 테이블 생성

`night-library-db`를 다시 만들 필요는 없습니다. Database ID가 소스에 반영되어 있으므로 다음 명령을 실행합니다.

```powershell
npx.cmd wrangler login
npm.cmd run db:migrate
```

브라우저에서 D1을 만든 본인 Cloudflare 계정으로 로그인하고, Wrangler의 계정 접근을 승인합니다. 여러 Cloudflare 계정이 나오면 해당 DB가 있는 계정을 선택합니다.

`db:migrate`는 원격 D1에 `migrations` 폴더의 테이블을 생성합니다. 기존 테이블을 지우는 명령은 포함하지 않았습니다. 앞으로 DB 구조를 바꾸면 새 SQL 파일을 추가하고 이 명령을 다시 실행합니다. 소스 코드만 배포한다고 DB 변경이 자동 적용되지는 않습니다.

DB의 ID와 이름은 `wrangler.json`에 보관합니다. **D1 바인딩 이름은 대문자 `DB`**여야 합니다.

## 3. GitHub 소스와 자동 검사

소스는 `teaneu/night-library`의 `main` 브랜치에서 관리합니다. 기존 저장소를 다시 만들거나 `git init`을 실행할 필요는 없습니다. 현재 저장소는 공개이므로 누구나 소스를 읽을 수 있습니다. 실제 비밀 키와 이용자의 기록은 저장소에 올리지 않습니다.

이후 소스 수정은 연결된 GitHub 도구로 반영하거나, Git으로 복제한 폴더에서 수정한 뒤 커밋·푸시합니다. ZIP으로 내려받은 폴더에는 Git 이력이 없으므로 직접 푸시하려면 먼저 위의 `git clone`으로 복제합니다.

`.gitignore`에 `node_modules`, 빌드 출력, `.dev.vars`, `.env`, Wrangler 로컬 DB 등이 제외돼 있습니다. 실제 비밀 키는 이 프로젝트의 파일에 넣지 않습니다.

GitHub의 Actions에는 기본 검사가 포함돼 있습니다. 이 검사는 Cloudflare에 배포하지 않으며, Cloudflare의 Git 연결이 배포를 담당합니다.

## 4. Cloudflare Pages와 GitHub 연결

Cloudflare 대시보드에서 다음 순서로 진행합니다. 화면에 표시되는 메뉴 이름은 언어와 업데이트에 따라 조금 다를 수 있습니다.

1. **Workers & Pages → Create application → Pages → Connect to Git**로 이동합니다. Workers 생성 화면만 보이면 Pages 시작 옵션을 선택합니다.
2. GitHub를 연결하고, 방금 만든 저장소에 대한 접근을 허용합니다.
3. `teaneu/night-library` 저장소를 선택합니다. ChatGPT에 연결한 GitHub 권한과 Cloudflare의 GitHub 연결 권한은 별개입니다.
4. 아래 빌드 설정을 입력합니다.

| 항목 | 값 |
| --- | --- |
| Project name | `night-library` 또는 사용 가능한 원하는 이름 |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | 저장소 맨 위면 비워 둠 |
| 빌드 환경 변수 `NODE_VERSION` | `24` |

5. **Save and Deploy**를 누릅니다.
6. 완료 후 Cloudflare가 표시하는 **실제 운영 주소**를 복사합니다. 일반적으로 `https://프로젝트이름.pages.dev` 형식입니다. 임의로 추측한 주소를 사용하지 않습니다.

프로젝트 이름을 `night-library`와 다르게 만들었다면 로컬 설정도 맞춥니다.

```powershell
npm.cmd run configure -- --name 실제프로젝트이름
```

처음에는 로그인 설정이 없어 읽기 화면만 열리는 것이 정상입니다. 기본 페이지에서 "로그인·저장 기능은 운영자의 연결 설정 후 열립니다"라는 안내가 나옵니다.

### D1 연결 확인

`wrangler.json`에 실제 DB ID를 입력한 상태로 올리면 코드에 정의된 D1 바인딩을 사용합니다. Pages 설정의 Bindings에서 `DB`가 본인의 `night-library-db`에 연결되어 있는지도 확인합니다. 아직 바인딩이 보이지 않으면 Production 환경의 D1 바인딩을 추가하고 재배포합니다. 같은 DB를 새로 만들 필요는 없습니다.

## 5. Google 로그인 연결

기존 사이트의 ChatGPT 로그인은 이전 호스팅이 제공하던 기능입니다. 이 배포판은 별도의 Google 로그인 계정을 사용하며, 이전 계정의 학습 기록이 자동으로 합쳐지지는 않습니다.

### 5-1. 실제 사이트 주소 설정

고정 운영 주소는 이미 `wrangler.json`의 `vars.APP_URL`에 반영했습니다. 같은 값을 직접 설정하려면 아래 명령을 사용합니다. 주소 뒤에 `/auth`나 다른 경로를 붙이지 않습니다.

```powershell
npm.cmd run configure -- --site-url https://night-library-394.pages.dev
```

이 값은 `wrangler.json`의 `vars.APP_URL`에 들어가며, 로그인 콜백 주소와 공개 페이지의 canonical·sitemap 생성에 사용됩니다. 도메인을 바꾸면 이 값과 Google의 허용 주소를 함께 바꿉니다.

### 5-2. Google OAuth 클라이언트 만들기

https://console.cloud.google.com/ 에서 진행합니다.

1. 새 프로젝트를 만들거나 본인 프로젝트를 선택합니다.
2. **Google Auth Platform**에서 Branding·Audience·Data Access 설정을 진행합니다. 앱 이름은 `잉글담`, 지원 이메일은 본인 이메일로 입력합니다.
3. 개인 Google 계정으로 누구나 로그인하게 하려면 Audience는 **External**을 사용합니다. 테스트 중에는 본인 계정을 Test users에 넣습니다.
4. 로그인에 필요한 범위는 `openid`, `email`, `profile`입니다. Drive·Gmail 등 추가 권한은 필요 없습니다.
5. **Clients → Create client → Web application**을 만듭니다.
6. Authorized redirect URIs에 다음을 입력합니다.

```text
https://night-library-394.pages.dev/auth/callback
```

JavaScript origin을 요구하면 `https://night-library-394.pages.dev`를 입력합니다. OAuth 콜백 주소는 프로토콜·호스트·경로까지 정확히 일치해야 합니다. 홈페이지는 `https://night-library-394.pages.dev/`, 개인정보 안내는 `https://night-library-394.pages.dev/privacy/`입니다.

7. 발급된 Client ID와 Client secret을 보관합니다. Client secret은 Google 화면과 본인 Cloudflare 설정에서만 취급합니다.
8. 일반 방문자에게 공개하기 전에는 Google Audience에서 앱의 공개 상태를 확인합니다. 추가 도메인 확인·검증 안내가 나오면 Google 화면의 요구사항을 완료합니다. 테스트 사용자만 등록한 상태로 전체 사용자에게 공개하지 않습니다.

### 5-3. 공개 설정과 비밀 키 등록

Client ID는 비밀이 아니므로 다음처럼 설정합니다.

```powershell
npm.cmd run configure -- --google-client-id 실제클라이언트ID.apps.googleusercontent.com
```

Pages 프로젝트의 **Settings → Variables and Secrets**에서 **Production**에 아래 두 값을 암호화된 Secret으로 추가합니다.

| 이름 | 값 |
| --- | --- |
| `GOOGLE_CLIENT_SECRET` | Google에서 발급한 Client secret |
| `SESSION_SECRET` | 본인 컴퓨터에서 생성한 충분히 긴 임의 값 |

`SESSION_SECRET`은 아래 명령으로 컴퓨터에서 직접 생성할 수 있습니다. 출력은 본인 Cloudflare Secret 입력에만 사용하고 GitHub·대화창에 올리지 않습니다.

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

`APP_URL`과 `GOOGLE_CLIENT_ID`의 원본은 `wrangler.json`입니다. 이 두 값은 파일에서 관리하고, 위의 비밀 키 두 개만 Cloudflare Secret으로 관리합니다. Secret을 설정한 뒤 새 배포를 해야 적용됩니다.

```powershell
git add wrangler.json
git commit -m "Configure site URL and Google sign-in"
git push
```

GitHub에 올리면 Pages가 자동 재배포합니다. 이후 수정도 `git add`, `git commit`, `git push`로 진행합니다.

## 6. 공개 전에 동작 확인

1. 로그아웃 상태에서 원문·해석 입력·참고 해설이 보이는지 확인합니다.
2. `/about/`, `/privacy/`가 열리는지 확인합니다.
3. `/api/session`에서 `loginAvailable: true`가 나오는지 확인합니다. 로그인 전 `user: null`은 정상입니다.
4. Google 로그인 후 해석을 쓰고 **기록 저장**을 누릅니다.
5. 단어 한 개를 저장하고 새로고침한 뒤 유지되는지 확인합니다.
6. 로그아웃 후 다른 Google 계정으로 접속해 앞 계정의 기록이 보이지 않는지 확인합니다.
7. 휴대전화에서도 입력창과 단어장 메뉴를 확인합니다.

자동 검사는 실제 SQLite에서 데이터 격리·저장과 OAuth 상태/서명/세션 처리를 검증합니다. 로컬 Cloudflare workerd 실행기에서도 컴파일한 Pages Functions와 D1을 연결해 저장·세션·로그아웃 동작을 확인했습니다. 실제 Cloudflare Pages 배포는 GitHub 배포 검사와 운영 주소의 HTTP 응답으로 확인했습니다. 자동 브라우저 환경의 접근 제한으로 브라우저 시각 검증은 완료하지 못했습니다. 본인 Google 계정으로 하는 실제 로그인·운영 D1 저장과 무료 플랜 CPU 사용량은 로그인 설정 후 확인해야 합니다.

미리보기 브랜치에는 운영 Secret을 복사하지 마세요. 앱은 `APP_URL`과 다른 호스트에서 계정 로그인을 거부하도록 구성했습니다. Pages의 Branch deployment controls에서 불필요한 preview 자동 배포를 꺼도 됩니다.

## 7. 무료 한도와 비용 관리

- Pages 정적 파일 요청은 무료·무제한입니다. API·로그인용 Functions는 Workers의 하루 100,000 요청, 요청당 CPU 10ms 무료 한도를 공유합니다. 방문자 100,000명이라는 뜻은 아닙니다.
- D1 무료 한도는 하루 5,000,000행 읽기·100,000행 쓰기입니다. 저장 공간·DB별 크기에도 별도 제한이 있습니다.
- 무료 한도를 넘으면 해당 API·DB 작업이 제한될 수 있습니다. 자동으로 유료 플랜을 켜는 코드는 없습니다. Cloudflare 대시보드에서 Workers Free 사용 여부를 확인합니다.
- 로그인 시의 암호 검증도 무료 CPU 한도에 들어갑니다. 화면을 정적으로 만들어 실행량을 줄였지만 실제 운영의 CPU 한도 충족을 미리 보장하지는 않습니다. 배포 후 Analytics에서 오류와 CPU 사용량을 확인합니다.
- Pages의 **Settings → Runtime → Fail open / closed**는 로그인·API에 대해 **Fail closed**를 선택하는 것이 안전합니다. 개인 기록을 정적 공개 파일로 저장하지 않습니다.
- 사이트 코드에 외부 AI API 호출은 없으므로 AI 첨삭 토큰 비용은 없습니다.
- 개인 도메인을 구매하면 도메인 등록·갱신 비용은 호스팅과 별도입니다. 무료 기본 주소로 먼저 운영할 수 있습니다.

## 8. 애드센스 신청 준비

게시자 ID `ca-pub-1238487560887980`의 계정 확인 메타 태그를 적용했습니다. 실제 광고 스크립트는 연결하지 않았으며, 승인을 보장하는 코드나 문구는 없습니다.

계정에서 사이트를 추가할 때 먼저 **실제 Pages 운영 주소**를 입력합니다. Google의 주소 인정·정책 검토 결과를 확인합니다. 별도 개인 도메인을 쓰면 그 도메인으로 신청합니다.

공개 게시자 ID는 `wrangler.json`의 `vars.ADSENSE_PUBLISHER_ID`에 저장합니다. Pages의 빌드 환경 변수 `ADSENSE_PUBLISHER_ID`가 있으면 그 값을 우선 사용합니다. 빌드가 공개 페이지의 `<head>`에 `<meta name="google-adsense-account" ...>`를 추가하므로, 배포 후 AdSense에서 메타 태그 방식으로 사이트 연결을 확인하고 검토를 요청할 수 있습니다. 광고를 자동으로 켜는 기능은 아닙니다.

실제 광고를 게재할 때는 계정에서 받은 광고 스크립트와 필요한 `ads.txt`, 쿠키/동의 설정, 개인정보 안내를 함께 적용해야 합니다. 개인 해석·단어장·학습 기록 화면의 광고 배치는 별도 검토합니다. 현재 영어 학습 지문은 10편이며, 각 글에 원문·문단별 참고 번역·구문 해설·단어·출처를 제공합니다. 새 글은 `src/english-expansion.ts`에서 본문과 해설, 검색용 설명을 함께 추가합니다. 특정 글 개수만 채우면 승인된다는 기준은 없습니다.

## 9. 글 추가와 기존 기록

- 본문·참고 번역·단어: `src/articles.ts`
- 문단별 해설: `src/english-lessons.ts`
- 영어 글을 추가할 때 원문·번역·해설의 문단 수를 맞춥니다. `npm run build`와 `npm test`로 확인하고 GitHub에 올립니다.
- 기존 Sites에서 저장했던 기록은 이 DB로 자동 이전되지 않습니다. 기존 사이트의 학습 기록 내보내기로 본인 기록을 백업할 수 있습니다. 새 사이트에는 전체 해석 붙여넣기를 이용해 필요한 내용을 저장할 수 있습니다. 다른 이용자의 계정·기록을 임의로 합치지 않습니다.

## 10. 영어 학습 검색 노출과 사이트 등록

메인 제목과 설명, 각 페이지의 고유한 제목·설명, Open Graph·공유 이미지, canonical, WebSite·Article·BreadcrumbList 구조화된 데이터를 제공합니다. 영어 지문 모음과 공부 방법은 로그인·JavaScript 없이 읽을 수 있는 정적 HTML입니다. `/api/*`와 `/auth/*`에는 `noindex, nofollow` 응답 헤더를 적용합니다. 사용자별 해석과 단어는 공개 페이지나 사이트맵에 넣지 않습니다.

- 지문 모음: https://night-library-394.pages.dev/english-reading/
- 독해 공부 방법: https://night-library-394.pages.dev/english-reading-guide/
- 사이트맵: https://night-library-394.pages.dev/sitemap.xml
- 브랜드·검색 소개: `src/site.ts`
- 공개 학습 콘텐츠: `scripts/public-pages.tsx`
- 검색용 HTML 생성: `scripts/render.tsx`
- 공유 이미지: `public/social-card.svg` 원본과 1200×630 `public/social-card.png`

검색 순위, 추천 피드 노출이나 색인 생성 시점을 보장하지 않습니다. 같은 검색어를 반복하거나 보이지 않는 키워드를 넣지 않습니다. 주제별 지문과 해설은 운영자가 실제 내용과 참고 자료를 확인해 보강합니다.

### Google Search Console

1. https://search.google.com/search-console/ 에서 본인 계정으로 로그인합니다.
2. **속성 추가 → URL 접두어**에 `https://night-library-394.pages.dev/`를 넣습니다. Pages 기본 주소에서는 DNS를 요구하는 도메인 속성 대신 URL 접두어를 사용합니다.
3. **HTML 태그** 확인 방법의 `google-site-verification` 메타 태그를 복사합니다. 태그의 실제 `content` 값만 아래 명령으로 설정하거나 연결된 GitHub 작업에 전달해 반영합니다.

```powershell
npm.cmd run configure -- --google-site-verification 실제확인코드
```

4. `wrangler.json` 변경을 GitHub에 반영하고 Pages 배포가 완료되면 Search Console에서 **확인**을 누릅니다.
5. **Sitemaps / 사이트맵**에 `sitemap.xml`을 제출합니다.
6. URL 검사에서 홈페이지와 지문 모음 URL의 색인 생성 요청을 진행합니다. 이후 검색어·클릭·노출 수를 모니터링합니다.

확인 코드는 계정에서 실제 발급된 값을 사용합니다. 미리보기의 해시 주소를 등록하지 않습니다. 소유권 확인 태그를 나중에 삭제하면 확인이 해제될 수 있습니다. 현재 소유권 확인·사이트맵 제출을 대신 완료한 상태는 아닙니다.

### 네이버 서치어드바이저

https://searchadvisor.naver.com/ 의 웹마스터 도구에 동일한 고정 운영 주소를 등록합니다. HTML 태그 방식의 `naver-site-verification` 확인 코드를 발급받으면 다음 명령으로 설정하고 GitHub 반영·배포 후 소유권 확인을 완료합니다. 이후 사이트맵 제출 메뉴에서 위의 사이트맵 URL을 제출합니다.

```powershell
npm.cmd run configure -- --naver-site-verification 실제확인코드
```

검색 확인 코드는 공개 메타 정보이며 비밀 키가 아닙니다. 선택적으로 같은 이름의 빌드 환경 변수 `GOOGLE_SITE_VERIFICATION`, `NAVER_SITE_VERIFICATION`도 지원합니다. 코드의 `wrangler.json`에 이미 설정했다면 중복된 빌드 환경 변수로 덮어쓰지 않도록 한 곳에서 관리합니다. 로그인용 Client ID·Client secret은 검색엔진 소유권 확인 코드와 별개입니다.

## 문제 해결

| 증상 | 확인할 곳 |
| --- | --- |
| 로그인 연결 준비 안내 | APP_URL, Client ID, Production Secret 2개, D1 연결, 재배포 여부 |
| `redirect_uri_mismatch` | Google에 등록한 주소와 실제 `/auth/callback` 주소의 완전 일치 |
| 본인만 로그인 가능 | Google Audience의 테스트 사용자·공개 상태 |
| 로그인 후 기록을 불러오지 못함 | `npm run db:migrate` 실행 여부, D1 바인딩 이름 `DB`, Pages Functions 로그 |
| Cloudflare 빌드 실패 | Node 24, `npm run build`, 출력 `dist`, 실제 DB ID, package-lock.json 포함 여부 |
| 첫 화면이 안 뜸 | Pages 프로젝트로 만들었는지, `package.json`이 저장소 최상위에 있는지 |
| 도메인 변경 후 로그인 실패 | APP_URL, Google redirect URI, 재배포. 기존 호스트의 쿠키는 새 호스트로 이동하지 않음 |

## 공식 참고 자료

- Pages Git 배포: https://developers.cloudflare.com/pages/get-started/git-integration/
- API만 Functions로 실행: https://developers.cloudflare.com/pages/functions/routing/
- Pages 설정과 바인딩: https://developers.cloudflare.com/pages/functions/wrangler-configuration/
- D1 마이그레이션: https://developers.cloudflare.com/d1/reference/migrations/
- Google 로그인: https://developers.google.com/identity/openid-connect/openid-connect
- Google 검색 기본 가이드: https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko
- 사이트 이름 구조화된 데이터: https://developers.google.com/search/docs/appearance/site-names?hl=ko
- Search Console 소유권 확인: https://support.google.com/webmasters/answer/9008080?hl=ko
- 네이버 웹마스터 가이드: https://searchadvisor.naver.com/guide/seo-basic-intro
- Workers 가격: https://developers.cloudflare.com/workers/platform/pricing/
- D1 가격: https://developers.cloudflare.com/d1/platform/pricing/
- 애드센스 사이트 연결: https://support.google.com/adsense/answer/7584263?hl=ko
