import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { getSupabasePublicConfig } from "@/lib/config/public-features";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Lupa Password — KilatKoding",
  description: "Minta link untuk mengatur ulang password akun KilatKoding kamu.",
  path: "/auth/forgot-password",
  noIndex: true,
});

export default function Page() {
  const supabaseConfig = getSupabasePublicConfig();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm supabaseConfig={supabaseConfig} />
      </div>
    </div>
  );
}
