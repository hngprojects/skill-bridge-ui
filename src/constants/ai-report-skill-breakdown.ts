import type { InsightCard, SkillItem } from "@/types/ai-report-skill-breakdown";

export const AI_SUMMARY: InsightCard = {
  title: "AI Summary",
  description:
    "You demonstrate strong visual thinking, interface structuring, and product intuition. Your growth opportunities currently lie in communication confidence, systems thinking, and decision-making under ambiguity.",
};

export const GROWTH_INSIGHT: InsightCard = {
  title: "Growth Insight",
  description:
    "Your recent assessments show steady improvement in design thinking, interface structure, and adaptability. Focusing more on communication confidence and systems thinking could significantly improve your overall professional readiness.",
};

export const STRENGTHS: SkillItem[] = [
  { text: "Strong hierarchy, spacing, and interface." },
  { text: "Good user flows and usability patterns." },
  { text: "Quick to learn and apply new concepts." },
];

export const WEAK_AREAS: SkillItem[] = [
  { text: "Improve presentation clarity for stakeholder." },
  { text: "Breaking down complex product challenges." },
  { text: "Develop strong understanding product ecosystems" },
];
