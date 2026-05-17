import {
  TRACK_OPTIONS,
  type TrackOptionId,
} from "@/constants/talent-onboarding";

export const EMPLOYER_JOINING_ROLES = [
  { id: "recruiter", label: "Recruiter" },
  { id: "founder", label: "Founder" },
  { id: "agency", label: "Agency" },
] as const;

export type EmployerJoiningRoleId =
  (typeof EMPLOYER_JOINING_ROLES)[number]["id"];

export const EMPLOYER_REGION_VALUES = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "South Africa",
  "Egypt",
  "Rwanda",
  "Uganda",
  "Other",
] as const;

export type EmployerRegion = (typeof EMPLOYER_REGION_VALUES)[number];

export const EMPLOYER_REGION_OPTIONS = EMPLOYER_REGION_VALUES.map((value) => ({
  value,
  label: value,
}));

/** API `hiringCountRange` values for POST `/employer/onboarding`. */
export const EMPLOYER_HIRING_COUNT_VALUES = [
  "1",
  "2_5",
  "6_10",
  "11_20",
  "20_plus",
] as const;

export type EmployerHiringCountRange =
  (typeof EMPLOYER_HIRING_COUNT_VALUES)[number];

const HIRING_COUNT_LABELS: Record<EmployerHiringCountRange, string> = {
  "1": "1",
  "2_5": "2–5",
  "6_10": "6–10",
  "11_20": "11–20",
  "20_plus": "20+",
};

export const EMPLOYER_HIRING_COUNT_OPTIONS = EMPLOYER_HIRING_COUNT_VALUES.map(
  (value) => ({ value, label: HIRING_COUNT_LABELS[value] }),
);

/** Track IDs allowed in employer onboarding `desiredRoles` (form values). */
export const EMPLOYER_DESIRED_ROLE_IDS = TRACK_OPTIONS.map(
  (track) => track.id,
) as [TrackOptionId, ...TrackOptionId[]];

export const EMPLOYER_TALENT_ROLE_OPTIONS = TRACK_OPTIONS.map((track) => ({
  value: track.id,
  label: track.label,
}));
