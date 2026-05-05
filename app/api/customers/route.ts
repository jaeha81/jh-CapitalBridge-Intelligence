import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const { data, error } = await getSupabaseServiceClient()
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ customers: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "고객 목록을 불러오지 못했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 연락처는 필수입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabaseServiceClient()
      .from("customers")
      .insert({
        name,
        phone,
        email: body.email || null,
        style_preference: body.style_preference || null,
        budget: body.budget ?? null,
        status: body.status || "lead",
        notes: body.notes || null,
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ customer: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "고객 등록에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
