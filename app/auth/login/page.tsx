import { LoginForm } from "@/components/login-form";
import { getSupabasePublicConfig } from "@/lib/config/public-features";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Login — KilatKoding",
  description: "Masuk ke akun KilatKoding kamu.",
  path: "/auth/login",
  noIndex: true,
});

export default function Page() {
  const supabaseConfig = getSupabasePublicConfig();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm supabaseConfig={supabaseConfig} />
      </div>
    </div>
  );
}
