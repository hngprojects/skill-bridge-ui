import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { privacySections, tableOfContents } from "@/constants/privacy-policy";
import { CookieBanner } from "@/components/custom/cookie-banner";

import { PrivacyHero } from "./_components/privacy-hero";
import { PrivacySection } from "./_components/privacy-section";
import { PrivacyToc } from "./_components/privacy-toc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Your privacy is important to us. This policy explains how we collect, use and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <Navbar />

      <PrivacyHero />

      <PrivacyToc items={tableOfContents} />

      <main className="mx-auto w-full max-w-4xl space-y-16 px-6 py-12">
        {privacySections.map((section) => (
          <PrivacySection
            key={section.id}
            id={section.id}
            title={section.title}
            description={section.description}
            items={section.items}
          />
        ))}
      </main>
      <CookieBanner />
      <Footer />
    </div>
  );
}
