import type { EmployerDiscoveryCandidate } from "@/types/api/employer-discovery";
import type { EmployerFilterOptions } from "@/types/employer-talents";

export const EMPLOYER_FILTER_OPTIONS: EmployerFilterOptions = {
  experience: [
    { value: "junior", label: "Junior Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "expert", label: "Expert" },
  ],
  roleTrack: [
    { value: "frontend_developer", label: "Frontend Developer" },
    { value: "backend_developer", label: "Backend Engineer" },
    { value: "fullstack_developer", label: "Fullstack Developer" },
    { value: "data_analyst", label: "Data Analyst" },
    { value: "data_scientist", label: "Data Scientist" },
    { value: "product_designer", label: "Product Designer" },
    { value: "product_manager", label: "Product Manager" },
    { value: "devops_engineer", label: "DevOps Engineer" },
    { value: "mobile_developer", label: "Mobile Developer" },
    { value: "qa_engineer", label: "QA Engineer" },
  ],
  availability: [
    { value: "immediately_available", label: "Immediately available" },
    { value: "on_notice_under_1_month", label: "On notice (under 1 month)" },
    { value: "on_notice_1_3_months", label: "On notice (1–3 months)" },
    { value: "employed_flexible", label: "Employed, flexible" },
  ],
  region: [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "on-site", label: "On-site" },
  ],
};

export function getEmployerFilterLabel(
  section: keyof EmployerFilterOptions,
  value: string,
): string {
  const match = EMPLOYER_FILTER_OPTIONS[section].find(
    (option) => option.value === value,
  );
  return match?.label ?? value;
}

export function buildDiscoveryCandidateTags(
  candidate: Pick<
    EmployerDiscoveryCandidate,
    | "topSkills"
    | "availabilityLabel"
    | "region"
    | "seniorityBadge"
    | "validatedLevel"
  >,
): string[] {
  const tags = [
    ...candidate.topSkills,
    candidate.availabilityLabel,
    candidate.region,
    candidate.seniorityBadge || candidate.validatedLevel,
  ].filter(Boolean);

  return [...new Set(tags)];
}
