import { FeatureNotice } from "@/components/config/feature-notice";
import {
  featureToggleEnv,
  supabasePublicEnvKeys,
} from "@/lib/config/public-features";

type SupabaseEnvNoticeProps = {
  compact?: boolean;
};

export function SupabaseEnvNotice({
  compact = false,
}: SupabaseEnvNoticeProps) {
  if (compact) {
    return (
      <p className="text-sm text-muted-foreground">
        Auth belum tersedia untuk app ini saat ini.
      </p>
    );
  }

  return (
    <FeatureNotice
      description="Login, signup, session, dan dashboard belum tersedia untuk app ini saat ini."
      missingEnv={[...supabasePublicEnvKeys]}
      title="Auth belum aktif"
      toggleEnv={featureToggleEnv.auth}
    />
  );
}
