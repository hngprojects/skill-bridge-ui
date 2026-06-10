"use client";

import { Box, LogOut } from "lucide-react";
import Link from "next/link";

type CreateAssessmentHeaderProps = {
  title: string;
  subtitle?: string;
};

export function CreateAssessmentHeader({
  title,
  subtitle,
}: CreateAssessmentHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#667085]">
          <Box className="size-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-sans text-base font-semibold text-[#101828]">
            {title}
          </p>
          {subtitle ? (
            <p className="truncate font-sans text-sm text-[#667085]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <Link
        href="/e/assessments"
        className="inline-flex shrink-0 items-center gap-2 font-sans text-sm font-medium text-[#667085] transition-colors hover:text-[#101828]"
      >
        Save and Exit
        <LogOut className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
