# main-harness.md — CapitalBridge Intelligence Harness v2
> 참조: agent-registry.md / workflow.md / validation-flow.md

## 하네스 목적
AI 스타트업 가치분석, 투자자 매칭, 진입 전략 지원 전 과정을 7개 Agent 흐름으로 운영한다.

## 운영 원칙
- 모든 분석은 사용자 입력 데이터 기반
- 임의 수치 생성 금지
- 출처 불명 데이터 사용 금지
- 모든 결과는 "가정 기반 분석"으로 표현
- 기업가치는 단일 확정값이 아닌 범위 + 시나리오로만 표현
- 투자 성사, 수익 보장, 특정 투자자 확정 매칭 표현 금지
- Codex 검증 통과 전 최종 산출물 확정 금지
- 상태는 LLM Wiki에 기록

## 하네스 진입점
- 입력: 기업 기본정보 + 재무자료 + AI 기술 스택 자료 + 팀 구성 정보
- 도구: company-intake-template.md / financial-data-template.md
- 담당: Data Intake Agent

## 처리 흐름 요약
1. 데이터 수집 및 정규화 → Data Intake Agent
2. AI 산업 트렌드 및 투자 흐름 리서치 → Trend Research Agent
3. AI 스타트업 적합도 및 AI 진정성 스크리닝 → Startup Screening Agent
4. 손익, 현금흐름, Burn Rate, 수익성 분석 → Financial Analysis Agent
5. DCF + EBITDA Multiple 기반 가치평가, 리스크, 밸류업 통합 → Valuation Modeling Agent
6. 투자자 유형 매칭, 접근 전략, IR 메시지 구조화 → Investor Matching Agent
7. 검증 및 확정 → Validation Coordinator Agent → Codex

## 병행 가능 흐름
- Trend Research는 월 1회 정기 리서치로 독립 실행 가능
- Phase 1 완료 후 Startup Screening과 Financial Analysis는 병행 가능
- Valuation Modeling은 Startup Screening + Financial Analysis 결과를 선행 조건으로 사용
- Investor Matching은 Startup Screening + Valuation Modeling + 최신 Trend Research 결과를 선행 조건으로 사용

## 산출물
- 정규화된 입력 데이터 및 누락 항목 목록
- 산업별 AI 도입 트렌드 요약 및 투자 흐름 요약
- AI 진정성 스코어 및 투자 매력도 요약
- 재무분석 요약, Burn Rate 분석, 수익성 지표
- 시나리오별 기업가치 범위, 민감도 구조, 가치 극대화 레버, 리스크 요약
- 투자자 유형별 적합도 매트릭스, 접근 전략, IR 핵심 메시지
- Codex 검증 요청 목록, 실패 항목, 수정 지시, 최종 산출물

## 검증 실패 시
- Validation Coordinator Agent가 오류 항목을 특정한다.
- 관련 Agent로 되돌려 수정 지시한다.
- 수정 후 Codex 재검증을 요청한다.
- 검증 통과 전 산출물을 최종 확정하지 않는다.
