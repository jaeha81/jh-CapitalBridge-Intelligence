import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude } from "@/lib/claude";
import {
  getSupabaseServiceClient,
  isSupabaseServiceConfigured,
} from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectType, styleTag, platform, additionalContext } = body;

    if (!projectType) {
      return NextResponse.json(
        { error: "프로젝트 유형은 필수입니다." },
        { status: 400 }
      );
    }

    const systemPrompt = `당신은 인테리어 전문 SNS 마케터입니다.
시공 완료 사진을 위한 매력적인 SNS 게시글을 작성합니다.

규칙:
- 인테리어 전문성이 느껴지는 문체
- 고객 공감을 유도하는 스토리텔링
- 적절한 해시태그 포함
- 인스타그램: 감성적이고 간결하게 (300자 이내 + 해시태그)
- 블로그: 시공 과정과 포인트를 상세하게 (500자 이상)
- 한국어로 작성`;

    const platforms = platform === "both"
      ? "인스타그램과 블로그 두 가지 버전"
      : platform === "instagram" ? "인스타그램 버전" : "블로그 버전";

    const userPrompt = `다음 시공 프로젝트의 ${platforms} SNS 게시글을 작성해주세요.

프로젝트 유형: ${projectType}
스타일 태그: ${styleTag || "없음"}
추가 정보: ${additionalContext || "없음"}

${platform === "both" ? `
[인스타그램 버전]
(감성적이고 짧게, 해시태그 포함)

[블로그 버전]
(상세하게, 시공 포인트 설명)
` : platform === "instagram" ? `
[인스타그램 게시글]
` : `
[블로그 게시글]
`}`;

    const result = await generateWithClaude(systemPrompt, userPrompt, 1200);

    if (!isSupabaseServiceConfigured()) {
      return NextResponse.json({
        result,
        saved: false,
        savedId: null,
        warning: "Supabase 서버 환경변수가 없어 SNS 콘텐츠를 저장하지 않았습니다.",
      });
    }

    const normalizedPlatform =
      platform === "instagram" || platform === "blog" || platform === "both"
        ? platform
        : "both";

    const { data, error: saveError } = await getSupabaseServiceClient()
      .from("sns_contents")
      .insert({
        project_type: projectType,
        style_tag: styleTag || null,
        ai_caption: result,
        platform: normalizedPlatform,
        status: "draft",
      })
      .select("id")
      .single();

    if (saveError) {
      return NextResponse.json({
        result,
        saved: false,
        savedId: null,
        warning: `SNS 콘텐츠는 생성됐지만 저장에 실패했습니다: ${saveError.message}`,
      });
    }

    return NextResponse.json({ result, saved: true, savedId: data.id });
  } catch (error) {
    console.error("SNS 콘텐츠 생성 오류:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "콘텐츠 생성 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
