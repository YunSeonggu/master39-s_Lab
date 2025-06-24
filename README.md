# 블로그글쓰기 자동화 웹 서비스

네이버 블로그 SEO 최상위 제목을 분석하고 GPT API로 새로운 블로그 글을 자동 생성하는 웹 서비스입니다.

## 🚀 주요 기능

- **네이버 블로그 제목 수집**: 키워드 기반 상위 30개 블로그 제목 수집
- **GPT 제목 분석**: AI가 제목의 구조, 패턴, SEO 특징 분석
- **새로운 제목 생성**: 분석 결과를 바탕으로 새로운 블로그 제목 생성
- **완전한 블로그 글 작성**: 선택한 제목으로 완성된 블로그 글 자동 생성
- **사용자 친화적 인터페이스**: 웹브라우저에서 간편하게 이용

## 📋 필요 조건

- Node.js 16.0.0 이상
- OpenAI API 키
- 네이버 개발자 API 키 (Client ID, Client Secret)

## 🔧 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일에 다음 내용을 설정하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
```

### 3. 서버 실행
```bash
# 개발 모드 (nodemon 사용)
npm run dev

# 프로덕션 모드
npm start
```

### 4. 웹사이트 접속
브라우저에서 `http://localhost:3000` 접속

## 🎯 사용 방법

1. **키워드 입력**: 분석하고 싶은 키워드를 입력합니다
2. **제목 분석 & 생성**: 버튼을 클릭하여 네이버 제목 수집 및 GPT 분석을 시작합니다
3. **새로운 제목 확인**: GPT가 생성한 새로운 블로그 제목들을 확인합니다
4. **블로그 글 작성**: 원하는 제목을 선택하여 완전한 블로그 글을 생성합니다
5. **복사하기**: 완성된 블로그 글을 클립보드로 복사합니다

## 📁 프로젝트 구조

```
├── server.js          # Express 서버
├── package.json       # 프로젝트 설정
├── .env              # 환경 변수 (API 키)
├── index.html        # 메인 웹페이지
├── styles.css        # 스타일시트
├── script.js         # 클라이언트 JavaScript
└── README.md         # 프로젝트 설명
```

## 🔑 API 엔드포인트

- `GET /api/naver-blog?keyword={keyword}` - 네이버 블로그 제목 수집
- `POST /api/analyze-titles` - GPT 제목 분석 및 새 제목 생성
- `POST /api/generate-blog` - GPT 블로그 글 생성

## 🛡️ 보안 고려사항

- API 키는 서버에서만 사용되며 클라이언트에 노출되지 않습니다
- 환경 변수를 통해 민감한 정보를 관리합니다
- CORS 설정으로 안전한 API 호출을 보장합니다

## 📝 라이선스

MIT License

## 👨‍💻 개발자

Master39 - AI를 바라보는 시선

---

**주의**: 실제 서비스 운영 시에는 API 키 보안, 요청 제한, 에러 처리 등을 더욱 강화해야 합니다. 

## 🔒 보안 중요사항

**⚠️ 주의: API 키 보안**
- OpenAI API 키가 코드에 하드코딩되지 않도록 주의하세요
- 환경변수를 통해 API 키를 관리해야 합니다
- GitHub에 API 키가 노출되면 즉시 키를 재발급받으세요

## 🚀 배포 방법

### 1. 환경변수 설정

#### 로컬 개발용
```bash
# .env 파일 생성
cp .env.example .env

# .env 파일 수정
OPENAI_API_KEY=sk-proj-your_actual_api_key_here
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
```

#### Vercel 배포용
1. Vercel 대시보드 접속
2. 프로젝트 → Settings → Environment Variables
3. 다음 환경변수 추가:
   - `OPENAI_API_KEY`: OpenAI API 키
   - `NAVER_CLIENT_ID`: 네이버 API 클라이언트 ID
   - `NAVER_CLIENT_SECRET`: 네이버 API 클라이언트 시크릿

### 2. 안전한 GitHub 배포

```bash
# 1. 민감한 파일들이 .gitignore에 포함되었는지 확인
cat .gitignore

# 2. 기존 히스토리에서 API 키 제거 (선택사항)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch script.js' \
  --prune-empty --tag-name-filter cat -- --all

# 3. 안전한 버전 커밋 및 푸시
git add .
git commit -m "🔒 API 키 보안 강화 - 환경변수로 이전"
git push origin main
```

### 3. API 키 재발급

**현재 노출된 API 키는 즉시 삭제하고 새로 발급받으세요:**

1. OpenAI 계정 로그인
2. API Keys 페이지 접속
3. 기존 키 삭제 (Revoke)
4. 새 키 생성
5. Vercel 환경변수에 새 키 설정

## 📁 프로젝트 구조

```
cursor/
├── index.html          # 메인 페이지
├── script.js           # 프론트엔드 로직 (API 키 제거됨)
├── server.js           # 백엔드 서버 (환경변수 사용)
├── styles.css          # 스타일시트
├── package.json        # 의존성 관리
├── .env.example        # 환경변수 예시
├── .gitignore          # Git 무시 파일 목록
└── README.md           # 프로젝트 설명서
```

## 🛠 기능

- 🤖 AI 블로그 글 자동 생성
- 🔍 네이버 SEO 키워드 분석
- 🎨 커스텀 HTML 버튼 생성기
- 📱 반응형 디자인

## 🚦 실행 방법

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 실제 API 키 입력

# 로컬 서버 실행
npm start
# 또는
node server.js
```

## 🔧 환경변수 설명

| 변수명 | 필수여부 | 설명 |
|--------|----------|------|
| `OPENAI_API_KEY` | 필수 | OpenAI GPT API 키 |
| `NAVER_CLIENT_ID` | 선택 | 네이버 검색 API 클라이언트 ID |
| `NAVER_CLIENT_SECRET` | 선택 | 네이버 검색 API 클라이언트 시크릿 |
| `PORT` | 선택 | 서버 포트 (기본값: 3000) |

## ⚡ Vercel 배포

1. GitHub 저장소와 Vercel 연결
2. Environment Variables에서 API 키 설정
3. 자동 배포 완료

## 🔐 보안 체크리스트

- [x] API 키가 코드에서 제거됨
- [x] 환경변수로 API 키 관리
- [x] .gitignore에 민감한 파일 추가
- [x] .history/ 폴더 Git 추적 제외
- [ ] 기존 API 키 재발급 (사용자가 직접 해야 함)

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 GitHub Issues를 통해 연락해 주세요. 