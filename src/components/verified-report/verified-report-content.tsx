import type { VerifiedProfileResponseData } from "@/types/api";

import { getSkillBreakdownTabs } from "./verified-report-utils";
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
        <VerifiedReportSkillsSection skills={getSkillBreakdownTabs(data)} />
      </section>
    </>
  );
}
