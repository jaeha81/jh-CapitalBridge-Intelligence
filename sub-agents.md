# sub-agents.md — Sub Agent 상세 정의
> 참조: agent-registry.md / main-harness.md

## Sub Agent 작업 단위 정의

---

### Data Intake Agent
- 작업 1: company-intake-template.md 기반 기업 기본정보 수집
- 작업 2: financial-data-template.md 기반 재무자료 수집
- 작업 3: 누락 데이터 목록 작성
- 작업 4: 검증 필요 항목 표시
- 출력 저장: /outputs/sample-analysis-structure.md 초안

---

### Financial Analysis Agent
- 작업 1: 매출 구조 분석 (연도별 추이, 구성비)
- 작업 2: 비용 구조 분석 (고정비/변동비 분리)
- 작업 3: 손익 분석 (영업이익률, 순이익률 추이)
- 작업 4: 현금흐름 분석 (영업CF, 투자CF, 재무CF)
- 작업 5: 성장률 가정 도출
- 작업 6: 마진 가정 도출
- 작업 7: 재무 리스크 목록 작성
- 출력 형식: 항목형 요약, 수치는 입력 기반만

---

### Valuation Modeling Agent
- 작업 1: DCF 모델 구조 설정 (WACC / 성장률 / 잔존가치 가정 포함)
- 작업 2: EBITDA Multiple 적용 (비교기업 EV/EBITDA 범위 기반)
- 작업 3: PER 분석 (비교기업 P/E 범위 기반)
- 작업 4: PSR 분석 (비교기업 P/S 범위 기반)
- 작업 5: Comparable Company Analysis 구조
- 작업 6: Precedent Transaction Analysis 구조
- 작업 7: 시나리오 3단계 설정 (하단 / 중간 / 상단)
- 작업 8: 민감도 분석 구조 (주요 변수 ±변동 시 가치 범위)
- 출력 형식: 범위 및 시나리오, 확정값 금지

---

### Business Model Agent
- 작업 1: 수익모델 분류 (구독 / 거래 / 서비스 / 라이선스 등)
- 작업 2: 고객군 분석 (세그먼트별 매출 기여)
- 작업 3: 경쟁우위 요소 도출
- 작업 4: 확장성 평가 (지역 / 제품 / 채널)
- 작업 5: 취약점 목록 작성

---

### Market & Competition Agent
- 작업 1: TAM / SAM / SOM 구조 정의 (입력 데이터 기반)
- 작업 2: 시장 성장률 가정 정의
- 작업 3: 주요 경쟁사 포지셔닝 분석
- 작업 4: 산업 리스크 요인 목록
- 작업 5: 비교기업 후보 목록 (CCA용)

---

### Value Maximization Agent
- 작업 1: 가치 극대화 레버 도출 (재무 / 사업 / 시장 / 운영 측면)
- 작업 2: 레버별 예상 기여도 범위 정의 (가정 기반)
- 작업 3: 실행 우선순위 정렬
- 작업 4: 단기 / 중기 / 장기 개선 과제 분리
- 작업 5: 밸류업 전략 요약

---

### Risk Review Agent
- 작업 1: 재무 리스크 체크리스트 작성
- 작업 2: 밸류에이션 과대평가 위험 점검
- 작업 3: 데이터 부족 항목 표시
- 작업 4: 시장 리스크 목록
- 작업 5: 실행 리스크 목록
- 작업 6: 보완 필요 항목 우선순위 정리

---

### Investor Narrative Agent
- 작업 1: 투자 논리 핵심 메시지 3~5개 도출
- 작업 2: 예상 반박 질문 목록 (기관투자자 관점)
- 작업 3: 반박 대응 논리 구조
- 작업 4: IR 자료 논리 흐름 정의
- 주의: 투자 권유 / 수익 보장 표현 절대 금지

---

### Report Builder Agent
- 작업 1: 내부 의사결정 보고서 구조 완성
- 작업 2: 투자자용 설명자료 구조 완성
- 작업 3: 최종 컨설팅 보고서 구조 완성
- 출력: /outputs/ 폴더 내 각 보고서 구조 문서

---

### Validation Coordinator Agent
- 작업 1: 각 Agent 산출물 검증 요청 목록 작성
- 작업 2: Codex 검증 요청 발송
- 작업 3: 검증 실패 항목 → 관련 Agent로 수정 지시
- 작업 4: 재검증 완료 후 LLM Wiki 갱신
- 작업 5: current-state.md / validation-log.md 갱신
