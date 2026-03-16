import { createMetadata } from "@/lib/seo";
import { VerifyEmailClient } from "./verify-email-client";

export const metadata = createMetadata({
  title: "Verifikasi Email — KilatKoding",
  description: "Periksa inbox kamu untuk menyelesaikan verifikasi akun KilatKoding.",
  path: "/auth/verify-email",
  noIndex: true,
});

export default function VerifyEmailPage() {
  return <VerifyEmailClient />;
}
