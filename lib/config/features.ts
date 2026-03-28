import {
  authFeatureEnabled,
  featureToggleEnv,
  getMissingEnv,
  getSupabaseConfigNoticeMessage,
  hasSupabasePublicEnv,
  publicFeatureFlags,
  supabasePublicEnvKeys,
} from "@/lib/config/public-features";

export type FeatureKey =
  | "admin"
  | "ai"
  | "auth"
  | "billing"
  | "contact"
  | "payments"
  | "profileWrites"
  | "waitlist";

export type FeatureAvailability = {
  disabledByFlag: boolean;
  enabled: boolean;
  key: FeatureKey;
  message: string;
  missingEnv: string[];
  title: string;
  toggleEnv?: string;
};

type FeatureResultInput = {
  disabledByFlag?: boolean;
  enabled: boolean;
  key: FeatureKey;
  message: string;
  missingEnv?: string[];
  title: string;
  toggleEnv?: string;
};

export type PaymentProvider = "doku" | "midtrans";
export type AIProvider = "anthropic" | "openai";

const SERVICE_ROLE_ENV_KEYS = ["SUPABASE_SERVICE_ROLE_KEY"] as const;
const RESEND_ENV_KEYS = ["RESEND_API_KEY"] as const;

function createFeatureResult({
  disabledByFlag = false,
  enabled,
  key,
  message,
  missingEnv = [],
  title,
  toggleEnv,
}: FeatureResultInput) {
  return {
    disabledByFlag,
    enabled,
    key,
    message,
    missingEnv,
    title,
    toggleEnv,
  } satisfies FeatureAvailability;
}

function createSupabaseMissingFeature(
  key: FeatureKey,
  title: string,
  message: string,
  toggleEnv?: string,
) {
  return createFeatureResult({
    enabled: false,
    key,
    message,
    missingEnv: getMissingEnv(supabasePublicEnvKeys),
    title,
    toggleEnv,
  });
}

function getServiceRoleMissingEnv() {
  return getMissingEnv(SERVICE_ROLE_ENV_KEYS);
}

function resolveDisabledMessage(label: string) {
  return `${label} sedang tidak tersedia untuk app ini saat ini.`;
}

export function resolvePaymentProvider(
  value = process.env.PAYMENT_PROVIDER,
): PaymentProvider {
  return value?.trim().toLowerCase() === "midtrans" ? "midtrans" : "doku";
}

export function resolveAIProvider(
  value = process.env.AI_DEFAULT_PROVIDER,
): AIProvider {
  return value?.trim().toLowerCase() === "anthropic" ? "anthropic" : "openai";
}

function getPaymentEnvKeys(provider: PaymentProvider) {
  return provider === "midtrans"
    ? ["MIDTRANS_SERVER_KEY", "NEXT_PUBLIC_MIDTRANS_CLIENT_KEY"]
    : ["DOKU_CLIENT_ID", "DOKU_SECRET_KEY"];
}

export function getFeatureAvailability(feature: FeatureKey): FeatureAvailability {
  switch (feature) {
    case "auth": {
      if (!publicFeatureFlags.auth) {
        return createFeatureResult({
          disabledByFlag: true,
          enabled: false,
          key: "auth",
          message: resolveDisabledMessage("Auth"),
          title: "Auth dinonaktifkan",
          toggleEnv: featureToggleEnv.auth,
        });
      }

      if (!authFeatureEnabled) {
        return createSupabaseMissingFeature(
          "auth",
          "Auth belum aktif",
          getSupabaseConfigNoticeMessage(),
          featureToggleEnv.auth,
        );
      }

      return createFeatureResult({
        enabled: true,
        key: "auth",
        message: "Auth aktif.",
        title: "Auth aktif",
        toggleEnv: featureToggleEnv.auth,
      });
    }
    case "waitlist": {
      if (!publicFeatureFlags.waitlist) {
        return createFeatureResult({
          disabledByFlag: true,
          enabled: false,
          key: "waitlist",
          message: resolveDisabledMessage("Waitlist"),
          title: "Waitlist dinonaktifkan",
          toggleEnv: featureToggleEnv.waitlist,
        });
      }

      if (!hasSupabasePublicEnv) {
        return createSupabaseMissingFeature(
          "waitlist",
          "Waitlist belum aktif",
          "Waitlist belum tersedia untuk app ini saat ini.",
          featureToggleEnv.waitlist,
        );
      }

      return createFeatureResult({
        enabled: true,
        key: "waitlist",
        message: "Waitlist aktif.",
        title: "Waitlist aktif",
        toggleEnv: featureToggleEnv.waitlist,
      });
    }
    case "contact": {
      if (!publicFeatureFlags.contact) {
        return createFeatureResult({
          disabledByFlag: true,
          enabled: false,
          key: "contact",
          message: resolveDisabledMessage("Form kontak"),
          title: "Form kontak dinonaktifkan",
          toggleEnv: featureToggleEnv.contact,
        });
      }

      const missingEnv = getMissingEnv(RESEND_ENV_KEYS);
      if (missingEnv.length > 0) {
        return createFeatureResult({
          enabled: false,
          key: "contact",
          message: "Form kontak belum tersedia untuk app ini saat ini.",
          missingEnv,
          title: "Form kontak belum aktif",
          toggleEnv: featureToggleEnv.contact,
        });
      }

      return createFeatureResult({
        enabled: true,
        key: "contact",
        message: "Form kontak aktif.",
        title: "Form kontak aktif",
        toggleEnv: featureToggleEnv.contact,
      });
    }
    case "billing": {
      if (!publicFeatureFlags.payments) {
        return createFeatureResult({
          disabledByFlag: true,
          enabled: false,
          key: "billing",
          message: resolveDisabledMessage("Billing"),
          title: "Billing dinonaktifkan",
          toggleEnv: featureToggleEnv.payments,
        });
      }

      const missingEnv = [
        ...getMissingEnv(supabasePublicEnvKeys),
        ...getServiceRoleMissingEnv(),
      ];

      if (missingEnv.length > 0) {
        return createFeatureResult({
          enabled: false,
          key: "billing",
          message: "Billing belum tersedia untuk app ini saat ini.",
          missingEnv,
          title: "Billing belum aktif",
          toggleEnv: featureToggleEnv.payments,
        });
      }

      return createFeatureResult({
        enabled: true,
        key: "billing",
        message: "Billing aktif.",
        title: "Billing aktif",
        toggleEnv: featureToggleEnv.payments,
      });
    }
    case "payments": {
      if (!publicFeatureFlags.payments) {
        return createFeatureResult({
          disabledByFlag: true,
          enabled: false,
          key: "payments",
          message: resolveDisabledMessage("Pembayaran"),
          title: "Pembayaran dinonaktifkan",
          toggleEnv: featureToggleEnv.payments,
        });
      }

      const provider = resolvePaymentProvider();
      const missingEnv = [
        ...getMissingEnv(supabasePublicEnvKeys),
        ...getServiceRoleMissingEnv(),
        ...getMissingEnv(getPaymentEnvKeys(provider)),
      ];

      if (missingEnv.length > 0) {
        return createFeatureResult({
          enabled: false,
          key: "payments",
          message: `Checkout ${provider.toUpperCase()} belum tersedia untuk app ini saat ini.`,
          missingEnv,
          title: `Pembayaran ${provider.toUpperCase()} belum aktif`,
          toggleEnv: featureToggleEnv.payments,
        });
      }

      return createFeatureResult({
        enabled: true,
        key: "payments",
        message: `${provider.toUpperCase()} aktif.`,
        title: `Pembayaran ${provider.toUpperCase()} aktif`,
        toggleEnv: featureToggleEnv.payments,
      });
    }
    case "admin": {
      if (!publicFeatureFlags.admin) {
        return createFeatureResult({
          disabledByFlag: true,
          enabled: false,
          key: "admin",
          message: resolveDisabledMessage("Dashboard admin"),
          title: "Admin dinonaktifkan",
          toggleEnv: featureToggleEnv.admin,
        });
      }

      const missingEnv = [
        ...getMissingEnv(supabasePublicEnvKeys),
        ...getServiceRoleMissingEnv(),
      ];

      if (missingEnv.length > 0) {
        return createFeatureResult({
          enabled: false,
          key: "admin",
          message: "Dashboard admin belum tersedia untuk app ini saat ini.",
          missingEnv,
          title: "Admin belum aktif",
          toggleEnv: featureToggleEnv.admin,
        });
      }

      return createFeatureResult({
        enabled: true,
        key: "admin",
        message: "Admin aktif.",
        title: "Admin aktif",
        toggleEnv: featureToggleEnv.admin,
      });
    }
    case "profileWrites": {
      const missingEnv = getServiceRoleMissingEnv();

      if (missingEnv.length > 0) {
        return createFeatureResult({
          enabled: false,
          key: "profileWrites",
          message: "Edit profil belum tersedia untuk app ini saat ini.",
          missingEnv,
          title: "Edit profil belum aktif",
        });
      }

      return createFeatureResult({
        enabled: true,
        key: "profileWrites",
        message: "Edit profil aktif.",
        title: "Edit profil aktif",
      });
    }
    case "ai": {
      if (!publicFeatureFlags.ai) {
        return createFeatureResult({
          disabledByFlag: true,
          enabled: false,
          key: "ai",
          message: resolveDisabledMessage("AI"),
          title: "AI dinonaktifkan",
          toggleEnv: featureToggleEnv.ai,
        });
      }

      const provider = resolveAIProvider();
      const missingEnv = [
        ...getMissingEnv(supabasePublicEnvKeys),
        ...getMissingEnv(
          provider === "anthropic" ? ["ANTHROPIC_API_KEY"] : ["OPENAI_API_KEY"],
        ),
      ];

      if (missingEnv.length > 0) {
        return createFeatureResult({
          enabled: false,
          key: "ai",
          message: `Fitur AI (${provider}) belum tersedia untuk app ini saat ini.`,
          missingEnv,
          title: "AI belum aktif",
          toggleEnv: featureToggleEnv.ai,
        });
      }

      return createFeatureResult({
        enabled: true,
        key: "ai",
        message: `AI (${provider}) aktif.`,
        title: "AI aktif",
        toggleEnv: featureToggleEnv.ai,
      });
    }
  }
}

export function getFeatureAvailabilityMap(
  keys: readonly FeatureKey[] = [
    "auth",
    "waitlist",
    "contact",
    "billing",
    "payments",
    "admin",
    "ai",
  ],
) {
  return Object.fromEntries(
    keys.map((key) => [key, getFeatureAvailability(key)]),
  ) as Record<(typeof keys)[number], FeatureAvailability>;
}
