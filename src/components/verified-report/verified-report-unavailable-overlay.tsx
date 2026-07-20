import Link from "next/link";

import { Button } from "@/components/ui/button";

type VerifiedReportUnavailableOverlayProps = {
  message: string;
};

export function VerifiedReportUnavailableOverlay({
  message,
}: VerifiedReportUnavailableOverlayProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px] px-4">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_12px_32px_rgba(16,24,40,0.14)] space-y-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Verified profile unavailable
        </h2>
        <p className="text-sm text-[#344054]">{message}</p>
        <p className="text-xs text-muted-foreground">
          Complete your Job Readiness Evaluation and reach job-ready status to
          unlock your verified profile.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/t/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
