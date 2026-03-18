import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfigError, hasSupabasePublicEnv } from "@/lib/config/public-features";
import type { Database } from "@/types/database";

export function createClient() {
  if (!hasSupabasePublicEnv) {
    throw new Error(getSupabaseConfigError());
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
