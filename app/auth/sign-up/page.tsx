import { SignUpForm } from "@/components/sign-up-form";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Daftar — KilatKoding",
  description: "Buat akun KilatKoding untuk mulai mencoba boilerplate.",
  path: "/auth/sign-up",
  noIndex: true,
});

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
