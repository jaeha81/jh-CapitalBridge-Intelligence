# valuation-assumption-template.md — v2 (AI 스타트업 특화)
> 담당: Valuation Modeling Agent
> 주의: 모든 수치는 "가정 기반 분석". 확정값 금지.

## 분석 기준
- 기업명:
- 기준일:
- 적용 방법론: DCF / EBITDA Multiple (PER·PSR·PTA 제외)
- 스크리닝 등급 참조: (startup-screening-template 결과)

---

## DCF 분석 가정

### 기본 설정
- 예측 기간 (년):
- 잔존가치 방법: Gordon Growth / Exit Multiple
- 잔존가치 성장률 가정:
- 세율 가정:

### WACC 가정 (시나리오별)
- Bear Case WACC:
- Base Case WACC:
- Bull Case WACC:
- 근거: (AI 스타트업 특성 반영 — 높은 불확실성으로 일반 기업 대비 할증 적용 권장)

### 매출 성장률 가정 (연도별, 시나리오별)
- Bear Case 성장률:
- Base Case 성장률:
- Bull Case 성장률:
- 근거:

### 마진 가정
- 현재 Gross Margin:
- 예측 기간 Gross Margin 목표:
- 영업이익 전환 시점 가정:
- 근거:

### AI 기업 특화 가정 항목
- API 비용 구조 변화 가정: (AI 인프라 비용 하락 반영 여부)
- 데이터 자산 가치 반영 여부: Y / N
- 기술 인력 비용 증가 가정:
- 모델 재학습 / 유지 비용 가정:

### CAPEX / 운전자본
- CAPEX 가정: (AI 인프라 투자 포함)
- 순운전자본 변동 가정:

---

## EBITDA Multiple 분석 가정

- 비교기업 EV/EBITDA 범위: (출처 명시)
- 적용 Multiple 범위:
- 기준 EBITDA: (연도 명시)
- AI 기업 Multiple 조정 근거: (기술 프리미엄 / 성장성 프리미엄)
- 주의: EBITDA 음수인 초기 스타트업은 적용 제한 → 아래 대안 방법론 사용

## 초기 스타트업 대안 방법론 (EBITDA 음수 시 적용)

### ARR Multiple (반복 매출 기반)
- 적용 조건: 구독/반복 매출(ARR) 발생 스타트업
- 비교기업 EV/ARR 범위: (출처 명시)
- 적용 Multiple 범위:
- 기준 ARR: (연도 명시)
- AI SaaS 기업 ARR Multiple 조정 근거:

### Revenue Multiple (매출 기반)
- 적용 조건: ARR 미발생 또는 거래형 매출 스타트업
- 비교기업 EV/Revenue 범위: (출처 명시)
- 적용 Multiple 범위:
- 기준 매출: (연도 명시)
- 주의: 성장률 높을수록 Multiple 프리미엄 적용 가능하나 근거 명시 필수

### 방법론 선택 기준
- ARR 존재 + 반복 매출 50% 이상 → ARR Multiple 우선
- 거래형 / 프로젝트형 매출 → Revenue Multiple 적용
- EBITDA 전환 시점 가정 가능 시 → DCF 병행

---

## 시나리오 정의

### Bear Case (하단)
- 가정: 성장 둔화 / 경쟁 심화 / AI 도입 지연
- 핵심 변수:

### Base Case (중간)
- 가정: 현재 추세 유지 / 시장 기대 수준
- 핵심 변수:

### Bull Case (상단)
- 가정: 시장 빠른 성장 / 경쟁우위 강화 / AI 수요 폭발
- 핵심 변수:

---

## 민감도 분석 변수
- 변수 1 (할인율 WACC): ± 범위
- 변수 2 (매출 성장률): ± 범위
- 변수 3 (Gross Margin): ± 범위

---

## 가치 극대화 레버 (Valuation Modeling Agent 통합 항목)
- 재무 레버: (마진 개선 / Burn Rate 감소)
- 기술 레버: (데이터 자산 축적 / 모델 고도화)
- 시장 레버: (고객 확장 / 반복 매출 비중 증가)
- 운영 레버: (핵심 인력 안정화 / 자본 효율화)

---

## 리스크 요약 (Valuation Modeling Agent 통합 항목)
- 재무 리스크: H/M/L + 근거
- 밸류에이션 과대평가 위험: H/M/L + 근거
- 데이터 부족 항목:
- AI 특화 리스크: (API 의존도 / 모델 성능 저하 / 규제 리스크)

---

## 가정 검증 체크리스트
- [ ] DCF 가정 일관성 확인
- [ ] WACC AI 스타트업 특성 반영
- [ ] 비교기업 출처 명시
- [ ] 시나리오 3단계 완료
- [ ] 단일 확정값 없음
- [ ] 리스크 표시 포함
