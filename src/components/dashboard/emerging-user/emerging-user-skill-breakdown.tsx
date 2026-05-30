"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BarColumn, type ChartBar } from "./emerging-user-skill-bar-column";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChartZone {
  id: string;
  label: string;
  bars: ChartBar[];
}

// ─── Static data ──────────────────────────────────────────────────────────────

function buildChartZones(activePercentage: number | undefined): ChartZone[] {
  const activeLabel = activePercentage != null ? `${activePercentage}%` : "47%";
  return [
    {
      id: "emerging",
      label: "Emerging",
      bars: [
        { value: 12 },
        { value: 39 },
        { value: 47, active: true, activeLabel },
      ],
    },
    {
      id: "intermediate",
      label: "Intermediate",
      bars: [{ value: 60 }, { value: 82 }, { value: 40 }],
    },
    {
      id: "job-ready",
      label: "Job Ready",
      bars: [{ value: 48 }, { value: 12 }, { value: 6 }],
    },
  ];
}

const CHART_HEIGHT = 130; // px — visual bar area height
const BAR_GAP = 6; // px — gap between bars inside a zone

function ZoneGroup({ zone }: { zone: ChartZone }) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Bars row */}
      <div
        className="flex items-end"
        style={{ gap: BAR_GAP, height: CHART_HEIGHT }}
      >
        {zone.bars.map((bar, i) => (
          <BarColumn key={i} bar={bar} chartHeight={CHART_HEIGHT} />
        ))}
      </div>

      {/* Full-width zone label pill */}
      <div className="mt-2">
        <span
          className={cn(
            "flex w-full items-center justify-center rounded text-[11px] font-medium",
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

type DashboardSkillBreakdownProps = {
  /** User's advanced-assessment percentage; drives the active bar's label. */
  activePercentage?: number;
  completedAt?: string;
};

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

export function DashboardSkillBreakdown({
  activePercentage,
  completedAt,
}: DashboardSkillBreakdownProps = {}) {
  const lastAttempt = formatAttemptDate(completedAt);
  const chartZones = buildChartZones(activePercentage);

  return (
    <section
      aria-labelledby="skill-breakdown-heading"
      className="flex flex-col rounded-2xl border border-border bg-[#FAFAFA] p-6"
    >
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <h2
          id="skill-breakdown-heading"
          className="text-[18px] font-bold tracking-tight text-foreground"
        >
          Skill breakdown
        </h2>
        <Link
          href="/t/dashboard/ai-report"
          className="flex items-center label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity group"
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Date */}
      {lastAttempt ? (
        <p className="mb-6 text-[13px] text-muted-foreground">
          {" "}
          Last attempt • {lastAttempt}
        </p>
      ) : null}

      {/* Bar chart — extra top padding so hex badge has room */}
      <div className="flex items-end gap-4 pt-18">
        {chartZones.map((zone) => (
          <ZoneGroup key={zone.id} zone={zone} />
        ))}
      </div>
    </section>
  );
}
