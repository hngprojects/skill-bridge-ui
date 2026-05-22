"use client";

import { cn } from "@/lib/utils";
import { BarColumn } from "./emerging-user-skill-bar-column";

import { AI_SUMMARY, BAR_GAP, CHART_HEIGHT, CHART_ZONES, GROWTH_INSIGHT, STRENGTHS, WEAK_AREAS, } from "@/constants/ai-report-skill-breakdown";

import type { ChartZone, InsightCard, SkillItem, } from "@/types/ai-report-skill-breakdown";

// ─── Components ───────────────────────────────────────────────────────────────

function ZoneGroup({ zone }: { zone: ChartZone }) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Bars */}
      <div
        className="flex items-end"
        style={{ gap: BAR_GAP, height: CHART_HEIGHT }}
      >
        {zone.bars.map((bar, i) => (
          <BarColumn key={i} bar={bar} chartHeight={CHART_HEIGHT} />
        ))}
      </div>

      {/* Label */}
      <div className="mt-2">
        <span
          className={cn(
            "flex h-7 w-full items-center justify-center rounded-md text-[10px] font-medium sm:h-8 sm:text-[11px]",
            zone.id === "emerging"
              ? "bg-amber-100 text-amber-700"
              : "bg-gray-100 text-muted-foreground",
          )}
        >
          {zone.label}
        </span>
      </div>
    </div>
  );
}

function InsightSection({ card }: { card: InsightCard }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 lg:p-6">
      <h3 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px] lg:text-[22px]">
        {card.title}
      </h3>

      <p className="mt-2 text-[14px] leading-6 text-muted-foreground sm:mt-3 sm:text-[15px] sm:leading-7">
        {card.description}
      </p>
    </div>
  );
}

function SkillList({
  title,
  description,
  items,
  variant,
}: {
  title: string;
  description: string;
  items: SkillItem[];
  variant: "success" | "warning";
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-4 sm:p-5 lg:p-6">
      <div>
        <h3 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px] lg:text-[22px]">
          {title}
        </h3>

        <p className="mt-2 text-[13px] leading-6 text-muted-foreground sm:text-[14px]">
          {description}
        </p>
      </div>

      <div className="mt-4 flex flex-col divide-y divide-border sm:mt-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 py-3 sm:py-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />

              <p className="text-[14px] leading-6 text-foreground sm:text-[15px]">
                {item.text}
              </p>
            </div>

            {/* Indicator bars */}
            <div className="flex shrink-0 items-end gap-[2px]">
              {[1, 2, 3].map((bar) => (
                <div
                  key={bar}
                  className={cn(
                    "w-[5px] rounded-sm sm:w-[6px]",
                    variant === "success"
                      ? "bg-emerald-500"
                      : "bg-amber-400",
                  )}
                  style={{
                    height:
                      bar === 1 ? 10 : bar === 2 ? 16 : 24,
                    opacity:
                      bar === 3 ? 1 : bar === 2 ? 0.8 : 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AiReportSkillBreakdown() {
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
            Top 30%
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
      <InsightSection card={AI_SUMMARY} />

      {/* Growth Insight */}
      <InsightSection card={GROWTH_INSIGHT} />

      {/* Strengths & Weak Areas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SkillList
          title="Your strengths"
          description="You are doing well in this area, keep it up"
          items={STRENGTHS}
          variant="success"
        />

        <SkillList
          title="Weak Areas"
          description="These areas had the biggest impact on your score"
          items={WEAK_AREAS}
          variant="warning"
        />
      </div>
    </section>
  );
}