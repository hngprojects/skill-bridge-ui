"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { BarColumn, type ChartBar } from "./job-ready-skill-bar-column";
import { ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChartZone {
  id: string;
  label: string;
  bars: ChartBar[];
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CHART_ZONES: ChartZone[] = [
  {
    id: "emerging",
    label: "Emerging",
    bars: [{ value: 12 }, { value: 39 }, { value: 67 }],
  },
  {
    id: "intermediate",
    label: "Intermediate",
    bars: [{ value: 60 }, { value: 82 }, { value: 40 }],
  },
  {
    id: "job-ready",
    label: "Job Ready",
    bars: [
      { value: 48 },
      { value: 28, active: true, activeLabel: "85%" },
      { value: 16 },
    ],
  },
];

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
            "flex w-full items-center justify-center rounded-sm text-[11px] font-medium",
            zone.id === "job-ready"
              ? "bg-[#E1F1EC] text-[#007B52]"
              : "bg-gray-100 text-muted-foreground",
          )}
        >
          {zone.label}
        </span>
      </div>
    </div>
  );
}

export function JobReadySkillBreakdown() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      aria-labelledby="skill-breakdown-heading"
      className="flex flex-col rounded-2xl border border-border bg-[#FAFAFA] p-8"
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
          href="#"
          className="flex items-center label shrink-0 text-foreground underline underline-offset-2 group"
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Date */}
      <p className="mb-6 text-[13px] text-muted-foreground">
        Last attempt • {today}
      </p>

      {/* Bar chart — extra top padding so hex badge has room */}
      <div className="flex items-end gap-4 pt-18">
        {CHART_ZONES.map((zone) => (
          <ZoneGroup key={zone.id} zone={zone} />
        ))}
      </div>
    </section>
  );
}
