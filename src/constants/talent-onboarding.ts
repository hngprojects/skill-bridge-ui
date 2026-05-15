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
    id: "cybersecurity",
    label: "Cybersecurity",
    tags: "Security · Compliance",
  },
  {
    id: "data-scientist",
    label: "Data Scientist",
    tags: "Python · ML · Statistics",
  },
] as const;

export type TrackOptionId = (typeof TRACK_OPTIONS)[number]["id"];
