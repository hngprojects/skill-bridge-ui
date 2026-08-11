import { TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { EmployerAssessmentsStats } from "@/types/api/employer-assessments";

type StatCardDef = {
  key: string;
  label: string;
  value: number | null;
  deltaPct: number | null;
  description: string;
};

type AssessmentStatCardsProps = {
  /** Always real — comes straight from the paginated list response's
   *  `total`, so this card never has to wait on the stats endpoint. */
  totalAssessments: number;
  /** Everything else (active/completed/candidate counts, trend deltas)
   *  needs a true cross-page aggregate that a single list page can't
   *  honestly provide — `null` while the stats endpoint isn't available,
   *  never a guessed number. */
  stats: EmployerAssessmentsStats | null | undefined;
  isStatsLoading: boolean;
};

function TrendPill({ deltaPct }: { deltaPct: number }) {
  const isUp = deltaPct >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
        isUp ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FEE2E2] text-[#991B1B]",
      )}
    >
      {Math.abs(Math.round(deltaPct))}%
      <TrendingUp className={cn("size-3", !isUp && "rotate-180")} aria-hidden />
    </span>
  );
}

function StatCard({ label, value, deltaPct, description }: StatCardDef) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-[#D9D9D9] bg-white p-4">
      <p className="text-sm text-[#757575]">{label}</p>
      <div className="flex items-center gap-2">
        {value == null ? (
          <span className="h-8 w-12 animate-pulse rounded bg-[#EBEBEB]" />
        ) : (
          <span className="text-[32px] leading-tight font-semibold text-[#151515]">
            {value.toLocaleString()}
          </span>
        )}
        {deltaPct != null ? <TrendPill deltaPct={deltaPct} /> : null}
      </div>
      <p className="text-sm text-[#757575]">{description}</p>
    </div>
  );
}

export function AssessmentStatCards({
  totalAssessments,
  stats,
  isStatsLoading,
}: AssessmentStatCardsProps) {
  const pending = isStatsLoading && !stats;

  const cards: StatCardDef[] = [
    {
      key: "total",
      label: "Total assessments",
      value: totalAssessments,
      deltaPct: stats?.totalAssessmentsDeltaPct ?? null,
      description: "From last 30 days",
    },
    {
      key: "active",
      label: "Active",
      value: pending ? null : (stats?.active ?? 0),
      deltaPct: stats?.activeDeltaPct ?? null,
      description: "Currently running",
    },
    {
      key: "completed",
      label: "Completed",
      value: pending ? null : (stats?.completed ?? 0),
      deltaPct: stats?.completedDeltaPct ?? null,
      description: "From last 30 days",
    },
    {
      key: "candidates",
      label: "Total candidates",
      value: pending ? null : (stats?.totalCandidates ?? 0),
      deltaPct: stats?.totalCandidatesDeltaPct ?? null,
      description: "across all assessments",
    },
  ];

  return (
    <div className="rounded-2xl bg-[#F2F2F2] p-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>
    </div>
  );
}
