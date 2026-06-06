"use client";

import { Check, Plus, PlusCircle } from "lucide-react";

import { buildDiscoveryCandidateTags } from "@/constants/employer-talents";
import { useSaveCandidate } from "@/hooks/api/use-employer-discovery";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { EmployerDiscoveryCandidate } from "@/types/api/employer-discovery";
import type { TalentViewMode } from "@/types/employer-talents";

import { CandidateAvatar } from "../shared/candidate-avatar";
import { ScoreBadge } from "../shared/score-badge";

type TalentCardProps = {
  candidate: EmployerDiscoveryCandidate;
  view?: TalentViewMode;
};

export function TalentCard({ candidate, view = "list" }: TalentCardProps) {
  const { mutate: saveCandidate, isPending: isSaving } = useSaveCandidate();

  function handleAddToShortlist(event: React.MouseEvent) {
    event.preventDefault();
    if (candidate.isSaved || isSaving) return;

    saveCandidate(candidate.userId, {
      onSuccess: () => {
        appToast.success(`${candidate.fullName} added to shortlist.`);
      },
      onError: (error) => {
        appToast.error(authFailureMessage(error));
      },
    });
  }

  const tags = buildDiscoveryCandidateTags(candidate);
  const level = candidate.seniorityBadge || candidate.validatedLevel;
  const isGrid = view === "grid";

  return (
    <div className="box-border w-full max-w-199 rounded-2xl border border-[#DBDBDB] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <ScoreBadge
            value={candidate.score}
            className={cn(
              "shrink-0 font-bold",
              isGrid ? "size-14 text-lg" : "size-20 text-2xl",
            )}
          />

          <CandidateAvatar
            avatarUrl={candidate.avatarUrl}
            fullName={candidate.fullName}
            className={cn(
              "shrink-0 border-3 border-white",
              isGrid ? "size-14 text-base" : "size-20 text-xl",
            )}
          />

          <div className="flex min-w-0 flex-col gap-1 pl-0.5">
            <p
              className={cn(
                "truncate font-bold leading-normal text-[#151515]",
                isGrid ? "text-lg" : "text-2xl",
              )}
            >
              {candidate.fullName}
            </p>
            <div className="flex items-center gap-2 text-base font-light text-[#151515]">
              <span className="truncate">{candidate.role}</span>
              {level ? (
                <>
                  <span className="size-0.75 shrink-0 rounded-full bg-[#151515]" />
                  <span className="truncate">{level}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToShortlist}
          disabled={candidate.isSaved || isSaving}
          aria-label={candidate.isSaved ? "Shortlisted" : "Add to shortlist"}
          className={cn(
            "shrink-0 rounded-lg border-[0.5px] border-[#D9D9D9] bg-[#EBEBEB] text-[#151515] disabled:cursor-not-allowed disabled:opacity-60",
            isGrid
              ? "flex size-8 items-center justify-center"
              : "flex items-center gap-1 px-2 py-1.5 text-xs font-normal",
          )}
        >
          {isGrid ? (
            candidate.isSaved ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <Plus className="size-4" aria-hidden />
            )
          ) : (
            <>
              {candidate.isSaved ? "Shortlisted" : "Add to Shortlist"}
              <PlusCircle className="size-4" aria-hidden />
            </>
          )}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="box-border rounded-xl border-[0.5px] border-[#D9D9D9] bg-white px-6 py-2 text-base font-normal text-[#151515]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
