import { Star } from "lucide-react";

import { isTrackRecordDisplayable } from "@/lib/track-record";
import { cn } from "@/lib/utils";

type VerifiedProfileTrackRecordProps = {
  averageRating: number | null | undefined;
  ratingCount: number | null | undefined;
  wouldHireAgainRate: number | null | undefined;
  className?: string;
};

/** Rolled-up "employers who hired this talent rated the outcome" signal.
 *  Shared across the employer discovery card, the employer's candidate
 *  profile, and the verified-profile summary (owner + public views).
 *  Renders nothing below the display threshold — see `lib/track-record.ts`
 *  for why. */
export function VerifiedProfileTrackRecord({
  averageRating,
  ratingCount,
  wouldHireAgainRate,
  className,
}: VerifiedProfileTrackRecordProps) {
  if (!isTrackRecordDisplayable(ratingCount) || averageRating == null) {
    return null;
  }

  const wouldHireAgainLabel =
    wouldHireAgainRate != null
      ? ` · ${Math.round(wouldHireAgainRate * 100)}% would hire again`
      : "";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[#D9D9D9] bg-white px-2.5 py-1 text-xs font-medium text-[#151515]",
        className,
      )}
      title={`Rated by ${ratingCount} past ${ratingCount === 1 ? "hire" : "hires"}`}
    >
      <Star className="size-3.5 fill-[#F9E796] text-[#7A5C00]" aria-hidden />
      {averageRating.toFixed(1)}
      {wouldHireAgainLabel}
      <span className="text-[#757575]">({ratingCount})</span>
    </span>
  );
}
