import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude } from "@/lib/claude";
import {
  getSupabaseServiceClient,
  isSupabaseServiceConfigured,
} from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { styleKeyword, roomType, budgetRange, additionalNotes } = body;

    if (!styleKeyword || !roomType) {
      return NextResponse.json(
        { error: "스타일 키워드와 공간 유형은 필수입니다." },
        { status: 400 }
      );
    }

    const systemPrompt = `당신은 인테리어 자재 및 가구 전문 컨설턴트입니다.
고객의 스타일 키워드와 예산에 맞는 자재와 가구를 제안합니다.

규칙:
- 구체적인 제품명이나 브랜드 예시 포함
- 주요 자재와 포인트 가구를 분리하여 제안
- 예산 범위에 맞는 현실적인 옵션 제시
- 색상 코드나 마감재 이름 구체적으로 명시
- 한국 시장 기준으로 작성
- 한국어로 작성`;

    const userPrompt = `다음 조건에 맞는 인테리어 자재/가구 제안서를 작성해주세요.

스타일 키워드: ${styleKeyword}
공간 유형: ${roomType}
예산 범위: ${budgetRange || "미정"}
추가 요청: ${additionalNotes || "없음"}

형식:
1. 스타일 컨셉 요약 (2-3줄)
2. 바닥재 제안 (2가지 옵션)
3. 벽면 마감 제안 (색상/소재)
4. 포인트 가구 추천 (3-5개)
5. 조명 제안
6. 소품 및 패브릭 방향
7. 예산 배분 가이드`;

    const result = await generateWithClaude(systemPrompt, userPrompt, 1500);

    if (!isSupabaseServiceConfigured()) {
      return NextResponse.json({
        result,
        saved: false,
        savedId: null,
        warning: "Supabase 서버 환경변수가 없어 제안서 결과를 저장하지 않았습니다.",
      });
    }

    const { data, error: saveError } = await getSupabaseServiceClient()
      .from("proposals")
      .insert({
        style_keyword: styleKeyword,
        room_type: roomType,
        budget_range: budgetRange || null,
        ai_result: result,
      })
      .select("id")
      .single();

    if (saveError) {
      return NextResponse.json({
        result,
        saved: false,
        savedId: null,
        warning: `AI 제안서는 생성됐지만 저장에 실패했습니다: ${saveError.message}`,
      });
    }

    return NextResponse.json({ result, saved: true, savedId: data.id });
  } catch (error) {
    console.error("제안서 생성 오류:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "제안서 생성 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
