"use client";

import { PlusCircle } from "lucide-react";

import { CandidateAvatar } from "../shared/candidate-avatar";
import { ScoreBadge } from "../shared/score-badge";
import type { Talent } from "@/types/employer-talents";

type TalentCardProps = Talent;

export function TalentCard({
  name,
  role,
  level,
  avatar,
  score,
  tags,
}: TalentCardProps) {
  return (
    <div className="relative box-border w-full max-w-199 rounded-2xl border border-[#DBDBDB] bg-white p-4">
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute right-4 top-4 flex items-center gap-1 rounded-lg border-[0.5px] border-[#D9D9D9] bg-[#EBEBEB] px-2 py-1.5 text-xs font-normal text-[#151515]"
      >
        Add to Shortlist
        <PlusCircle className="size-4 text-[#151515]" />
      </button>

      <div className="flex items-center gap-4">
        <ScoreBadge
          value={score}
          className="size-20 shrink-0 text-2xl font-bold"
        />

        <CandidateAvatar
          avatarUrl={avatar || null}
          fullName={name}
          className="size-20 shrink-0 border-3 border-white text-xl"
        />

        <div className="flex flex-col gap-1 pl-0.5">
          <p className="text-2xl font-bold leading-normal text-[#151515]">
            {name}
          </p>
          <div className="flex items-center gap-2 text-base font-light text-[#151515]">
            <span>{role}</span>
            <span className="size-0.75 rounded-full bg-[#151515]" />
            <span>{level}</span>
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
