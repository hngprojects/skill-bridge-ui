"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";

import { CandidateAvatar } from "../../shared/candidate-avatar";

type EditRoleCandidateSummaryProps = {
  fullName: string | undefined;
  role: string | undefined;
  seniorityBadge: string | undefined;
  avatarUrl: string | null;
  isLoading: boolean;
  /** Where the "Save and Exit" link routes back to (typically the
   *  send-offer review page for this candidate + role). */
  exitHref: string;
};

export function EditRoleCandidateSummary({
  fullName,
  role,
  seniorityBadge,
  avatarUrl,
  isLoading,
  exitHref,
}: EditRoleCandidateSummaryProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#ebebeb] pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3.5">
        <CandidateAvatar
          avatarUrl={avatarUrl}
          fullName={fullName ?? ""}
          className="size-14 text-base"
        />
        <div className="flex flex-col gap-1">
          <p className="font-bold text-[#151515]">
            {isLoading ? "Loading…" : fullName}
          </p>
          <div className="flex items-center gap-2 text-sm font-light tracking-[0.017em] text-[#151515]">
            <span>{role}</span>
            {seniorityBadge ? (
              <>
                <span className="size-0.75 shrink-0 rounded-full bg-[#151515]" />
                <span>{seniorityBadge}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <Link
        href={exitHref}
        className="flex items-center gap-2 text-base font-medium tracking-[0.017em] text-[#151515]"
      >
        Save and Exit
        <LogOut className="size-5" aria-hidden />
      </Link>
    </div>
  );
}
