export const CREATE_ASSESSMENT_STEPS = [
  { id: "details", title: "Assessment details" },
  { id: "questions", title: "Choose questions" },
  { id: "preview", title: "Preview" },
] as const;

export type CreateAssessmentStepId =
  (typeof CREATE_ASSESSMENT_STEPS)[number]["id"];

export const CREATE_ASSESSMENT_STEP_META: Record<
  CreateAssessmentStepId,
  { title: string; description: string }
> = {
  details: {
    title: "Assessment details",
    description: "Onboard and set roles customized for your hire.",
  },
  questions: {
    title: "Select assessment question",
    description:
      "Personalize your assessment question based on your hire preference",
  },
  preview: {
    title: "Preview",
    description: "Review your assessment before publishing.",
  },
};

export const WELCOME_MESSAGE_MAX_CHARS = 2000;

export const DEFAULT_WELCOME_MESSAGE_HTML =
  "<p>Welcome, and thank you for your interest in this opportunity. This frontend assessment is designed to help us understand your technical skills, problem-solving approach, and attention to detail. Please review the requirements carefully and submit your best work within the provided timeframe.</p>";

export const ASSESSMENT_GUIDELINE_OPTIONS = [
  {
    id: "attempts",
    label: "Attempts",
    description: "Restricted number of attempts.",
  },
  {
    id: "timeout",
    label: "Timeout",
    description: "Duration to wait before retrying.",
  },
  {
    id: "captcha",
    label: "Captcha",
    description: "Verification to prevent automated submissions.",
  },
] as const;

export type AssessmentGuidelineId =
  (typeof ASSESSMENT_GUIDELINE_OPTIONS)[number]["id"];

export const ASSESSMENT_QUESTION_ICON =
  "/assets/recommend/practical-assessment.svg";

export const ASSESSMENT_QUESTION_OPTIONS = [
  {
    id: "practical-assessment",
    title: "Practical assessment",
    description:
      "To get verified score and become discoverable to top employers.",
    estimatedTime: "30–45 minutes",
    recommended: true,
  },
  {
    id: "portfolio-review",
    title: "Portfolio review",
    description:
      "Receive detailed feedback from industry experts to showcase your skills effectively.",
    estimatedTime: "1 hour",
    recommended: true,
  },
  {
    id: "skill-building-workshop",
    title: "Skill-building workshop",
    description:
      "Participate in hands-on sessions to improve key competencies relevant to your field.",
    estimatedTime: "2 hours",
    recommended: false,
  },
  {
    id: "skill-building-workshop-advanced",
    title: "Skill-building workshop",
    description:
      "Participate in hands-on sessions to improve key competencies relevant to your field.",
    estimatedTime: "2 hours",
    recommended: false,
  },
] as const;

export type AssessmentQuestionOptionId =
  (typeof ASSESSMENT_QUESTION_OPTIONS)[number]["id"];

export const DEFAULT_SELECTED_QUESTION_IDS: AssessmentQuestionOptionId[] = [
  "practical-assessment",
];
