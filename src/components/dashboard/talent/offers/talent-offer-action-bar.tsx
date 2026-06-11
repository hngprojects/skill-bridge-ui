"use client";

import { Button } from "@/components/ui/button";
import { formatAbsoluteDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import type { TalentOffer } from "@/types/api/talent-offers";

type TalentOfferActionBarProps = {
  offer: TalentOffer;
  isSubmitting: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onTakeAssessment: () => void;
};

function TerminalBanner({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "positive" | "negative";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm font-medium",
        tone === "positive" && "border-[#D1FAE5] bg-[#ECFDF5] text-[#065F46]",
        tone === "negative" && "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]",
        tone === "neutral" && "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
      )}
    >
      {children}
    </div>
  );
}

export function TalentOfferActionBar({
  offer,
  isSubmitting,
  onAccept,
  onDecline,
  onTakeAssessment,
}: TalentOfferActionBarProps) {
  const respondedDate = offer.respondedAt
    ? formatAbsoluteDate(offer.respondedAt)
    : "";
  const expiresDate = formatAbsoluteDate(offer.expiresAt);

  switch (offer.status) {
    case "pending":
      return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onDecline}
            disabled={isSubmitting}
            className="h-10 rounded-lg border-[#B42318] text-[#B42318] hover:bg-[#FEF2F2]"
          >
            Decline offer
          </Button>
          <Button
            type="button"
            onClick={onAccept}
            disabled={isSubmitting}
            className="h-10 rounded-lg"
          >
            Accept offer
          </Button>
        </div>
      );
    case "assessment_unlocked":
      return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TerminalBanner tone="positive">
            You accepted this offer. Take the assessment to move forward.
          </TerminalBanner>
          <Button
            type="button"
            onClick={onTakeAssessment}
            className="h-10 rounded-lg"
          >
            Take assessment
          </Button>
        </div>
      );
    case "assessment_completed":
      return (
        <TerminalBanner tone="positive">
          Assessment submitted. Waiting on the employer to review.
        </TerminalBanner>
      );
    case "passed":
      return (
        <TerminalBanner tone="positive">
          You passed the assessment. The employer will be in touch.
        </TerminalBanner>
      );
    case "accepted":
      return (
        <TerminalBanner tone="positive">
          You accepted this offer{respondedDate ? ` on ${respondedDate}` : ""}.
        </TerminalBanner>
      );
    case "hired":
      return (
        <TerminalBanner tone="positive">
          You&apos;ve been hired for this role — congratulations.
        </TerminalBanner>
      );
    case "declined":
      return (
        <TerminalBanner tone="negative">
          You declined this offer{respondedDate ? ` on ${respondedDate}` : ""}.
        </TerminalBanner>
      );
    case "failed":
      return (
        <TerminalBanner tone="negative">
          Assessment didn&apos;t pass for this offer.
        </TerminalBanner>
      );
    case "expired":
      return (
        <TerminalBanner>
          This offer expired{expiresDate ? ` on ${expiresDate}` : ""}.
        </TerminalBanner>
      );
    case "withdrawn":
      return <TerminalBanner>The employer withdrew this offer.</TerminalBanner>;
    default:
      return <TerminalBanner>Status: {offer.status}</TerminalBanner>;
  }
}
