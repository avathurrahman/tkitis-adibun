import { createBrowserClient } from "@supabase/ssr";
import {
  type SupabasePublicConfig,
  getSupabaseConfigError,
  hasSupabasePublicEnv,
} from "@/lib/config/public-features";
import type { Database } from "@/types/database";

type SupabaseBrowserClientConfig = Pick<
  SupabasePublicConfig,
  "supabasePublishableKey" | "supabaseUrl"
>;

function getResolvedClientConfig(config?: SupabaseBrowserClientConfig) {
  const supabaseUrl =
    config?.supabaseUrl?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    null;
  const supabasePublishableKey =
    config?.supabasePublishableKey?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    null;

  return {
    hasSupabasePublicEnv: Boolean(supabaseUrl && supabasePublishableKey),
    supabasePublishableKey,
    supabaseUrl,
  };
}

export function createClient(config?: SupabaseBrowserClientConfig) {
  const resolvedConfig = getResolvedClientConfig(config);

  if (!resolvedConfig.hasSupabasePublicEnv && !hasSupabasePublicEnv) {
    throw new Error(getSupabaseConfigError());
  }

  return createBrowserClient<Database>(
    resolvedConfig.supabaseUrl!,
    resolvedConfig.supabasePublishableKey!,
  );
}
