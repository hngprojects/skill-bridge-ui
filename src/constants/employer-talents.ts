import type {
  Talent,
  TalentProfile,
  EmployerFilterOptions,
} from "@/types/employer-talents";

export const EMPLOYER_TALENTS: Talent[] = [
  {
    id: "1",
    name: "Adebayo O.",
    role: "Frontend Developer",
    level: "MID-LEVEL",
    score: 85,
    avatar: "/avatars/adebayo.png",
    scoreBadge: "/avatars/score-adebayo.svg",
    tags: ["React.Js", "TypeScript", "Remote", "Hybrid", "4 years exp."],
  },
  {
    id: "2",
    name: "Chiamaka E.",
    role: "Product Designer",
    level: "MID-LEVEL",
    score: 87,
    avatar: "/avatars/chiamaka.png",
    scoreBadge: "/avatars/score-chiamaka.svg",
    tags: ["Mid Level", "Open to work", "Remote", "Hybrid", "5 years exp."],
  },
  {
    id: "3",
    name: "David M.",
    role: "Backend Engineer",
    level: "MID-LEVEL",
    score: 91,
    avatar: "/avatars/david.png",
    scoreBadge: "/avatars/score-david.svg",
    tags: ["Node.Js", "PostgreSQL", "Remote", "Hybrid", "3 years exp."],
  },
  {
    id: "4",
    name: "Tolani Y.",
    role: "Frontend Developer",
    level: "Senior Level",
    score: 95,
    avatar: "/avatars/tolani.png",
    scoreBadge: "/avatars/score-tolani.svg",
    tags: ["AWS", "Kubernetes", "Remote", "DevOps", "6 years exp."],
  },
];

export const EMPLOYER_FILTER_OPTIONS: EmployerFilterOptions = {
  experience: ["Junior Level", "Mid Level", "Senior Level"],
  roleTrack: [
    "Frontend Developer",
    "Backend Engineer",
    "Product Designer",
    "DevOps Engineer",
  ],
  availability: ["Immediate", "1 Month Notice", "2 Weeks Notice"],
  region: ["Remote", "Hybrid", "On-site"],
};

export const EMPLOYER_TALENT_PROFILE: TalentProfile = {
  full_name: "Adebayo O.",
  role: "Frontend Developer",
  goal: "Secure a mid-level frontend position focusing on modern React architectures.",
  about:
    "Mid Level frontend developer with 5 years of experience building responsive web interfaces.",
  about_tags: ["Mid Level", "Open to work", "Remote", "Hybrid", "5 years exp"],
  ai_summary:
    "Strong execution in component composition and state synchronization management patterns.",
  ai_report:
    "His assessment behaviour reflects a structured, detailed-oriented approach to complex problem decomposition.",
  avatar_url: "/avatars/adebayo.png",
  verified: true,
  status: "active",
  seniority_badge: "MID-LEVEL",
  tier: "job_ready",
  tier_label: "Job Ready",
  score_percentage: 85,
  skills: [
    "React Fundamentals",
    "Typescript patterns",
    "API Designs",
    "React Native",
  ],
  working_style: ["Remote", "Hybrid"],
  share_url: "https://skillbridge.example.com/share/adebayo",
  qr_code_url: "https://skillbridge.example.com/qr/adebayo.png",
  is_owner: false,
  verified_at: new Date().toISOString(),
  skill_breakdown_tabs: [
    {
      id: "professional_skills",
      label: "Professional Skills",
      items: [
        {
          id: "1",
          label: "Skill Proficiency",
          percentage: 75,
          insight: "Demonstrates consistent output across layout mechanics.",
        },
        {
          id: "2",
          label: "Workplace Readiness",
          percentage: 81,
          insight: "Exceptional alignment with structured workflow timelines.",
        },
        {
          id: "3",
          label: "Practical Application",
          percentage: 81,
          insight: "Strong diagnostic capacity across runtime bugs.",
        },
      ],
    },
  ],
};
