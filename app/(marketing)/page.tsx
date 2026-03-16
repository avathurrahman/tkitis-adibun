import { HeroSection } from "@/components/sections/hero";
import { PainPointsSection } from "@/components/sections/pain-points";
import { FeaturesSection } from "@/components/sections/features";
import { TechStackSection } from "@/components/sections/tech-stack";
import { AiOptimizedSection } from "@/components/sections/ai-optimized";
import { TimelineSection } from "@/components/sections/timeline";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { faqs, FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { siteConfig } from "@/config/site";
import { absoluteUrl, createMetadata, toJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Bikin SaaS dalam hitungan hari, bukan bulan. — KilatKoding",
  description:
    "Boilerplate Next.js untuk developer Indonesia dengan Midtrans, Doku, Supabase, Resend, blog MDX, AI, dan dashboard yang siap pakai.",
  path: "/",
});

const homepageStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/opengraph-image.png"),
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteConfig.name,
    description: siteConfig.description,
    category: "Next.js SaaS boilerplate",
    image: absoluteUrl("/opengraph-image.png"),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(homepageStructuredData) }}
      />
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
