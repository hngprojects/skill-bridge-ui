"use client";

import { Info, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export type SkillInsightVariant = "success" | "warning";

export interface SkillBarProps {
  title: string;
  percentage: number;
  insight: string;
  insightVariant?: SkillInsightVariant;
  info?: string;
}

export function DashboardSkillBar({
  title,
  percentage,
  insight,
  insightVariant = "warning",
}: SkillBarProps) {
  const clampedPct = Math.max(0, Math.min(100, percentage));

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      {/* Title row */}
      <div className="mb-5 flex items-center gap-1.5">
        <span className="label font-semibold text-foreground">{title}</span>
        <Info
          className="size-3.5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      {/* Track + label region */}
      <div className="relative mb-7">
        {/* ── Track ── */}
        <div className="relative h-[5px] rounded-full bg-gray-200">
          {/* Filled portion */}
          <div
            className="h-full rounded-full bg-foreground"
            style={{ width: `${clampedPct}%` }}
          />

          {/* Thumb dot */}
          <div
            className="absolute top-2.5 size-3.5 -translate-y-1/2 rounded-full bg-foreground ring-2 ring-white"
            style={{
              left: `${clampedPct}%`,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Mid-point tick */}
          <div
            className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-gray-300"
            style={{ left: "50%" }}
          />
        </div>

        {/* ── Bottom labels ── */}
        <div className="relative mt-2 h-5">
          {/* WEAK */}
          <span className="absolute left-0 caption uppercase tracking-widest text-muted-foreground">
            WEAK
          </span>

          {/* Percentage pill — floats under thumb */}
          <span
            className={cn(
              "absolute caption font-medium text-foreground",
              "rounded border border-border bg-white px-1 py-0.5 leading-none shadow-sm",
              "-translate-x-1/2",
            )}
            style={{ left: `${clampedPct}%` }}
          >
            {clampedPct}%
          </span>

          {/* STRONG */}
          <span className="absolute right-0 caption uppercase tracking-widest text-muted-foreground">
            STRONG
          </span>
        </div>
      </div>

      {/* ── Insight tag ── */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2.5",
          insightVariant === "success" ? "bg-emerald-50" : "bg-amber-50",
        )}
      >
        <Sparkles
          className={cn(
            "size-4 shrink-0",
            insightVariant === "success"
              ? "text-emerald-500"
              : "text-amber-500",
          )}
          aria-hidden="true"
        />
        <span className="body-3 text-foreground">{insight}</span>
      </div>
    </div>
  );
}
