import { getFeatureAvailability } from "@/lib/config/features";
import { createMetadata } from "@/lib/seo";
import { WaitlistPageClient } from "./waitlist-page";

export const metadata = createMetadata({
  title: "Waitlist — KilatKoding",
  description:
    "Daftar waitlist KilatKoding untuk mendapatkan early access dan diskon launch pertama.",
  path: "/waitlist",
});

export default function WaitlistPage() {
  const waitlistFeature = getFeatureAvailability("waitlist");

  return (
    <WaitlistPageClient
      notice={
        waitlistFeature.enabled
          ? null
          : {
              description: waitlistFeature.message,
              missingEnv: waitlistFeature.missingEnv,
              title: waitlistFeature.title,
              toggleEnv: waitlistFeature.toggleEnv,
            }
      }
    />
  );
}
