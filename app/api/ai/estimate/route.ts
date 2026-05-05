import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude } from "@/lib/claude";
import {
  getSupabaseServiceClient,
  isSupabaseServiceConfigured,
} from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectType, spaceSize, requirements, budget, stylePreference } = body;

    if (!projectType || !requirements) {
      return NextResponse.json(
        { error: "프로젝트 유형과 요구사항은 필수입니다." },
        { status: 400 }
      );
    }

    const systemPrompt = `당신은 10년 경력의 인테리어 전문 견적 담당자입니다.
고객의 요구사항을 바탕으로 현실적이고 상세한 견적서 초안을 작성합니다.

규칙:
- 항목별로 명확하게 구분하여 작성
- 공종별 단가 범위를 현실적으로 제시 (시장가 기준)
- 합계는 반드시 범위로 표시 (예: 1,200~1,500만원)
- 추가 검토 필요 항목은 별도로 표시
- 확정 금액이 아닌 초안임을 명시
- 한국어로 작성`;

    const userPrompt = `다음 조건으로 인테리어 견적서 초안을 작성해주세요.

프로젝트 유형: ${projectType}
공간 크기: ${spaceSize ? spaceSize + "평" : "미입력"}
예산 범위: ${budget ? budget + "만원" : "미정"}
스타일 선호: ${stylePreference || "미정"}
요구사항:
${requirements}

형식:
1. 공종별 항목 및 단가 범위
2. 소계
3. 추가 검토 항목
4. 총 견적 범위
5. 주의사항`;

    const result = await generateWithClaude(systemPrompt, userPrompt, 1500);

    if (!isSupabaseServiceConfigured()) {
      return NextResponse.json({
        result,
        saved: false,
        savedId: null,
        warning: "Supabase 서버 환경변수가 없어 견적 결과를 저장하지 않았습니다.",
      });
    }

    const { data, error: saveError } = await getSupabaseServiceClient()
      .from("estimates")
      .insert({
        project_type: projectType,
        space_size: spaceSize ? Number(spaceSize) : null,
        requirements,
        ai_result: result,
        final_amount: budget ? Number(budget) : null,
        status: "draft",
      })
      .select("id")
      .single();

    if (saveError) {
      return NextResponse.json({
        result,
        saved: false,
        savedId: null,
        warning: `AI 견적은 생성됐지만 저장에 실패했습니다: ${saveError.message}`,
      });
    }

    return NextResponse.json({ result, saved: true, savedId: data.id });
  } catch (error) {
    console.error("견적 생성 오류:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "견적 생성 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
