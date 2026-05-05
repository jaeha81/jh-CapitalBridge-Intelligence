# validation-flow.md — 검증 흐름 정의
> 참조: validation-log.md / agent-registry.md

## Codex 검증 요청 기준
- Phase 완료 시 Validation Coordinator Agent가 요청
- validation-log.md에 요청 내역 기록
- 검증 범위: 해당 Phase 산출물 전체

## 검증 항목 (전 Phase 공통)
- 역할 중복 여부
- 입력/출력 연결 누락 여부
- 임의 수치 생성 여부
- 투자자문 오인 표현 여부
- 법률·세무 확정 표현 여부

## 검증 항목 (밸류에이션 특화)
- 방법론별 가정 일관성
- DCF 흐름 오류 여부
- Multiple 적용 기준 오류 여부
- CCA 비교 기준 오류 여부
- PTA 거래 기준 오류 여부
- 시나리오 분기 누락 여부
- 과대평가 위험 표시 여부

## 검증 통과 기준
- 모든 항목 오류 없음
- 투자자문 / 법적 문구 없음
- 임의 수치 없음
- 시나리오 3단계 포함
- 리스크 표시 포함

## 검증 실패 시 흐름
1. Codex → 오류 항목을 validation-log.md에 기록
2. Validation Coordinator Agent → current-state.md 갱신
3. Validation Coordinator Agent → 관련 Agent에 수정 지시
4. 해당 Agent → 수정 완료 후 재제출
5. Codex → 재검증 수행
6. 통과 시 decision-log.md + current-state.md 갱신
7. 통과 전 최종 산출물 확정 불가

## 검증 실패 유형별 관련 Agent
- 임의 수치 생성 → Data Intake Agent 또는 Financial Analysis Agent로 반환
- 밸류에이션 가정 오류 → Valuation Modeling Agent로 반환
- 투자자문 표현 → Investor Matching Agent 또는 Validation Coordinator Agent로 반환
- 리스크 누락 → Valuation Modeling Agent로 반환
- 보고서 논리 오류 → Validation Coordinator Agent로 반환
