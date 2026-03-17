import type { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient, hasServiceRoleEnv } from "@/lib/supabase/admin";
import type { Database, InsertDto, Row } from "@/types/database";

export type PaymentRecord = Row<"payments">;
type PaymentInsertError = {
  message?: string;
} | null;
type PaymentSummary = Pick<
  PaymentRecord,
  "amount" | "created_at" | "external_id" | "paid_at" | "plan" | "provider" | "status"
>;

export async function createPaymentRecord(
  input: InsertDto<"payments">,
): Promise<{ error: PaymentInsertError }> {
  if (!hasServiceRoleEnv) {
    return {
      error: new Error("SUPABASE_SERVICE_ROLE_KEY is not set"),
    };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.from("payments").insert(input);
  return { error };
}

export async function updatePaymentByExternalId(
  externalId: string,
  input: Partial<PaymentRecord>,
): Promise<PostgrestSingleResponse<PaymentRecord>> {
  if (!hasServiceRoleEnv) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const adminClient = createAdminClient();

  return adminClient
    .from("payments")
    .update(input)
    .eq("external_id", externalId)
    .select("*")
    .single();
}

export async function getPaymentByExternalId(externalId: string): Promise<PaymentRecord | null> {
  if (!hasServiceRoleEnv) {
    return null;
  }

  const adminClient = createAdminClient();
  const { data } = await adminClient
    .from("payments")
    .select("*")
    .eq("external_id", externalId)
    .maybeSingle();

  return data;
}

export async function getRecentPaymentsForUser(
  supabase: SupabaseClient<Database>,
  userId: string,
  limit = 5,
): Promise<
  Pick<
    PaymentRecord,
    "amount" | "created_at" | "external_id" | "paid_at" | "plan" | "provider" | "status" | "id"
  >[]
> {
  const { data } = await supabase
    .from("payments")
    .select("id, external_id, amount, status, provider, created_at, paid_at, plan")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function getOrderSummary(orderId: string): Promise<PaymentSummary | null> {
  if (!hasServiceRoleEnv) {
    return null;
  }

  const adminClient = createAdminClient();
  const { data } = await adminClient
    .from("payments")
    .select("external_id, amount, status, provider, paid_at, created_at, plan")
    .eq("external_id", orderId)
    .maybeSingle();

  return data;
}
