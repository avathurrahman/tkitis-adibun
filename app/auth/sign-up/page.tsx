import { SignUpForm } from "@/components/sign-up-form";
import { getSupabasePublicConfig } from "@/lib/config/public-features";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Daftar — KilatKoding",
  description: "Buat akun KilatKoding untuk mulai mencoba boilerplate.",
  path: "/auth/sign-up",
  noIndex: true,
});

export default function Page() {
  const supabaseConfig = getSupabasePublicConfig();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm supabaseConfig={supabaseConfig} />
      </div>
    </div>
  );
}
