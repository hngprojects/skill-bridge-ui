import { resourceSections } from "@/constants/resources";
import ResourcesSection from "@/components/resources/resources-section";
import { AiReportSkillBreakdown } from "@/components/dashboard/emerging-user/ai-report-skill-breakdown";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:"AI Report",
};

const AiReport = () => {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-5xl flex-col space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col">
          <h1 className="text-[28px] font-bold tracking-[-0.03em] text-foreground sm:text-[34px] lg:text-[40px]">
            AI Report
          </h1>

          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-muted-foreground sm:text-[15px] sm:leading-7 lg:text-[16px]">
            AI-powered insights to help you understand your strengths and
            areas to improve
          </p>
        </div>

        {/* AI Report Skill Breakdown */}
        <AiReportSkillBreakdown />

        {/* Recommended Resources */}
        <section className="flex flex-col">
          <div className="mb-5">
            <h2 className="text-[22px] font-bold tracking-tight text-foreground sm:text-[24px] lg:text-[28px]">
              Recommended Resources
            </h2>
          </div>

          <div className="flex flex-col gap-y-8">
            {resourceSections.map((section) => (
              <ResourcesSection key={section.id} {...section} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AiReport;