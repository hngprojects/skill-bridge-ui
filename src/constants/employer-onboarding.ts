import { TRACK_OPTIONS } from "@/constants/talent-onboarding";
import { REGIONS } from "@/constants/complete-profile";

export const EMPLOYER_JOINING_ROLES = [
  { id: "recruiter", label: "Recruiter" },
  { id: "founder", label: "Founder" },
  { id: "agency", label: "Agency" },
] as const;

export type EmployerJoiningRoleId =
  (typeof EMPLOYER_JOINING_ROLES)[number]["id"];

export const EMPLOYER_TALENT_ROLE_OPTIONS = TRACK_OPTIONS.map((track) => ({
  value: track.id,
  label: track.label,
}));

export const EMPLOYER_REGION_OPTIONS = REGIONS;

export const EMPLOYER_HIRING_VOLUME_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2-5", label: "2–5" },
  { value: "6-10", label: "6–10" },
  { value: "11-20", label: "11–20" },
  { value: "20+", label: "20+" },
];
