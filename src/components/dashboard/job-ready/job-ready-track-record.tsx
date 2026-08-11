import { Star } from "lucide-react";

import { useTalentTrackRecord } from "@/hooks/api";

/** The talent's own view of employer hire-outcome feedback. Unlike the
 *  employer-facing badge (`HireTrackRecordBadge`, gated at 3+ ratings to
 *  protect against one review swinging a public signal), this is a private
 *  view — it's useful to the talent from their very first rating, so it
 *  only waits on there being at least one. */
export function JobReadyTrackRecord() {
  const { data, isLoading } = useTalentTrackRecord();

  if (isLoading || !data || data.ratingCount === 0) return null;

  const wouldHireAgainLabel =
    data.wouldHireAgainRate != null
      ? `${Math.round(data.wouldHireAgainRate * 100)}% of employers would hire you again`
      : null;

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-border bg-[#FAFAFA] p-6">
      <h2 className="text-[18px] font-bold tracking-tight">
        Your track record
      </h2>
      <div className="flex items-center gap-2">
        <Star className="size-5 fill-[#F9E796] text-[#7A5C00]" aria-hidden />
        <span className="text-2xl font-bold text-gray-900">
          {data.averageRating?.toFixed(1) ?? "—"}
        </span>
        <span className="text-sm text-[#757575]">
          from {data.ratingCount}{" "}
          {data.ratingCount === 1 ? "employer rating" : "employer ratings"}
        </span>
      </div>
      {wouldHireAgainLabel ? (
        <p className="text-sm text-[#4B5563]">{wouldHireAgainLabel}</p>
      ) : null}
    </section>
  );
}
