import { createAdminClient, hasServiceRoleEnv } from "@/lib/supabase/admin";
import type { Json, Row } from "@/types/database";

export type WebhookEventRecord = Row<"webhook_events">;
export type WebhookEventClaim = WebhookEventRecord & {
  should_process: boolean;
};
export type WebhookEventSummary = Pick<
  WebhookEventRecord,
  "created_at" | "error_message" | "event_type" | "external_id" | "id" | "processed_at" | "provider" | "status"
>;

export async function claimWebhookEvent(input: {
  eventKey: string;
  eventType: string;
  externalId: string;
  payload: Json;
  provider: WebhookEventRecord["provider"];
}): Promise<WebhookEventClaim> {
  if (!hasServiceRoleEnv) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const adminClient = createAdminClient();
  const { data, error } = await adminClient.rpc("claim_webhook_event", {
    p_event_key: input.eventKey,
    p_event_type: input.eventType,
    p_external_id: input.externalId,
    p_payload: input.payload,
    p_provider: input.provider,
  });

  if (error || !data?.[0]) {
    throw error ?? new Error("Failed to claim webhook event");
  }

  return data[0];
}

export async function markWebhookEventProcessed(id: string): Promise<void> {
  if (!hasServiceRoleEnv) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const adminClient = createAdminClient();
  const processedAt = new Date().toISOString();

  await adminClient
    .from("webhook_events")
    .update({
      error_message: null,
      processed_at: processedAt,
      status: "processed",
      updated_at: processedAt,
    })
    .eq("id", id);
}

export async function markWebhookEventFailed(id: string, errorMessage: string): Promise<void> {
  if (!hasServiceRoleEnv) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const adminClient = createAdminClient();

  await adminClient
    .from("webhook_events")
    .update({
      error_message: errorMessage.slice(0, 500),
      status: "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
}

export async function getRecentWebhookEvents(limit = 10): Promise<WebhookEventSummary[]> {
  if (!hasServiceRoleEnv) {
    return [];
  }

  const adminClient = createAdminClient();
  const { data } = await adminClient
    .from("webhook_events")
    .select("id, provider, external_id, event_type, status, error_message, created_at, processed_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
