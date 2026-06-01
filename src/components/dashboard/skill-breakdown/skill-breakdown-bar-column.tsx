"use client";

import { useId } from "react";

import { SKILL_BREAKDOWN_CHART_HEIGHT } from "@/constants/skill-breakdown";
import { cn } from "@/lib/utils";
import type { SkillBreakdownBarColumnProps } from "@/types/skill-breakdown";

export function SkillBreakdownBarColumn({
  bar,
  variant,
}: SkillBreakdownBarColumnProps) {
  const clipId = useId();
  const barPx = Math.round(
    (Math.max(2, Math.min(100, bar.value)) / 100) *
      SKILL_BREAKDOWN_CHART_HEIGHT,
  );
  const activeColor = variant === "job-ready" ? "bg-[#009F6A]" : "bg-amber-400";
  const badgeFill = variant === "job-ready" ? "#009F6A" : "#F59E0B";

  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-end"
      style={{ height: SKILL_BREAKDOWN_CHART_HEIGHT }}
    >
      {bar.active && bar.activeLabel ? (
        <div
          className="absolute"
          style={{
            bottom: barPx - 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: 36, height: 40 }}
          >
            <svg width="0" height="0" className="absolute" aria-hidden>
              <defs>
                <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                  <path d="M 0.456,0.015 C 0.484,0.0 0.516,0.0 0.544,0.015 L 0.956,0.224 C 0.984,0.239 1.0,0.268 1.0,0.299 V 0.701 C 1.0,0.732 0.984,0.761 0.956,0.776 L 0.544,0.985 C 0.516,1.0 0.484,1.0 0.456,0.985 L 0.044,0.776 C 0.016,0.761 0.0,0.732 0.0,0.701 V 0.299 C 0.0,0.268 0.016,0.239 0.044,0.224 L 0.456,0.015 Z" />
                </clipPath>
              </defs>
            </svg>
            <div
              className="absolute inset-0 bg-white"
              style={{
                WebkitClipPath: `url(#${clipId})`,
                clipPath: `url(#${clipId})`,
                transform: "scale(1.08)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: badgeFill,
                WebkitClipPath: `url(#${clipId})`,
                clipPath: `url(#${clipId})`,
              }}
            />
            <span className="relative text-[11px] font-bold leading-none text-white">
              {bar.activeLabel}
            </span>
          </div>
        </div>
      ) : null}
      <div
        className={cn(
          "w-full rounded-t-sm",
          bar.active ? activeColor : "bg-gray-200",
        )}
        style={{ height: barPx }}
      />
    </div>
  );
}
