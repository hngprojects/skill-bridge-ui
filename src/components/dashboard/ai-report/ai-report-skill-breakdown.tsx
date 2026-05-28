"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { InsightSection, SkillList, ZoneGroup } from "./summaries";

import { CHART_ZONES } from "@/constants/ai-report-skill-breakdown";
import { aiReportQueryOptions } from "@/hooks/api/use-ai-report";

// ─── Main Component ───────────────────────────────────────────────────────────

export function AiReportSkillBreakdown() {
  const { data: report } = useSuspenseQuery(aiReportQueryOptions());

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      aria-labelledby="skill-breakdown-heading"
      className="flex flex-col gap-4 rounded-2xl border border-border bg-[#FAFAFA] p-4 sm:gap-5 sm:p-5 lg:p-6"
    >
      {/* Header */}
      <div>
        <div className="mb-1 flex items-center justify-between gap-3">
          <h2
            id="skill-breakdown-heading"
            className="text-[16px] font-bold tracking-tight text-foreground sm:text-[18px]"
          >
            Skill breakdown
          </h2>

          <div className="flex shrink-0 items-center rounded-xl bg-gray-200 px-2.5 py-1 text-[12px] font-medium text-foreground transition-opacity hover:opacity-70 sm:px-3 sm:text-sm">
            Top {report.percentile}%
          </div>
        </div>

        <p className="text-[12px] text-muted-foreground sm:text-[13px]">
          Last attempt • {today}
        </p>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-2 overflow-x-auto pt-10 sm:gap-4 sm:pt-14 lg:pt-18">
        {CHART_ZONES.map((zone) => (
          <ZoneGroup key={zone.id} zone={zone} />
        ))}
      </div>

      {/* AI Summary */}
      <InsightSection
        card={{ title: "AI Summary", description: report.ai_summary }}
      />

      {/* Growth Insight */}
      <InsightSection
        card={{ title: "Growth Insight", description: report.growth_insight }}
      />

      {/* Strengths & Weak Areas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SkillList
          title="Your strengths"
          description="You are doing well in this area, keep it up"
          items={(report.strength_ratings ?? []).map((rating) => ({
            text: rating.item,
          }))}
          variant="success"
        />

        <SkillList
          title="Weak Areas"
          description="These areas had the biggest impact on your score"
          items={(report.weak_area_ratings ?? []).map((rating) => ({
            text: rating.item,
          }))}
          variant="warning"
        />
      </div>
    </section>
  );
}
