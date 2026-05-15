import { HeroSection } from "@/components/how-it-works/how-it-works-hero";

import { ProcessSection } from "@/components/how-it-works/process";
import { ReadyForHireSection } from "@/components/sections/ready-to-hire";

export default function HowItWorks() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <ProcessSection />
        <ReadyForHireSection />
      </main>
    </div>
  );
}
