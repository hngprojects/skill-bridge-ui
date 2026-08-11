"use client";

import { useTalentTrackRecord } from "@/hooks/api";
import { useVerifiedProfile } from "@/hooks/api/use-verified-profile";
import { ApiError } from "@/lib/api";

import { VerifiedReportContent } from "./verified-report-content";
import { VerifiedReportErrorState } from "./verified-report-error-state";
import { VerifiedReportLoadingState } from "./verified-report-loading-state";
import { VerifiedReportUnavailableState } from "./verified-report-unavailable-state";

const VerifiedReportPage = () => {
  const { data, isPending, isError, error } = useVerifiedProfile();
  const { data: trackRecord } = useTalentTrackRecord();

  if (isPending) {
    return <VerifiedReportLoadingState />;
  }

  const notFoundError =
    error instanceof ApiError && error.status === 404 ? error : null;

  if (notFoundError) {
    return <VerifiedReportUnavailableState message={notFoundError.message} />;
  }
  if (isError || !data) return <VerifiedReportErrorState />;

  return (
    <div className="flex flex-col gap-y-6 my-8.5">
      <VerifiedReportContent
        data={data}
        viewerMode="owner"
        trackRecord={
          trackRecord
            ? {
                averageRating: trackRecord.averageRating,
                ratingCount: trackRecord.ratingCount,
                wouldHireAgainRate: trackRecord.wouldHireAgainRate,
              }
            : null
        }
      />
    </div>
  );
};

export default VerifiedReportPage;
