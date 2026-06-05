import { Check } from "lucide-react";
import type { Metadata } from "next";
import { VerifiedReportSummary } from "@/components/verified-report/verified-report-summary";
import { VerifiedReportSkillsSection } from "@/components/verified-report/verified-report-skills-section";
import { EmployerTalentProfileHeader } from "@/components/dashboard/employer/employer-talent-profile-header";
import { getSkillBreakdownTabs } from "@/components/verified-report/verified-report-utils";
import { EMPLOYER_TALENT_PROFILE } from "@/constants/employer-talents";
import { cn } from "@/lib/utils"; // Uses your project's cn utility helper

export const metadata: Metadata = {
  title: "Talent Profile",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployerTalentProfilePage({ params }: PageProps) {
  await params;
  const talentData = EMPLOYER_TALENT_PROFILE;

  return (
    <div className="flex flex-col gap-y-6 my-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <EmployerTalentProfileHeader />

      <div className="relative [&_img]:relative [&_picture]:relative [&_img]:z-10">
        <VerifiedReportSummary data={talentData} />

        {talentData.verified && (
          <div
            className={cn(
              "absolute z-20 flex size-8 items-center justify-center rounded-full text-white font-bold text-sm select-none shadow-sm",
              "bg-[#34A853] border-4 border-[#FAFAFA]",
              "top-7 left-27 sm:top-29 sm:left-29",
            )}
          >
            <Check className="size-4" strokeWidth={3} aria-hidden="true" />
          </div>
        )}
      </div>

      <section className="flex flex-col gap-y-5">
        <VerifiedReportSkillsSection
          skills={getSkillBreakdownTabs(talentData)}
        />
      </section>
    </div>
  );
}
