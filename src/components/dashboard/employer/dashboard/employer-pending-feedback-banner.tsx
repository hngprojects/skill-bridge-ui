"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { usePendingHireFeedback } from "@/hooks/api";

/** Prompts the employer to rate hires the backend has decided feedback is
 *  due for (see `HireFeedbackRequest`). Renders nothing while loading,
 *  erroring, or when there's nothing pending — this is a nudge, not a
 *  blocking state. */
export function EmployerPendingFeedbackBanner() {
  const { data, isLoading, isError } = usePendingHireFeedback();
  const pendingCount = data?.requests.length ?? 0;

  if (isLoading || isError || pendingCount === 0) return null;

  const label =
    pendingCount === 1
      ? "You have 1 hire waiting for feedback"
      : `You have ${pendingCount} hires waiting for feedback`;

  return (
    <Link
      href="/e/shortlist?tab=offers"
      className="flex items-center justify-between gap-4 rounded-2xl border border-[#F9E796] bg-[#FFFBEB] px-6 py-4 transition-colors hover:bg-[#FFF7D6]"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F9E796]">
          <Star className="size-5 text-[#7A5C00]" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#151515]">{label}</p>
          <p className="text-xs text-[#757575]">
            A quick rating helps other employers trust the score, and helps your
            hire build their track record.
          </p>
        </div>
      </div>
      <ArrowRight className="size-4 shrink-0 text-[#151515]" aria-hidden />
    </Link>
  );
}
