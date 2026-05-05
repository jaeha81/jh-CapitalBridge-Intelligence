# agent-registry.md — v2 (AI 특화 축소 재편)
> 참조: main-harness.md / workflow.md
> 변경: 10개 → 7개 Agent / AI 스타트업 특화 / 중복 제거

---

## Main Harness 정의
- 이름: CapitalBridge Intelligence Harness v2
- 목적: AI 스타트업 가치분석 + 투자자 매칭 + 진입 전략 지원
- 운영 방식: 문서 기반 상태관리 / Codex 검증 통과 후 산출물 확정
- 총괄: Validation Coordinator Agent

---

## Sub Agent 목록 (7개)

### 1. Data Intake Agent
- 책임: 기업 기본정보 / 재무자료 / AI 기술 스택 자료 입력 구조 관리
- 입력: 기업 소개자료 / 재무제표 / 기술 스택 문서 / 팀 구성 정보
- 출력: 정규화된 입력 데이터 / 누락 항목 목록
- 연결 대상: Financial Analysis Agent / Startup Screening Agent / Validation Coordinator Agent
- 금지: 임의 데이터 생성 / 수치 추정

### 2. Trend Research Agent
- 책임: AI 산업 트렌드 / 투자 흐름 / 기술 성숙도 주기적 리서치
- 입력: 사용자 지정 산업 분야 / 외부 리서치 자료 / VC 동향
- 출력: 산업별 AI 도입 트렌드 요약 / 투자 흐름 요약 / 기술 성숙도 위치 / 유망 섹터 목록
- 연결 대상: Startup Screening Agent / Investor Matching Agent
- 실행 주기: 월 1회 기준 (사용자 판단으로 조정 가능)
- 금지: 임의 수치 / 출처 불명 데이터

### 3. Startup Screening Agent
- 책임: AI 스타트업 적합도 평가 / 수익성 + 발전성 + AI 진정성 스코어링
- 입력: Data Intake 결과 / Trend Research 결과 / 기업 기술 자료
- 출력: AI 진정성 스코어 / 기술력 평가 / 수익성 등급 / 발전성 등급 / 투자 매력도 요약
- 연결 대상: Financial Analysis Agent / Investor Matching Agent / Validation Coordinator Agent
- 금지: 확정적 투자 판단 / 임의 수치

### 4. Financial Analysis Agent
- 책임: 손익 / 현금흐름 / Burn Rate / 수익성 분석 (AI 기업 특화)
- 입력: 정규화된 재무자료 / Startup Screening 결과
- 출력: 재무분석 요약 / Burn Rate 분석 / 수익성 지표 / 자본 효율성 평가 / 재무 리스크
- 연결 대상: Valuation Modeling Agent / Validation Coordinator Agent
- 금지: 임의 수치 / 확정적 재무 판단

### 5. Valuation Modeling Agent
- 책임: DCF + EBITDA Multiple 기반 가치평가 / 시나리오 분석 / 리스크 + 밸류업 통합
- 입력: 재무분석 결과 / 성장률 가정 / 마진 가정 / 비교기업 자료
- 출력: 시나리오별 기업가치 범위 / 가정 목록 / 민감도 구조 / 가치 극대화 레버 / 리스크 요약
- 연결 대상: Investor Matching Agent / Validation Coordinator Agent
- 금지: 단일 확정 기업가치 / 수익 보장 표현
- 통합 범위: Risk Review + Value Maximization 흡수

### 6. Investor Matching Agent
- 책임: AI 투자자 유형 분류 / 스타트업-투자자 적합도 / 진입 전략 + IR 구조
- 입력: Startup Screening 결과 / Valuation 결과 / Trend Research 결과
- 출력: 투자자 유형별 적합도 매트릭스 / 접근 전략 / IR 핵심 메시지 / 진입 타이밍 분석
- 연결 대상: Validation Coordinator Agent
- 금지: 특정 투자자 실명 확정 매칭 / 투자 성사 보장

### 7. Validation Coordinator Agent
- 책임: Codex 검증 요청 / 검증 결과 반영 / 재작업 흐름 / 최종 산출물 확정
- 입력: 각 Agent 산출물 / Codex 검증 결과
- 출력: 검증 요청 목록 / 실패 항목 / 수정 지시 / 최종 산출물
- 연결 대상: Claude Code / Codex / LLM Wiki 전체
- 금지: 검증 미완료 산출물 통과 처리

---

## Agent 연결 관계
- Data Intake → Startup Screening / Financial Analysis / Validation Coordinator
- Trend Research → Startup Screening / Investor Matching
- Startup Screening → Financial Analysis / Investor Matching / Validation Coordinator
- Financial Analysis → Valuation Modeling / Validation Coordinator
- Valuation Modeling → Investor Matching / Validation Coordinator
- Investor Matching → Validation Coordinator
- Validation Coordinator → Claude Code / Codex / LLM Wiki

---

## 역할 중복 방지 기준
- AI 진정성 판단 = Startup Screening Agent 전담
- 재무 수치 = Financial Analysis Agent 전담
- 밸류에이션 + 리스크 + 밸류업 = Valuation Modeling Agent 전담
- 투자자 매칭 + IR 논리 = Investor Matching Agent 전담
- 트렌드 리서치 = Trend Research Agent 전담
- 검증 흐름 = Validation Coordinator Agent 전담

---

## 제거된 Agent 및 사유
- Business Model Agent → Startup Screening에 흡수
- Risk Review Agent → Valuation Modeling에 흡수
- Value Maximization Agent → Valuation Modeling에 흡수
- Investor Narrative Agent → Investor Matching에 통합
- Market & Competition Agent → Trend Research + Startup Screening으로 분산
