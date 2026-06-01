"use client";

import {
  SKILL_BREAKDOWN_BAR_GAP,
  SKILL_BREAKDOWN_CHART_HEIGHT,
} from "@/constants/skill-breakdown";
import {
  buildSkillBreakdownZones,
  getSkillBreakdownTierVariant,
} from "@/lib/skill-breakdown-zones";
import { cn } from "@/lib/utils";
import type { SkillBreakdownChartProps } from "@/types/skill-breakdown";

import { SkillBreakdownBarColumn } from "./skill-breakdown-bar-column";

export function SkillBreakdownChart({
  tier,
  percentage,
  reportType,
  className,
}: SkillBreakdownChartProps) {
  const variant = getSkillBreakdownTierVariant(tier, reportType);
  const zones = buildSkillBreakdownZones(percentage ?? undefined, variant);

  return (
    <div
      className={
        className ??
        "flex items-end gap-2 overflow-x-auto pt-10 sm:gap-4 sm:pt-14 lg:pt-18"
      }
    >
      {zones.map((zone) => (
        <div key={zone.id} className="flex flex-1 flex-col">
          <div
            className="flex items-end"
            style={{
              gap: SKILL_BREAKDOWN_BAR_GAP,
              height: SKILL_BREAKDOWN_CHART_HEIGHT,
            }}
          >
            {zone.bars.map((bar, i) => (
              <SkillBreakdownBarColumn key={i} bar={bar} variant={variant} />
            ))}
          </div>
          <div className="mt-2">
            <span
              className={cn(
                "flex h-7 w-full items-center justify-center rounded-md text-[10px] font-medium sm:h-8 sm:text-[11px]",
                zone.id === variant
                  ? variant === "job-ready"
                    ? "bg-[#E1F1EC] text-[#007B52]"
                    : "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-muted-foreground",
              )}
            >
              {zone.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
