# main-harness.md — CapitalBridge Intelligence Harness
> 참조: agent-registry.md / workflow.md / validation-flow.md

## 하네스 목적
기업가치분석 극대화 컨설팅의 전 과정을 구조화된 Agent 흐름으로 운영한다.

## 운영 원칙
- 모든 분석은 사용자 입력 데이터 기반
- 임의 수치 생성 금지
- 모든 결과는 "가정 기반 분석"으로 표현
- 기업가치는 범위 + 시나리오로만 표현
- Codex 검증 통과 전 최종 산출물 확정 금지
- 상태는 LLM Wiki에 기록

## 하네스 진입점
- 입력: 기업 기본정보 + 재무자료 + 시장/경쟁사 자료
- 도구: /templates/company-intake-template.md
- 담당: Data Intake Agent

## 처리 흐름 요약
1. 데이터 수집 및 정규화 → Data Intake Agent
2. 재무 분석 → Financial Analysis Agent
3. 시장·경쟁 분석 → Market & Competition Agent (병행)
4. 사업모델 분석 → Business Model Agent (병행)
5. 밸류에이션 모델링 → Valuation Modeling Agent
6. 리스크 검토 → Risk Review Agent
7. 가치 극대화 전략 → Value Maximization Agent
8. 투자자 논리 구조 → Investor Narrative Agent
9. 보고서 구조화 → Report Builder Agent
10. 검증 및 확정 → Validation Coordinator Agent → Codex

## 산출물
- 재무분석 요약
- 시나리오별 기업가치 범위
- 밸류업 전략 문서
- 투자자용 IR 논리 구조
- 내부 의사결정 보고서
- 최종 컨설팅 보고서

## 검증 실패 시
- Validation Coordinator Agent가 오류 항목 특정
- 관련 Agent로 되돌려 수정
- 수정 후 Codex 재검증 요청
- 통과 전 산출물 확정 불가
