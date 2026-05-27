import type { VerifiedProfileResponseData } from "@/types/api";

import { VerifiedReportHeader } from "./verified-report-header";
import { VerifiedReportSkillsSection } from "./verified-report-skills-section";
import { VerifiedReportSummary } from "./verified-report-summary";

type VerifiedReportContentProps = {
  data: VerifiedProfileResponseData;
  preview?: boolean;
};

export function VerifiedReportContent({
  data,
  preview = false,
}: VerifiedReportContentProps) {
  return (
    <>
      <VerifiedReportHeader downloadDisabled={preview} />
      <section className="flex flex-col gap-y-5">
        <VerifiedReportSummary data={data} />
        <VerifiedReportSkillsSection skills={data.detailed_skills} />
      </section>
    </>
  );
}
