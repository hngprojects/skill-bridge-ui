"use client";

import { PlusCircle } from "lucide-react";

import { buildDiscoveryCandidateTags } from "@/constants/employer-talents";
import { useSaveCandidate } from "@/hooks/api/use-employer-discovery";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type { EmployerDiscoveryCandidate } from "@/types/api/employer-discovery";

import { CandidateAvatar } from "../shared/candidate-avatar";
import { ScoreBadge } from "../shared/score-badge";

type TalentCardProps = {
  candidate: EmployerDiscoveryCandidate;
};

export function TalentCard({ candidate }: TalentCardProps) {
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

  return (
    <div className="relative box-border w-full max-w-199 rounded-2xl border border-[#DBDBDB] bg-white p-4">
      <button
        type="button"
        onClick={handleAddToShortlist}
        disabled={candidate.isSaved || isSaving}
        className="absolute right-4 top-4 flex items-center gap-1 rounded-lg border-[0.5px] border-[#D9D9D9] bg-[#EBEBEB] px-2 py-1.5 text-xs font-normal text-[#151515] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {candidate.isSaved ? "Shortlisted" : "Add to Shortlist"}
        <PlusCircle className="size-4 text-[#151515]" />
      </button>

      <div className="flex items-center gap-4">
        <ScoreBadge
          value={candidate.score}
          className="size-20 shrink-0 text-2xl font-bold"
        />

        <CandidateAvatar
          avatarUrl={candidate.avatarUrl}
          fullName={candidate.fullName}
          className="size-20 shrink-0 border-3 border-white text-xl"
        />

        <div className="flex flex-col gap-1 pl-0.5">
          <p className="text-2xl font-bold leading-normal text-[#151515]">
            {candidate.fullName}
          </p>
          <div className="flex items-center gap-2 text-base font-light text-[#151515]">
            <span>{candidate.role}</span>
            {level ? (
              <>
                <span className="size-0.75 rounded-full bg-[#151515]" />
                <span>{level}</span>
              </>
            ) : null}
          </div>
        </div>
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
