import { createAdminClient, hasServiceRoleEnv } from "@/lib/supabase/admin";
import type { PaymentRecord } from "@/lib/data/payments";
import type { Database } from "@/types/database";

type AdminMetrics = Database["public"]["Functions"]["admin_payment_metrics"]["Returns"][number];
type AdminRevenueRow = Database["public"]["Functions"]["admin_revenue_by_day"]["Returns"][number];
type AdminPaymentRow = Pick<
  PaymentRecord,
  "id" | "amount" | "created_at" | "external_id" | "plan" | "provider" | "status"
>;

export async function getAdminMetrics(): Promise<AdminMetrics | null> {
  if (!hasServiceRoleEnv) {
    return null;
  }

  const adminClient = createAdminClient();
  const { data } = await adminClient.rpc("admin_payment_metrics");
  return data?.[0] ?? null;
}

export async function getAdminRevenueByDay(daysBack = 14): Promise<AdminRevenueRow[]> {
  if (!hasServiceRoleEnv) {
    return [];
  }

  const adminClient = createAdminClient();
  const { data } = await adminClient.rpc("admin_revenue_by_day", {
    days_back: daysBack,
  });

  return data ?? [];
}

export async function getAdminPaymentsPage(
  page: number,
  pageSize: number,
): Promise<{
  payments: AdminPaymentRow[];
  total: number;
}> {
  if (!hasServiceRoleEnv) {
    return {
      payments: [],
      total: 0,
    };
  }

  const adminClient = createAdminClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { count, data } = await adminClient
    .from("payments")
    .select("id, amount, status, provider, external_id, created_at, plan", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  return {
    payments: data ?? [],
    total: count ?? 0,
  };
}
