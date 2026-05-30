import { cn } from "@/lib/utils";

export const ONBOARDING_NAV_BTN_SHAPE = "h-11 min-w-48 rounded-lg px-4";

export const ONBOARDING_NEXT_BTN_CLASSNAME = cn(
  ONBOARDING_NAV_BTN_SHAPE,
  "w-full sm:min-w-32 sm:w-auto md:w-60 lg:min-w-60 lg:max-w-60",
);

export const ONBOARDING_BACK_BTN_CLASSNAME = cn(
  ONBOARDING_NAV_BTN_SHAPE,
  "w-full sm:min-w-32 sm:w-auto",
  "border-0 bg-[#CBD5E1] text-[#94A3B8] shadow-none",
  "hover:bg-[#BCC9D9] hover:text-[#94A3B8]",
  "focus-visible:ring-[#94A3B8]/30",
);

export const ONBOARDING_STEPS = [
  { id: "set-goal", title: "Set a Goal" },
  { id: "select-track", title: "Select your Track" },
  { id: "complete-profile", title: "Complete Profile" },
  { id: "generate-roadmap", title: "Generate Roadmap" },
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number]["id"];

export const GOAL_OPTIONS = [
  { id: "first-role", label: "Land my first role" },
  { id: "technical-skills", label: "Build stronger technical skills" },
  { id: "validate-ability", label: "Validate my current ability" },
  { id: "employability", label: "Become more employable" },
] as const;

export type GoalOptionId = (typeof GOAL_OPTIONS)[number]["id"];

/** API `goal` values for POST/PATCH `/talent/onboarding/goal`. */
export const GOAL_TO_API: Record<GoalOptionId, string> = {
  "first-role": "land_first_role",
  "technical-skills": "build_technical_skills",
  "validate-ability": "validate_current_ability",
  employability: "become_more_employable",
};

export function goalIdToApiGoal(id: GoalOptionId): string {
  return GOAL_TO_API[id];
}

/** Reverse map of `GOAL_TO_API` — API slug -> display label. */
const API_GOAL_TO_LABEL: Record<string, string> = Object.fromEntries(
  GOAL_OPTIONS.map(({ id, label }) => [GOAL_TO_API[id], label]),
);

export function apiGoalToLabel(
  apiGoal: string | undefined,
): string | undefined {
  if (!apiGoal) return undefined;
  return API_GOAL_TO_LABEL[apiGoal];
}

export const TRACK_OPTIONS = [
  {
    id: "product-designer",
    label: "Product Designer",
    tags: "UX Research · Figma",
  },
  {
    id: "frontend-developer",
    label: "Frontend Developer",
    tags: "React · CSS · JS",
  },
  { id: "data-analyst", label: "Data Analyst", tags: "SQL · Python · Viz" },
  { id: "cloud-devops", label: "Cloud / DevOps", tags: "AWS · Docker · CI/CD" },
  {
    id: "product-manager",
    label: "Product Manager",
    tags: "Strategy · Roadmaps",
  },
  {
    id: "backend-developer",
    label: "Backend Developer",
    tags: "Node · APIs · DBs",
  },
  {
    id: "mobile-developer",
    label: "Mobile Developer",
    tags: "Flutter · Swift · Kotlin",
  },
  {
    id: "social-media-marketing",
    label: "Social media marketing",
    tags: "Content · Strategy · Analytics",
  },
  {
    id: "data-scientist",
    label: "Data Scientist",
    tags: "Python · ML · Statistics",
  },
] as const;

export type TrackOptionId = (typeof TRACK_OPTIONS)[number]["id"];

/** API track values (snake_case): POST `{ track }` per selection; PATCH `{ roleTracks: [...] }`. */
export function trackIdToApiRoleTrack(id: TrackOptionId): string {
  return id.replace(/-/g, "_");
}

export function trackIdsToApiRoleTracks(ids: TrackOptionId[]): string[] {
  return ids.map(trackIdToApiRoleTrack);
}

/** Reverse map: API track slug -> display label. */
const API_TRACK_TO_LABEL: Record<string, string> = Object.fromEntries(
  TRACK_OPTIONS.map(({ id, label }) => [trackIdToApiRoleTrack(id), label]),
);

export function apiRoleTrackToLabel(
  apiTrack: string | undefined,
): string | undefined {
  if (!apiTrack) return undefined;
  return API_TRACK_TO_LABEL[apiTrack];
}
