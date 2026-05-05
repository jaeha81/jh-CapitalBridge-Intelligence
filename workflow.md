# workflow.md — v2 (AI 특화 재편)
> 참조: main-harness.md / sub-agents.md / validation-flow.md

## 정기 리서치 사이클 (월 1회)
- 담당: Trend Research Agent
- 입력: 사용자 지정 AI 섹터 / 외부 리서치 자료
- 출력: 트렌드 요약 + 유망 섹터 업데이트
- 트리거: 트렌드 변화 → Startup Screening 재평가 신호 발생

---

## 개별 스타트업 분석 흐름

### Phase 1: 데이터 수집
- 담당: Data Intake Agent
- 도구: company-intake-template.md / financial-data-template.md
- 출력: 정규화 입력 데이터 + 누락 목록
- 조건: 누락 시 사용자에게 재요청 후 진행

### Phase 2: AI 스타트업 스크리닝
- 담당: Startup Screening Agent
- 선행 조건: Phase 1 완료 + 최신 Trend Research 결과
- 도구: startup-screening-template.md
- 출력: AI 진정성 스코어 / 수익성 등급 / 발전성 등급

### Phase 3: 재무 분석
- 담당: Financial Analysis Agent
- 선행 조건: Phase 1 완료
- 출력: Burn Rate / 수익성 지표 / 자본 효율성 / 재무 리스크

### Phase 4: 밸류에이션 + 리스크 + 밸류업
- 담당: Valuation Modeling Agent
- 선행 조건: Phase 2 + Phase 3 완료
- 도구: valuation-assumption-template.md
- 출력: 시나리오별 기업가치 범위 / 가치 극대화 레버 / 리스크 요약

### Phase 5: 투자자 매칭 + 진입 전략
- 담당: Investor Matching Agent
- 선행 조건: Phase 2 + Phase 4 완료 + 최신 Trend Research 결과
- 도구: investor-matching-template.md
- 출력: 투자자 유형별 적합도 / IR 메시지 구조 / 진입 타이밍

### Phase 6: 검증 및 확정
- 담당: Validation Coordinator Agent + Codex
- 선행 조건: Phase 5 완료
- 실패 시: validation-flow.md 참조
- 통과 시: LLM Wiki 갱신 + 최종 산출물 확정

---

## 흐름 요약
```
[월 1회] Trend Research
         ↓
Phase 1 → Phase 2 + Phase 3 (병행 가능)
         ↓
      Phase 4
         ↓
      Phase 5
         ↓
      Phase 6 → 최종 산출물
```
