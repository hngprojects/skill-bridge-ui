export type AssessmentPreviewWarning = {
  title: string;
  description: string;
};

export type AssessmentPreview = {
  slug: string;
  title: string;
  description: string;
  iconSrc: string;
  questionCount: string;
  duration: string;
  attempts: string;
  retakeText?: string;
  warning?: AssessmentPreviewWarning;
};

const sharedExpectations = [
  "We are looking for your authentic self. Answer honestly to get the most accurate profile.",
  "Your results directly influence the AI recommendations for courses and skill development.",
  "By understanding your work style, we can surface opportunities that align with your natural preferences.",
  "Your baseline data is encrypted and only used to enhance your personal SkillBridge experience.",
];

export const ASSESSMENT_PREVIEWS = {
  personal: {
    slug: "personal",
    title: "Personal assessment",
    description:
      "Tell us about your specialization, tools, experience level, and work preferences.",
    iconSrc: "/assets/assessments/personal-assessment-icon.svg",
    questionCount: "15 Questions",
    duration: "No duration",
    attempts: "1 attempt",
  },
  skill: {
    slug: "skill",
    title: "Skill assessment",
    description:
      "This assessment is designed to evaluate your current skill level in your selected track.",
    iconSrc: "/assets/assessments/skill-assessment-icon.svg",
    questionCount: "20 Questions",
    duration: "30 minutes",
    attempts: "3 attempts (allowed within time limit)",
  },
  advanced: {
    slug: "advanced",
    title: "Advanced assessment",
    description:
      "This assessment is designed to evaluate your current skill level at your selected tracks.",
    iconSrc: "/assets/assessments/advanced-assessment-icon.svg",
    questionCount: "15 Questions",
    duration: "25 - 30 minutes",
    attempts: "1 attempt (allowed within time limit)",
    retakeText: "Retake valid after 14 days",
  },
} satisfies Record<string, AssessmentPreview>;

export const ASSESSMENT_EXPECTATIONS = sharedExpectations;

export type AssessmentSlug = keyof typeof ASSESSMENT_PREVIEWS;

/** Fallback questionnaire section label when a question carries no section title. */
export const ASSESSMENT_FALLBACK_SECTION_TITLES: Record<
  AssessmentSlug,
  string
> = {
  personal: "Personal Assessment",
  skill: "Skill Assessment",
  advanced: "Advanced Assessment",
};

export function isAssessmentSlug(slug: string): slug is AssessmentSlug {
  return slug in ASSESSMENT_PREVIEWS;
}

export function getAssessmentPreview(slug: AssessmentSlug): AssessmentPreview {
  return ASSESSMENT_PREVIEWS[slug];
}
