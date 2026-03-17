import { createAdminClient, hasServiceRoleEnv } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Row } from "@/types/database";

type ProfileSummary = Pick<Row<"profiles">, "avatar_url" | "created_at" | "full_name">;

export async function getProfileForCurrentUser(userId: string): Promise<ProfileSummary | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, created_at")
    .eq("id", userId)
    .maybeSingle();

  return data;
}

export async function updateProfileForUser(
  userId: string,
  input: {
    avatar_url: string | null;
    full_name: string | null;
  },
) {
  if (!hasServiceRoleEnv) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const adminClient = createAdminClient();
  return adminClient
    .from("profiles")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}
