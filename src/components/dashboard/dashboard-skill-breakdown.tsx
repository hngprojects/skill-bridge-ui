"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChartBar {
  value: number; // 0–100, controls bar height
  active?: boolean; // amber highlight
  activeLabel?: string; // floating label shown above active bar
}

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
    bars: [{ value: 55 }, { value: 90, active: true, activeLabel: "67%" }],
  },
  {
    id: "intermediate",
    label: "Intermediate",
    bars: [{ value: 72 }, { value: 82 }, { value: 60 }],
  },
  {
    id: "job-ready",
    label: "Job Ready",
    bars: [{ value: 50 }, { value: 38 }],
  },
];

const CHART_HEIGHT = 160; // px — visual bar area height

// ─── Sub-components ───────────────────────────────────────────────────────────

function BarColumn({ bar }: { bar: ChartBar }) {
  const pct = Math.max(2, Math.min(100, bar.value));
  const barPx = Math.round((pct / 100) * CHART_HEIGHT);

  return (
    <div
      className="relative flex flex-1 flex-col items-end justify-end"
      style={{ height: CHART_HEIGHT }}
    >
      {/* Floating label above active bar */}
      {bar.active && bar.activeLabel && (
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2",
            "rounded border border-border bg-white px-2 py-0.5",
            "text-[11px] font-semibold text-foreground shadow-sm whitespace-nowrap",
          )}
          style={{ bottom: barPx + 6 }}
        >
          {bar.activeLabel}
        </span>
      )}

      {/* Bar */}
      <div
        className={cn(
          "w-full rounded-t-sm transition-all duration-700",
          bar.active ? "bg-amber-400" : "bg-gray-200",
        )}
        style={{ height: barPx }}
      />
    </div>
  );
}

function ZoneGroup({ zone }: { zone: ChartZone }) {
  return (
    <div className="flex flex-1 flex-col gap-0">
      {/* Bars */}
      <div className="flex items-end gap-1.5 px-1">
        {zone.bars.map((bar, i) => (
          <BarColumn key={i} bar={bar} />
        ))}
      </div>

      {/* Zone label */}
      <div className="mt-2 flex items-center justify-center">
        <span
          className={cn(
            "rounded-full px-3 py-0.5 text-[11px] font-medium",
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

// ─── Main component ───────────────────────────────────────────────────────────

export function DashboardSkillBreakdown() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      aria-labelledby="skill-breakdown-heading"
      className="flex flex-col rounded-2xl border border-border bg-white p-6"
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
          href="/t/assessments"
          className="label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Learn more →
        </Link>
      </div>

      {/* Date */}
      <p className="mb-6 text-[13px] text-muted-foreground">{today}</p>

      {/* Bar chart */}
      <div className="flex flex-1 items-stretch gap-3 pt-8">
        {CHART_ZONES.map((zone) => (
          <ZoneGroup key={zone.id} zone={zone} />
        ))}
      </div>
    </section>
  );
}
