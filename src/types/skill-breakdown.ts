import type { AssessmentTier } from "@/types/api";

export type SkillBreakdownTierVariant = "emerging" | "job-ready";

export type SkillBreakdownBar = {
  value: number;
  active?: boolean;
  activeLabel?: string;
};

export type SkillBreakdownZone = {
  id: SkillBreakdownTierVariant;
  label: string;
  bars: SkillBreakdownBar[];
};

export type SkillBreakdownChartProps = {
  tier?: AssessmentTier | string | null;
  percentage?: number | null;
  reportType?: string;
  className?: string;
};

export type SkillBreakdownSectionProps = {
  tier?: AssessmentTier | string | null;
  activePercentage?: number;
  completedAt?: string;
};

export type SkillBreakdownBarColumnProps = {
  bar: SkillBreakdownBar;
  variant: SkillBreakdownTierVariant;
};
