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
  retakeText: string;
  warning?: AssessmentPreviewWarning;
};

const sharedExpectations = [
  "We are looking for your authentic self. Answer honestly to get the most accurate profile.",
  "Your results directly influence the AI recommendations for courses and skill development.",
  "By understanding your work style, we can surface opportunities that align with your natural preferences.",
  "Your baseline data is encrypted and only used to enhance your personal SkillBridge experience.",
];

export const ASSESSMENT_PREVIEWS = {
  "personal-assessment": {
    slug: "personal-assessment",
    title: "Personal assessment",
    description:
      "Tell us about your specialization, tools, experience level, and work preferences.",
    iconSrc: "/assets/assessments/personal-assessment-icon.svg",
    questionCount: "25 Multiple-Choice",
    duration: "15-20 minutes",
    attempts: "1/3 (allowed within time limit)",
    retakeText: "Retake valid after 24 hours",
  },
  "skill-assessment": {
    slug: "skill-assessment",
    title: "Skill assessment",
    description:
      "This assessment is designed to evaluate your current skill level in your selected track.",
    iconSrc: "/assets/assessments/skill-assessment-icon.svg",
    questionCount: "8 Multiple-Choice",
    duration: "30 minutes",
    attempts: "1/3 (allowed within time limit)",
    retakeText: "Retake valid after 24 hours",
  },
  "advanced-assessment": {
    slug: "advanced-assessment",
    title: "Advanced assessment",
    description:
      "This assessment is designed to evaluate your current skill level at your selected tracks.",
    iconSrc: "/assets/assessments/advanced-assessment-icon.svg",
    questionCount: "10 Multiple-Choice",
    duration: "20-30 minutes",
    attempts: "1/3 (allowed within time limit)",
    retakeText: "Retake valid after 24 hours",
  },
} satisfies Record<string, AssessmentPreview>;

export const ASSESSMENT_EXPECTATIONS = sharedExpectations;

export function getAssessmentPreview(slug: string): AssessmentPreview {
  if (slug in ASSESSMENT_PREVIEWS) {
    return ASSESSMENT_PREVIEWS[slug as keyof typeof ASSESSMENT_PREVIEWS];
  }

  return ASSESSMENT_PREVIEWS["personal-assessment"];
}
