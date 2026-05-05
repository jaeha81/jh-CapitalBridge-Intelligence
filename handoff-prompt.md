# handoff-prompt.md — v2
> 갱신 기준: 세션 종료 전 또는 주요 상태 변경 시마다 갱신

---

## 다음 세션 시작용 요약

너는 CapitalBridge Intelligence Harness v2의 메인 개발 오케스트레이터다.

이 시스템은 AI 스타트업 가치분석 + 투자자 매칭 + 진입 전략을 지원한다.
사용자는 시장 트렌드 판단 안목을 보유. 전문 분석 / 매칭 / 마케팅 컨설팅은 에이전트가 보완한다.

---

## 현재 상태
- MVP 2단계 완료: AI 특화 Agent 구조 + 템플릿 + 트렌드 리서치 사이클
- Agent: 7개 (10개에서 축소)
- Codex 검증: V-002 대기 중
- 실제 데이터: 미입력

---

## 이어서 할 작업
1. Codex V-002 검증 실행
2. 사용자에게 분석 대상 AI 섹터 선택 요청
3. trend-research-template.md 기반 첫 번째 트렌드 리서치 실행
4. 분석 대상 스타트업 선정 후 Phase 1 착수

---

## 주의할 제약
- AI Washing 판별 기준 엄격하게 적용
- 임의 수치 / 임의 기업 데이터 생성 절대 금지
- 투자 권유 / 수익 보장 표현 절대 금지
- Codex 검증 통과 전 최종 산출물 확정 불가
- 기업가치는 범위 + 시나리오로만 표현

---

## 최근 결정사항
- D-006: PER / PSR / PTA 제거
- D-007: 7개 Agent 축소
- D-008: 월 1회 트렌드 리서치 사이클
- D-009: AI 진정성 스코어링 도입

---

## Codex 검증 대기 항목 (V-002)
- agent-registry.md v2 역할 중복 여부
- workflow.md v2 흐름 누락 여부
- startup-screening-template.md AI 진정성 판별 기준 적절성
- investor-matching-template.md 투자자문 오인 표현 여부
- valuation-assumption-template.md v2 AI 특화 가정 일관성

---

## 파일 구조 전체
- /llm-wiki/project-overview.md
- /llm-wiki/agent-registry.md ← v2
- /llm-wiki/current-state.md ← v2
- /llm-wiki/decision-log.md
- /llm-wiki/validation-log.md
- /llm-wiki/handoff-prompt.md ← v2 (이 파일)
- /harness/main-harness.md
- /harness/sub-agents.md
- /harness/workflow.md ← v2
- /harness/validation-flow.md
- /templates/company-intake-template.md
- /templates/financial-data-template.md
- /templates/valuation-assumption-template.md ← v2
- /templates/risk-review-template.md
- /templates/trend-research-template.md ← 신규
- /templates/startup-screening-template.md ← 신규
- /templates/investor-matching-template.md ← 신규
- /outputs/sample-analysis-structure.md
- /outputs/investor-narrative-structure.md
- /outputs/final-consulting-report-structure.md
- /outputs/startup-investor-strategy-structure.md ← 신규

## Claude Code 다음 작업 명령
```
1. validation-log.md에 V-002 항목 추가
2. Codex V-002 검증 요청
3. 통과 시 current-state.md 갱신
4. 사용자에게 질문: "분석할 AI 섹터와 첫 번째 스타트업을 알려주세요"
```
