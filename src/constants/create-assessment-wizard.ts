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
    title: "Choose questions",
    description: "Select questions from the bank for this assessment.",
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
