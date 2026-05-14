import { CTAAndLogos } from "@/components/landing-page/cta";
import { FAQSection } from "@/components/landing-page/faq";
import { FeaturesSection } from "@/components/landing-page/features";
import { HeroSection } from "@/components/landing-page/hero";
import { HiringGrid } from "@/components/landing-page/hiring";
import { HowItWorks } from "@/components/landing-page/how-it-works";
import { ReadyForHireSection } from "@/components/landing-page/ready-to-hire";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <HiringGrid />
      <CTAAndLogos />
      <FAQSection />
      <ReadyForHireSection />
    </main>
  );
}
