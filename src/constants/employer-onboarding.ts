export const EMPLOYER_JOINING_ROLES = [
  { id: "recruiter", label: "Recruiter" },
  { id: "founder", label: "Founder" },
  { id: "agency", label: "Agency" },
] as const;

export type EmployerJoiningRoleId =
  (typeof EMPLOYER_JOINING_ROLES)[number]["id"];

/** Region options. Mirrors `REGIONS` in `constants/complete-profile.ts` so
 *  employer and talent onboarding present the same 5 broad regions. */
export const EMPLOYER_REGION_VALUES = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
] as const;

export type EmployerRegion = (typeof EMPLOYER_REGION_VALUES)[number];

export const EMPLOYER_REGION_OPTIONS = EMPLOYER_REGION_VALUES.map((value) => ({
  value,
  label: value,
}));

/** API `hiringCountRange` values for POST `/employer/onboarding`. */
export const EMPLOYER_HIRING_COUNT_VALUES = [
  "1_5",
  "6_10",
  "11_25",
  "26_50",
  "51_plus",
] as const;

export type EmployerHiringCountRange =
  (typeof EMPLOYER_HIRING_COUNT_VALUES)[number];

const HIRING_COUNT_LABELS: Record<EmployerHiringCountRange, string> = {
  "1_5": "1-5",
  "6_10": "6-10",
  "11_25": "11-25",
  "26_50": "26-50",
  "51_plus": "51+",
};

export const EMPLOYER_HIRING_COUNT_OPTIONS = EMPLOYER_HIRING_COUNT_VALUES.map(
  (value) => ({ value, label: HIRING_COUNT_LABELS[value] }),
);

/**
 * Canonical role tracks the backend accepts on `desiredRoles`. Ids are the
 * exact backend keys, so no conversion is needed at submit time.
 */
export const EMPLOYER_ROLE_TRACKS = [
  { id: "backend_developer", label: "Backend Developer" },
  { id: "bi_developer", label: "BI Developer" },
  { id: "brand_designer", label: "Brand Designer" },
  { id: "business_analyst", label: "Business Analyst" },
  { id: "cloud_devops", label: "Cloud / DevOps" },
  { id: "customer_success", label: "Customer Success" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "data_analyst", label: "Data Analyst" },
  { id: "data_engineer", label: "Data Engineer" },
  { id: "data_scientist", label: "Data Scientist" },
  { id: "frontend_developer", label: "Frontend Developer" },
  { id: "fullstack_developer", label: "Fullstack Developer" },
  { id: "hr_people_ops", label: "HR / People Ops" },
  { id: "marketing", label: "Marketing" },
  { id: "ml_engineer", label: "ML Engineer" },
  { id: "mobile_developer", label: "Mobile Developer" },
  { id: "operations_manager", label: "Operations Manager" },
  { id: "product_designer", label: "Product Designer" },
  { id: "product_manager", label: "Product Manager" },
  { id: "project_manager", label: "Project Manager" },
  { id: "quality_assurance", label: "Quality Assurance" },
  { id: "ux_researcher", label: "UX Researcher" },
] as const;

export type EmployerRoleTrackId = (typeof EMPLOYER_ROLE_TRACKS)[number]["id"];

/** Tuple form for `z.enum(...)`. */
export const EMPLOYER_DESIRED_ROLE_IDS = EMPLOYER_ROLE_TRACKS.map(
  (track) => track.id,
) as [EmployerRoleTrackId, ...EmployerRoleTrackId[]];

export const EMPLOYER_TALENT_ROLE_OPTIONS = EMPLOYER_ROLE_TRACKS.map(
  (track) => ({
    value: track.id,
    label: track.label,
  }),
);

/** Company-size bucket values for POST `/employer/onboarding`. Values use
 *  hyphens so the wire payload matches the visible labels. */
export const EMPLOYER_COMPANY_SIZE_VALUES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
] as const;

export type EmployerCompanySize = (typeof EMPLOYER_COMPANY_SIZE_VALUES)[number];

export const EMPLOYER_COMPANY_SIZE_OPTIONS = EMPLOYER_COMPANY_SIZE_VALUES.map(
  (value) => ({ value, label: value }),
);

/** Experience levels accepted on PATCH `/employer/profile` `preferredExperienceLevels`. */
export const EMPLOYER_EXPERIENCE_LEVELS = ["junior", "mid", "senior"] as const;

const EXPERIENCE_LEVEL_LABELS: Record<
  (typeof EMPLOYER_EXPERIENCE_LEVELS)[number],
  string
> = {
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
};

export const EMPLOYER_EXPERIENCE_LEVEL_OPTIONS = EMPLOYER_EXPERIENCE_LEVELS.map(
  (value) => ({ value, label: EXPERIENCE_LEVEL_LABELS[value] }),
);

/**
 * Default industry options surfaced in the select. The schema validates a
 * free-form string (per product call), so backend can extend the canonical
 * list without an FE change — these are just a curated starting set.
 */
export const EMPLOYER_INDUSTRY_OPTIONS: { value: string; label: string }[] = [
  { value: "technology", label: "Technology" },
  { value: "financial_services", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail_ecommerce", label: "Retail / E-commerce" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "media_entertainment", label: "Media & Entertainment" },
  { value: "real_estate", label: "Real Estate" },
  { value: "energy", label: "Energy" },
  {
    value: "consulting_professional_services",
    label: "Consulting & Professional Services",
  },
  { value: "marketing_advertising", label: "Marketing & Advertising" },
  { value: "non_profit", label: "Non-profit" },
  { value: "hospitality_travel", label: "Hospitality & Travel" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "other", label: "Other" },
];
