import { NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = getSupabaseServiceClient();
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [customers, active, completed, estimates] = await Promise.all([
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase
        .from("customers")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("customers")
        .select("id", { count: "exact", head: true })
        .eq("status", "completed"),
      supabase
        .from("estimates")
        .select("id", { count: "exact", head: true })
        .gte("created_at", monthStart.toISOString()),
    ]);

    const failed = [
      customers.error,
      active.error,
      completed.error,
      estimates.error,
    ].find(Boolean);

    if (failed) {
      throw failed;
    }

    return NextResponse.json({
      customers: customers.count ?? 0,
      activeProjects: active.count ?? 0,
      monthlyEstimates: estimates.count ?? 0,
      completedProjects: completed.count ?? 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "대시보드 데이터를 불러오지 못했습니다.",
      },
      { status: 500 }
    );
  }
}
