import type { EmployerActivityType } from "@/types/api/employer-dashboard";

export const EMPLOYER_DASHBOARD_GOAL =
  "Browse through job ready talents who have completed their assessments";

export const EMPLOYER_ACTION_ITEMS = [
  {
    title: "Discover verified talents",
    description:
      "Browse talents who have completed assessments and are ready for hiring.",
    actionLabel: "Browse talents",
    href: "/e/dashboard",
    iconSrc: "/assets/employer-dashboard/search.svg",
    iconBg: "#fe9667",
  },
  {
    title: "Create & Share assessments",
    description:
      "Send role-based assessments to talents and review results inside your dashboard.",
    actionLabel: "Create assessments",
    href: "/e/dashboard",
    iconSrc: "/assets/employer-dashboard/read-cv.svg",
    iconBg: "#f9e796",
  },
  {
    title: "Manage your shortlist",
    description:
      "Save top talents and compare them before scheduling interviews.",
    actionLabel: "Open shortlist",
    href: "/e/dashboard",
    iconSrc: "/assets/employer-dashboard/user-multiple.svg",
    iconBg: "#cbb0eb",
  },
] as const;

export const EMPLOYER_TESTIMONIALS = [
  {
    name: "Sandra Lindberg, Founder",
    quote:
      "Placeholder text for the description text of what the user in focus says about their experience with product.",
  },
  {
    name: "Sandra Lindberg, Founder",
    quote:
      "Placeholder text for the description text of what the user in focus says about their experience with product.",
  },
  {
    name: "Sandra Lindberg, Founder",
    quote:
      "Placeholder text for the description text of what the user in focus says about their experience with product.",
  },
] as const;

export const EMPLOYER_OVERVIEW_CARDS_META = [
  {
    key: "verified_talent",
    label: "Verified Talent",
    description:
      "Candidates across engineering, design, product, and cloud roles.",
    linkLabel: "Browse talents",
    linkHref: "/e/talents",
    iconBg: "#D3E6DF",
    icon: "/assets/icons/icon-verified-talent.svg",
  },
  {
    key: "assessments_shared_count",
    label: "Created Assessments",
    description:
      "Track candidate submissions and review performance in one place.",
    linkLabel: "View assessments",
    linkHref: "/e/assessments",
    iconBg: "#F9E796",
    icon: "/assets/icons/icon-assessments-shared.svg",
  },
  {
    key: "shortlisted_candidates",
    label: "Shortlisted Candidates",
    description: "Candidates saved for interviews or next review.",
    linkLabel: "View shortlist",
    linkHref: "/e/shortlist",
    iconBg: "#CBB0EB",
    icon: "/assets/icons/icon-shortlisted-candidates.svg",
  },
  {
    key: "my_roles",
    label: "My Roles",
    description: "Top candidates aligned with your hiring requirements.",
    linkLabel: "View roles",
    linkHref: "/e/roles",
    iconBg: "#EDEEF2",
    icon: "/assets/icons/icon-my-roles.svg",
  },
] as const;

/**
 * Icon + route lookup for `recent_activity` items, keyed by the backend's
 * `type`. Typed against `EmployerActivityType` so adding a new event type
 * upstream becomes a compile error here until we map it.
 */
export const EMPLOYER_ACTIVITY_TYPE_META: Record<
  EmployerActivityType,
  { icon: string; iconBg: string; route: string }
> = {
  verified_talent: {
    icon: "/assets/icons/icon-verified-talent.svg",
    iconBg: "#D3E6DF",
    route: "/e/talents",
  },
  shortlist: {
    icon: "/assets/icons/icon-shortlisted-candidates.svg",
    iconBg: "#CBB0EB",
    route: "/e/shortlist",
  },
  offer_accepted: {
    icon: "/assets/icons/icon-verified-talent.svg",
    iconBg: "#D3E6DF",
    route: "/e/shortlist",
  },
  role_created: {
    icon: "/assets/icons/icon-my-roles.svg",
    iconBg: "#EDEEF2",
    route: "/e/roles",
  },
  assessment_completed: {
    icon: "/assets/icons/icon-assessments-shared.svg",
    iconBg: "#F9E796",
    route: "/e/assessments",
  },
};

export const DEFAULT_EMPLOYER_ACTIVITY_META = {
  icon: "/assets/icons/icon-verified-talent.svg",
  iconBg: "#D3E6DF",
  route: "/e/dashboard",
};
