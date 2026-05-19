"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChartBar {
  value: number; // 0–100, controls bar height
  active?: boolean; // amber highlight
  activeLabel?: string; // hexagon badge shown above active bar
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
    bars: [
      { value: 12 },
      { value: 39 },
      { value: 67, active: true, activeLabel: "67%" },
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

const CHART_HEIGHT = 130; // px — visual bar area height
const BAR_GAP = 6; // px — gap between bars inside a zone

function HexBadge({ label }: { label: string }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 36, height: 40 }}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="hexRounded" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0.456,0.015
              C 0.484,0.0   0.516,0.0   0.544,0.015
              L 0.956,0.224
              C 0.984,0.239  1.0,0.268   1.0,0.299
              V 0.701
              C 1.0,0.732   0.984,0.761  0.956,0.776
              L 0.544,0.985
              C 0.516,1.0   0.484,1.0   0.456,0.985
              L 0.044,0.776
              C 0.016,0.761  0.0,0.732   0.0,0.701
              V 0.299
              C 0.0,0.268   0.016,0.239  0.044,0.224
              L 0.456,0.015 Z
            "
            />
          </clipPath>
        </defs>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#ffffffff",
          WebkitClipPath: "url(#hexRounded)",
          clipPath: "url(#hexRounded)",
          transform: "scale(1.08)",
        }}
      />
      {/* Fill layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#F59E0B",
          WebkitClipPath: "url(#hexRounded)",
          clipPath: "url(#hexRounded)",
        }}
      />
      <span className="relative text-[11px] font-bold text-white leading-none tracking-tight">
        {label}
      </span>
    </div>
  );
}

// ─── Single bar column ────────────────────────────────────────────────────────

function BarColumn({ bar }: { bar: ChartBar }) {
  const pct = Math.max(2, Math.min(100, bar.value));
  const barPx = Math.round((pct / 100) * CHART_HEIGHT);

  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-end"
      style={{ height: CHART_HEIGHT }}
    >
      {/* Hexagon badge above active bar */}
      {bar.active && bar.activeLabel && (
        <div
          className="absolute"
          style={{
            bottom: barPx - 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <HexBadge label={bar.activeLabel} />
        </div>
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
    <div className="flex flex-1 flex-col">
      {/* Bars row */}
      <div
        className="flex items-end"
        style={{ gap: BAR_GAP, height: CHART_HEIGHT }}
      >
        {zone.bars.map((bar, i) => (
          <BarColumn key={i} bar={bar} />
        ))}
      </div>

      {/* Full-width zone label pill */}
      <div className="mt-2">
        <span
          className={cn(
            "flex w-full items-center justify-center rounded-sm py-1 text-[11px] font-medium",
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

export function DashboardSkillBreakdown() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
          href="/t/assessments"
          className="label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Learn more →
        </Link>
      </div>

      {/* Date */}
      <p className="mb-6 text-[13px] text-muted-foreground">{today}</p>

      {/* Bar chart — extra top padding so hex badge has room */}
      <div className="flex items-end gap-4 pt-10">
        {CHART_ZONES.map((zone) => (
          <ZoneGroup key={zone.id} zone={zone} />
        ))}
      </div>
    </section>
  );
}
