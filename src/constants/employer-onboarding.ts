import { COUNTRY_LIST, type CountryName } from "@/constants/country-list";
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

/** Allowed `region` values for employer onboarding (full country list). */
export const EMPLOYER_REGION_VALUES = COUNTRY_LIST;

export type EmployerRegion = CountryName;

export const EMPLOYER_REGION_OPTIONS = COUNTRY_LIST.map((value) => ({
  value,
  label: value,
}));

/** API `hiringCountRange` values for POST `/employer/onboarding`. */
export const EMPLOYER_HIRING_COUNT_VALUES = [
  "1_5",
  "6_10",
  "11_20",
  "20_plus",
] as const;

export type EmployerHiringCountRange =
  (typeof EMPLOYER_HIRING_COUNT_VALUES)[number];

const HIRING_COUNT_LABELS: Record<EmployerHiringCountRange, string> = {
  "1_5": "1-5",
  "6_10": "6-10",
  "11_20": "11-20",
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
