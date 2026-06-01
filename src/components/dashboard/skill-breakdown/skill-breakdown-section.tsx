"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { SkillBreakdownSectionProps } from "@/types/skill-breakdown";

import { SkillBreakdownChart } from "./skill-breakdown-chart";

function formatAttemptDate(iso: string | undefined): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function SkillBreakdownSection({
  tier,
  activePercentage,
  completedAt,
}: SkillBreakdownSectionProps = {}) {
  const lastAttempt = formatAttemptDate(completedAt);

  return (
    <section
      aria-labelledby="skill-breakdown-heading"
      className="flex flex-col rounded-2xl border border-border bg-[#FAFAFA] p-6"
    >
      <div className="mb-1 flex items-center justify-between">
        <h2
          id="skill-breakdown-heading"
          className="text-[18px] font-bold tracking-tight text-foreground"
        >
          Skill breakdown
        </h2>
        <Link
          href="/t/dashboard/ai-report"
          className="label group flex shrink-0 items-center text-foreground underline underline-offset-2 hover:opacity-70"
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      {lastAttempt ? (
        <p className="mb-6 text-[13px] text-muted-foreground">
          Last attempt • {lastAttempt}
        </p>
      ) : null}
      <SkillBreakdownChart tier={tier} percentage={activePercentage} />
    </section>
  );
}
