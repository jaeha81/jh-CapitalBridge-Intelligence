import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const { data, error } = await getSupabaseServiceClient()
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ partners: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "협력업체 목록을 불러오지 못했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const category = String(body.category ?? "").trim();

    if (!name || !category) {
      return NextResponse.json(
        { error: "업체명과 분야는 필수입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabaseServiceClient()
      .from("partners")
      .insert({
        name,
        category,
        contact: body.contact || null,
        region: body.region || null,
        specialty: body.specialty || null,
        rating: body.rating ?? null,
        notes: body.notes || null,
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ partner: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "협력업체 등록에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
