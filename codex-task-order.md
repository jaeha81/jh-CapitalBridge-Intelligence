# Codex 작업지시서 — Interior AI Platform

## 역할
너는 본 프로젝트의 구현 담당자다.
설계는 완료되어 있다. 너의 역할은 아래 파일들을 받아서 실제로 동작하는 앱을 만드는 것이다.

---

## 프로젝트 개요
인테리어 1인 사업자를 위한 AI 운영 플랫폼.
Next.js 14 + Supabase + Claude API 기반.

---

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (커스텀 다크 테마)
- Supabase (PostgreSQL + Auth + Storage)
- Anthropic Claude API (claude-sonnet-4-6)
- Vercel 배포

---

## 받은 파일 목록 (설계 완료)
```
/app/layout.tsx               ← 메인 레이아웃
/app/page.tsx                 ← 루트 → /dashboard 리다이렉트
/app/globals.css              ← 전역 스타일 (Google Fonts 포함)
/app/dashboard/page.tsx       ← 대시보드
/app/customers/page.tsx       ← 고객 관리
/app/estimate/page.tsx        ← 견적 자동화
/app/proposal/page.tsx        ← 제안서 생성
/app/sns/page.tsx             ← SNS 콘텐츠
/app/partners/page.tsx        ← 협력업체 관리
/app/api/ai/estimate/route.ts ← AI 견적 API
/app/api/ai/proposal/route.ts ← AI 제안서 API
/app/api/ai/sns/route.ts      ← AI SNS API
/components/features/Sidebar.tsx ← 사이드바
/lib/claude.ts                ← Claude API 헬퍼
/lib/supabase.ts              ← Supabase 클라이언트
/lib/types.ts                 ← 타입 정의
/supabase-schema.sql          ← DB 스키마
/package.json
/tsconfig.json
/tailwind.config.ts
/next.config.js
/postcss.config.js
/.env.local.example
/.gitignore
```

---

## 작업 순서

### Step 1: 프로젝트 세팅
```bash
npm install
```
필요한 패키지 누락 시 추가 설치.

### Step 2: 환경변수 확인
`.env.local.example` → `.env.local` 복사 후 키 확인.
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

### Step 3: 빌드 오류 수정
```bash
npm run build
```
타입 오류, import 오류, 누락 파일 전부 수정.

### Step 4: Supabase 연동
현재 고객/업체 데이터는 로컬 상태(useState)로만 관리됨.
아래 두 페이지를 Supabase CRUD로 연동:
- `/app/customers/page.tsx` → customers 테이블
- `/app/partners/page.tsx` → partners 테이블

### Step 5: 견적/제안서 저장 연동
AI 생성 결과를 Supabase에 저장하는 기능 추가:
- `/app/estimate/page.tsx` → estimates 테이블 저장
- `/app/proposal/page.tsx` → proposals 테이블 저장
- `/app/sns/page.tsx` → sns_contents 테이블 저장

### Step 6: 대시보드 실데이터 연동
현재 대시보드 통계(전체 고객, 진행 중 프로젝트, 이번달 견적, 완료)가 "-"로 표시됨.
Supabase에서 실제 카운트 쿼리로 교체.

### Step 7: 로컬 실행 검증
```bash
npm run dev
```
6개 페이지 전부 정상 렌더링 확인.
AI API 3개 정상 호출 확인.

### Step 8: Vercel 배포
```bash
vercel --prod
```
환경변수 Vercel에 동일하게 설정.

---

## 검증 체크리스트
- [ ] npm run build 오류 없음
- [ ] 대시보드 정상 렌더링
- [ ] 고객 등록/조회 정상 동작
- [ ] 견적 AI 생성 정상 동작
- [ ] 제안서 AI 생성 정상 동작
- [ ] SNS 콘텐츠 AI 생성 정상 동작
- [ ] 협력업체 등록/조회 정상 동작
- [ ] Supabase 데이터 저장/조회 정상
- [ ] 환경변수 코드 노출 없음
- [ ] Vercel 배포 성공

---

## 금지사항
- API 키를 코드에 직접 입력하지 말 것
- .env.local을 GitHub에 커밋하지 말 것
- MVP 범위 외 기능 임의 추가 금지
- 기존 설계 구조 임의 변경 금지

---

## 오류 발생 시
오류 항목을 `/llm-wiki/handoff-prompt.md`에 기록하고
Claude Code에 전달하여 구조 수정 여부 판단받을 것.
