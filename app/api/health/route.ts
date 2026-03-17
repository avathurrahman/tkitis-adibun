import { NextResponse } from "next/server";
import { createAdminClient, hasServiceRoleEnv } from "@/lib/supabase/admin";

type HealthCheck = {
  latency_ms: number | null;
  ok: boolean | null;
};

export async function GET() {
  const checks = {
    resend: Boolean(process.env.RESEND_API_KEY),
    supabase_public: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    ),
    supabase_service_role: hasServiceRoleEnv,
  };

  const database: HealthCheck = {
    latency_ms: null,
    ok: null,
  };

  if (hasServiceRoleEnv) {
    const startedAt = Date.now();
    const { error } = await createAdminClient()
      .from("profiles")
      .select("id", { head: true })
      .limit(1);

    database.latency_ms = Date.now() - startedAt;
    database.ok = !error;
  }

  const status =
    checks.supabase_public && (database.ok === null || database.ok)
      ? "ok"
      : "degraded";

  return NextResponse.json(
    {
      checks,
      database,
      payment_provider: process.env.PAYMENT_PROVIDER ?? "doku",
      status,
      timestamp: new Date().toISOString(),
    },
    {
      status: status === "ok" ? 200 : 503,
    },
  );
}
