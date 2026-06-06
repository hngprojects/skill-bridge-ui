"use client";

import { Check } from "lucide-react";

import { VerifiedReportSkillsSection } from "@/components/verified-report/verified-report-skills-section";
import { VerifiedReportSummary } from "@/components/verified-report/verified-report-summary";
import { VerifiedReportErrorState } from "@/components/verified-report/verified-report-error-state";
import { VerifiedReportLoadingState } from "@/components/verified-report/verified-report-loading-state";
import { getSkillBreakdownTabs } from "@/components/verified-report/verified-report-utils";
import { useDiscoveryCandidateProfile } from "@/hooks/api/use-employer-discovery";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

import { EmployerTalentProfileHeader } from "../employer-talent-profile-header";

type EmployerTalentProfilePageProps = {
  userId: string;
};

export function EmployerTalentProfilePage({
  userId,
}: EmployerTalentProfilePageProps) {
  const { data, isPending, isError, error } =
    useDiscoveryCandidateProfile(userId);

  if (isPending) {
    return <VerifiedReportLoadingState />;
  }

  const notFoundError =
    error instanceof ApiError && error.status === 404 ? error : null;

  if (notFoundError) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-y-6 px-4 py-8 md:px-8">
        <EmployerTalentProfileHeader userId={userId} isSaved={false} />
        <div className="rounded-xl border border-[#E4E7EC] bg-white px-6 py-12 text-center">
          <p className="text-base font-medium text-[#151515]">
            Candidate not found
          </p>
          <p className="mt-2 text-sm text-[#757575]">{notFoundError.message}</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <VerifiedReportErrorState />;
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8 md:px-8">
      <EmployerTalentProfileHeader
        userId={data.userId}
        isSaved={data.isSaved}
      />
      <div className="relative">
        <VerifiedReportSummary data={data} />
        {data.verified ? (
          <div
            className={cn(
              "absolute z-20 flex size-8 items-center justify-center rounded-full text-sm font-bold text-white select-none shadow-sm",
              "border-4 border-[#FAFAFA] bg-[#34A853]",
              "top-7 left-27 sm:top-29 sm:left-29",
            )}
          >
            <Check className="size-4" strokeWidth={3} aria-hidden="true" />
          </div>
        ) : null}
      </div>
      <section className="flex flex-col gap-y-5">
        <VerifiedReportSkillsSection skills={getSkillBreakdownTabs(data)} />
      </section>
    </div>
  );
}
