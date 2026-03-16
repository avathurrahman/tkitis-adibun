import { createMetadata } from "@/lib/seo";
import { WaitlistPageClient } from "./waitlist-page";

export const metadata = createMetadata({
  title: "Waitlist — KilatKoding",
  description:
    "Daftar waitlist KilatKoding untuk mendapatkan early access dan diskon launch pertama.",
  path: "/waitlist",
});

export default function WaitlistPage() {
  return <WaitlistPageClient />;
}
