"use client";

import { VerifiedReportSkillsSection } from "@/components/verified-report/verified-report-skills-section";
import { VerifiedReportSummary } from "@/components/verified-report/verified-report-summary";
import { VerifiedReportLoadingState } from "@/components/verified-report/verified-report-loading-state";
import { getSkillBreakdownTabs } from "@/components/verified-report/verified-report-utils";
import { usePublicVerifiedProfile } from "@/hooks/api";

import { PublicProfileUnavailableState } from "./public-profile-unavailable-state";

type PublicVerifiedProfilePageProps = {
  shareToken: string;
};

export function PublicVerifiedProfilePage({
  shareToken,
}: PublicVerifiedProfilePageProps) {
  const { data, isPending, isError } = usePublicVerifiedProfile(shareToken);

  if (isPending) return <VerifiedReportLoadingState />;
  if (isError || !data) return <PublicProfileUnavailableState />;

  return (
    <div className="flex flex-col gap-y-5 py-4">
      <VerifiedReportSummary
        data={data}
        viewerMode="public"
        trackRecord={{
          averageRating: data.averageHireRating,
          ratingCount: data.hireRatingCount,
          wouldHireAgainRate: data.wouldHireAgainRate,
        }}
      />
      <VerifiedReportSkillsSection skills={getSkillBreakdownTabs(data)} />
    </div>
  );
}
