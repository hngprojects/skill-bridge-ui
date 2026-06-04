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

export const EMPLOYER_STAT_CARDS = [
  {
    label: "Verified Talent",
    value: "2,184",
    description:
      "Candidates across engineering, design, product, and cloud roles.",
    linkLabel: "Browse talents",
    linkHref: "/e/talents",
    iconBg: "#D3E6DF",
    icon: "/assets/icons/icon-verified-talent.svg",
  },
  {
    label: "Assessments Shared",
    value: "24",
    description:
      "Track candidate submissions and review performance in one place.",
    linkLabel: "View assessment",
    linkHref: "/e/assessments",
    iconBg: "#F9E796",
    icon: "/assets/icons/icon-assessments-shared.svg",
  },
  {
    label: "Shortlisted Candidates",
    value: "12",
    description: "Candidates saved for interviews or next review.",
    linkLabel: "View shortlist",
    linkHref: "/e/shortlist",
    iconBg: "#CBB0EB",
    icon: "/assets/icons/icon-shortlisted-candidates.svg",
  },
  {
    label: "My Roles",
    value: "3",
    description: "Top candidates aligned with your hiring requirements.",
    linkLabel: "View roles",
    linkHref: "/e/roles",
    iconBg: "#EDEEF2",
    icon: "/assets/icons/icon-my-roles.svg",
  },
] as const;

export const EMPLOYER_RECENT_ACTIVITY = [
  {
    id: "1",
    message: "3 candidates completed Frontend engineer assessment",
    time: "2 hours ago",
    iconBg: "#F9E796",
    icon: "/assets/icons/icon-assessments-shared.svg",
  },
  {
    id: "2",
    message: "2 new verified Product designers added",
    time: "5 hours ago",
    iconBg: "#D3E6DF",
    icon: "/assets/icons/icon-verified-talent.svg",
  },
  {
    id: "3",
    message: "You shortlisted David Mensah",
    time: "Yesterday",
    iconBg: "#CBB0EB",
    icon: "/assets/icons/icon-shortlisted-candidates.svg",
  },
] as const;
