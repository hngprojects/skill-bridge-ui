import type { VerifiedProfileResponseData } from "@/types/api";

/** Placeholder profile shown blurred behind the unverified overlay. */
export const verifiedProfilePlaceholder: VerifiedProfileResponseData = {
  full_name: "Alex Smith",
  role: "Frontend Developer",
  goal: "Land my first role",
  about: "",
  about_tags: ["Mid Level", "Open to Work", "Remote", "Hybrid", "5 years exp."],
  ai_summary:
    "Assessment behaviour reflects a structured, detail-oriented approach to complex problem decomposition.",
  ai_report:
    "Assessment behaviour reflects a structured, detail-oriented approach to complex problem decomposition.",
  avatar_url: null,
  verified: false,
  status: "in_progress",
  seniority_badge: "Mid Level",
  skills: [
    "React Fundamentals",
    "Typescript patterns",
    "API Designs",
    "React Native",
  ],
  tier: "job_ready",
  tier_label: "Job Ready",
  score_percentage: 85,
  skill_breakdown_tabs: [
    {
      id: "assessment_scores",
      label: "Assessment Scores",
      items: [
        {
          id: "skill_proficiency",
          label: "Skill Proficiency",
          percentage: 70,
          validated_level: "mid",
          insight:
            "Assessment behaviour reflects a structured, detail-oriented approach to complex problem decomposition.",
        },
        {
          id: "workplace_readiness",
          label: "Workplace Readiness",
          percentage: 82,
          insight:
            "Demonstrates reliability and clear communication in collaborative settings.",
        },
        {
          id: "practical_application",
          label: "Practical Application",
          percentage: 82,
          insight:
            "Applies fundamentals effectively when building user-facing features.",
        },
      ],
    },
    {
      id: "professional_skills",
      label: "Professional Skills",
      items: [
        {
          label: "Communication",
          percentage: 78,
          insight: "Communicates technical decisions clearly to stakeholders.",
        },
        {
          label: "Teamwork",
          percentage: 85,
          insight: "Works well in cross-functional product teams.",
        },
        {
          label: "Adaptability",
          percentage: 72,
          insight: "Adjusts quickly when requirements or priorities shift.",
        },
      ],
    },
    {
      id: "key_strengths",
      label: "Strengths",
      items: [
        {
          competency: "problem_solving",
          label: "Problem Solving",
          percentage: 90,
          insight: "Breaks down ambiguous problems into actionable steps.",
        },
        {
          competency: "analytical_thinking",
          label: "Analytical Thinking",
          percentage: 84,
          insight: "Evaluates trade-offs before committing to an approach.",
        },
        {
          competency: "attention_to_detail",
          label: "Attention to Detail",
          percentage: 76,
          insight: "Catches edge cases during implementation and review.",
        },
      ],
    },
  ],
  share_url: "",
  qr_code_url: "",
  is_owner: true,
  verified_at: "",
};
type UserReport = {
  name: string;
  role: string;
  goal: string;
  about: string[];
  skills: string[];
  aiReport: string;
  detailedSkills: DetailedSkills[];
};

type DetailedSkills = {
  title: string;
  skillInfo: { label: string; value: number }[];
};

const userReport: UserReport = {
  name: "Alex Smith",
  role: "Frontend Developer",
  goal: "Land my first role",
  about: ["Mid Level", "Open to Work", "Remote", "Hybrid", "5 years exp."],
  skills: [
    "React Fundamentals",
    "Typescript patterns",
    "API Designs",
    "React Native",
  ],
  aiReport:
    "His assessment behaviour reflects a structured, detail-oriented approach to complex problem decomposition",
  detailedSkills: [
    {
      title: "Professional Skills",
      skillInfo: [
        { label: "Skill Proficiency", value: 70 },
        { label: "Workplace Readiness", value: 82 },
        { label: "Practical Application", value: 82 },
      ],
    },
    {
      title: "Soft Skills",
      skillInfo: [
        { label: "Communication", value: 78 },
        { label: "Teamwork", value: 85 },
        { label: "Adaptability", value: 72 },
      ],
    },
    {
      title: "Working Style",
      skillInfo: [
        { label: "Independence", value: 88 },
        { label: "Collaboration", value: 74 },
        { label: "Time Management", value: 69 },
      ],
    },
    {
      title: "Strengths",
      skillInfo: [
        { label: "Problem Solving", value: 90 },
        { label: "Analytical Thinking", value: 84 },
        { label: "Attention to Detail", value: 76 },
      ],
    },
    {
      title: "Weaknesses",
      skillInfo: [
        { label: "Public Speaking", value: 45 },
        { label: "Delegation", value: 52 },
        { label: "Time Estimation", value: 58 },
      ],
    },
  ],
};

export { userReport };
