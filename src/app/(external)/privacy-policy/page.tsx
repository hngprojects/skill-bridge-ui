import { privacySections, tableOfContents } from "@/constants/privacy-policy";

import { PrivacyHero } from "./_components/privacy-hero";
import { PrivacyToc } from "./_components/privacy-toc";
import { PrivacySection } from "./_components/privacy-section";

export default function PrivacyPage() {
  return (
    <main data-privacy-policy className="relative bg-[#FAFAFA]">
      <PrivacyHero />

      <section
        className="
          relative z-10
          mx-auto
          flex
          max-w-360
          flex-col
          gap-10
          px-4
          py-10
          lg:flex-row
          lg:items-start
          lg:gap-20
          lg:px-30
        "
      >
        {/* TOC */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <PrivacyToc items={tableOfContents} />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-10 md:gap-16">
          {privacySections.map((section) => (
            <PrivacySection
              key={section.id}
              id={section.id}
              title={section.title}
              description={section.description}
              items={section.items}
            />
          ))}
          <p className="text-[#64748B]">
            If you have any questions about our privacy policy, contact us at{" "}
            <a
              className="font-bold text-[#030409]"
              href="mailto:Privacy@Skillbridge.com"
            >
              Privacy@Skillbridge.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
