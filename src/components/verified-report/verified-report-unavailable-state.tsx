import { verifiedProfilePlaceholder } from "@/constants/verified-report";

import { VerifiedReportContent } from "./verified-report-content";
import { VerifiedReportUnavailableOverlay } from "./verified-report-unavailable-overlay";

type VerifiedReportUnavailableStateProps = {
  message: string;
};

export function VerifiedReportUnavailableState({
  message,
}: VerifiedReportUnavailableStateProps) {
  return (
    <div className="relative h-[calc(100dvh-4rem)] overflow-hidden lg:h-[calc(100dvh-4.5rem)]">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none blur-sm opacity-70"
        aria-hidden
      >
        <div className="flex h-full min-h-0 flex-col gap-y-4 overflow-hidden px-0 pt-1">
          <VerifiedReportContent data={verifiedProfilePlaceholder} preview />
        </div>
      </div>
      <VerifiedReportUnavailableOverlay message={message} />
    </div>
  );
}
