import type {
  SkillBreakdownTierVariant,
  SkillBreakdownZone,
} from "@/types/skill-breakdown";
import type { AssessmentTier } from "@/types/api";

export function getSkillBreakdownTierVariant(
  tier?: AssessmentTier | string | null,
  reportType?: string,
): SkillBreakdownTierVariant {
  if (reportType === "job_ready" || reportType === "job-ready") {
    return "job-ready";
  }
  return tier === "job_ready" ? "job-ready" : "emerging";
}

export function buildSkillBreakdownZones(
  percentage: number | undefined,
  variant: SkillBreakdownTierVariant,
): SkillBreakdownZone[] {
  const score = Math.round(Math.max(0, Math.min(100, percentage ?? 0)));
  const label = `${score}%`;
  const jobReady = variant === "job-ready";

  return [
    {
      id: "emerging",
      label: "Emerging",
      bars: [
        { value: 12 },
        { value: 39 },
        {
          value: jobReady ? 67 : score,
          active: !jobReady,
          activeLabel: !jobReady ? label : undefined,
        },
      ],
    },
    {
      id: "job-ready",
      label: "Job Ready",
      bars: [
        { value: 48 },
        {
          value: jobReady ? score : 28,
          active: jobReady,
          activeLabel: jobReady ? label : undefined,
        },
        { value: 16 },
      ],
    },
  ];
}
