import { HeroSection } from "@/components/sections/hero";
import { PainPointsSection } from "@/components/sections/pain-points";
import { FeaturesSection } from "@/components/sections/features";
import { TechStackSection } from "@/components/sections/tech-stack";
import { AiOptimizedSection } from "@/components/sections/ai-optimized";
import { TimelineSection } from "@/components/sections/timeline";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <FeaturesSection />
      <TechStackSection />
      <AiOptimizedSection />
      <TimelineSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
