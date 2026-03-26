const DISABLED_FLAG_VALUES = new Set(["0", "false", "no", "off"]);

function isPresent(value: string | undefined) {
  return Boolean(value?.trim());
}

function getTrimmedEnvValue(key: string) {
  const value = process.env[key];
  const trimmedValue = value?.trim();

  return trimmedValue ? trimmedValue : null;
}

function isFeatureFlagEnabled(value: string | undefined) {
  if (!value) {
    return true;
  }

  return !DISABLED_FLAG_VALUES.has(value.trim().toLowerCase());
}

export const featureToggleEnv = {
  admin: "NEXT_PUBLIC_ENABLE_ADMIN",
  ai: "NEXT_PUBLIC_ENABLE_AI",
  auth: "NEXT_PUBLIC_ENABLE_AUTH",
  contact: "NEXT_PUBLIC_ENABLE_CONTACT",
  payments: "NEXT_PUBLIC_ENABLE_PAYMENTS",
  waitlist: "NEXT_PUBLIC_ENABLE_WAITLIST",
} as const;

export const publicFeatureFlags = {
  admin: isFeatureFlagEnabled(process.env.NEXT_PUBLIC_ENABLE_ADMIN),
  ai: isFeatureFlagEnabled(process.env.NEXT_PUBLIC_ENABLE_AI),
  auth: isFeatureFlagEnabled(process.env.NEXT_PUBLIC_ENABLE_AUTH),
  contact: isFeatureFlagEnabled(process.env.NEXT_PUBLIC_ENABLE_CONTACT),
  payments: isFeatureFlagEnabled(process.env.NEXT_PUBLIC_ENABLE_PAYMENTS),
  waitlist: isFeatureFlagEnabled(process.env.NEXT_PUBLIC_ENABLE_WAITLIST),
} as const;

export const supabasePublicEnvKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
] as const;

export type SupabasePublicConfig = {
  authEnabled: boolean;
  supabasePublishableKey: string | null;
  supabaseUrl: string | null;
};

export function getSupabasePublicConfig(): SupabasePublicConfig {
  const supabaseUrl = getTrimmedEnvValue("NEXT_PUBLIC_SUPABASE_URL");
  const supabasePublishableKey = getTrimmedEnvValue(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  );
  const hasSupabasePublicEnv = Boolean(
    supabaseUrl && supabasePublishableKey,
  );

  return {
    authEnabled:
      isFeatureFlagEnabled(process.env.NEXT_PUBLIC_ENABLE_AUTH) &&
      hasSupabasePublicEnv,
    supabasePublishableKey,
    supabaseUrl,
  };
}

export function getMissingEnv(keys: readonly string[]) {
  return keys.filter((key) => !isPresent(process.env[key]));
}

export const hasSupabasePublicEnv =
  getMissingEnv(supabasePublicEnvKeys).length === 0;

export const authFeatureEnabled =
  publicFeatureFlags.auth && hasSupabasePublicEnv;

export const waitlistFeatureEnabled =
  publicFeatureFlags.waitlist && hasSupabasePublicEnv;

export function getSupabaseConfigError() {
  return [
    "Supabase auth belum aktif.",
    `Isi ${supabasePublicEnvKeys.join(", ")} untuk mengaktifkan login, signup, dan dashboard.`,
    `Kalau app kamu belum butuh auth, set ${featureToggleEnv.auth}=false.`,
  ].join(" ");
}
