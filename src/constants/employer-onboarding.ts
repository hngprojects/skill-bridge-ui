import { TRACK_OPTIONS } from "@/constants/talent-onboarding";

export const EMPLOYER_JOINING_ROLES = [
  { id: "recruiter", label: "Recruiter" },
  { id: "founder", label: "Founder" },
  { id: "agency", label: "Agency" },
] as const;

export type EmployerJoiningRoleId =
  (typeof EMPLOYER_JOINING_ROLES)[number]["id"];

export const EMPLOYER_REGION_OPTIONS = [
  { value: "Nigeria", label: "Nigeria" },
  { value: "Kenya", label: "Kenya" },
  { value: "Ghana", label: "Ghana" },
  { value: "South Africa", label: "South Africa" },
  { value: "Egypt", label: "Egypt" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Uganda", label: "Uganda" },
  { value: "Other", label: "Other" },
];

/** API `hiringCountRange` values for POST `/employer/onboarding`. */
export const EMPLOYER_HIRING_COUNT_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2_5", label: "2–5" },
  { value: "6_10", label: "6–10" },
  { value: "11_20", label: "11–20" },
  { value: "20_plus", label: "20+" },
];

export const EMPLOYER_TALENT_ROLE_OPTIONS = TRACK_OPTIONS.map((track) => ({
  value: track.id,
  label: track.label,
}));
