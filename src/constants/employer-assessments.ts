import type { EmployerAssessmentStatus } from "@/types/api/employer-assessments";

export const DEFAULT_ASSESSMENT_PASS_RATE = 70;

export const ASSESSMENT_STATUS_META: Record<
  EmployerAssessmentStatus,
  { label: string; pillClass: string }
> = {
  active: {
    label: "Active",
    pillClass: "bg-[#FEF3C7] text-[#92400E]",
  },
  inactive: {
    label: "Inactive",
    pillClass: "bg-[#E5E7EB] text-[#374151]",
  },
};
