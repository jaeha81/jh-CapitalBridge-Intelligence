import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serviceClient: SupabaseClient | null = null;

function readServerEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : null;
}

export function isSupabaseServiceConfigured() {
  return Boolean(
    readServerEnv("NEXT_PUBLIC_SUPABASE_URL") &&
      readServerEnv("SUPABASE_SERVICE_ROLE_KEY")
  );
}

export function getSupabaseServiceClient() {
  const supabaseUrl = readServerEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readServerEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase 서버 환경변수가 설정되지 않았습니다.");
  }

  if (!serviceClient) {
    serviceClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return serviceClient;
}
