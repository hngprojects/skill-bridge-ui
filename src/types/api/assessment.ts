import type { Question } from "../questionnaire";

// ─── Personal Assessment ──────────────────────────────────────────────────────

export type PersonalAssessmentSession = {
  sessionId: string;
  generatedAt: string;
  source: string;
  track: string;
  claimedLevel: string | null;
  questionCount: number;
  questions: Question[];
};

export type PersonalAssessmentStartResponseData = {
  status: string;
  session: PersonalAssessmentSession;
};

export type PersonalAssessmentSubmitInput = {
  answers: Record<string, string | string[]>;
};

export type PersonalAssessmentSubmitResponseData = {
  message?: string;
  completedAt?: string;
};

export type PersonalAssessmentSessionResponseData = {
  status: string;
  session: PersonalAssessmentSession | null;
  answers?: Record<string, string | string[]> | null;
};

// ─── Skill Assessment ─────────────────────────────────────────────────────────

export type SkillAssessmentQuestionType =
  | "single_pick"
  | "multi_pick"
  | "required_text";

/** Raw question shape returned by the skill assessment API. */
export type SkillAssessmentApiQuestion = {
  question_id: string;
  question_number: number;
  question_type: SkillAssessmentQuestionType;
  question_text: string;
  options: string[] | null;
};

export type SkillAssessmentStartResponseData = {
  status: string;
  session_id: string;
  verified_level: string;
  questions: SkillAssessmentApiQuestion[];
};

export type SkillAssessmentSubmitAnswer = {
  question_id: string;
  /** string for single_pick / required_text, string[] for multi_pick. */
  answer: string | string[];
  time_spent_seconds: number;
};

export type SkillAssessmentSubmitInput = {
  /** The submit endpoint still keys on attempt_id (start/session use session_id). */
  attempt_id: string;
  answers: SkillAssessmentSubmitAnswer[];
};

export type SkillLevel = "entry" | "junior" | "mid" | "senior" | "expert";

export type GuidanceRating = {
  label: string;
  rating: number;
  description: string;
};

export type GuidanceResource = {
  title: string;
  url: string;
  description: string;
  duration: string;
  type: string;
};

/** Structured guidance returned on a failed skill assessment (spec §4.4). */
export type GuidanceReport = {
  report_type: "emerging" | "job_ready";
  ai_summary: string;
  growth_insight: string;
  summary: string;
  strength_ratings: GuidanceRating[];
  weak_area_ratings: GuidanceRating[];
  recommended_resources: GuidanceResource[];
  resource_page_url: "/resources";
  /** Only present when report_type === "emerging". */
  retake_advice?: string;
};

export type SkillAssessmentSubmitResponseData = {
  status: "success";
  message: string;
  session_id: string;
  /** Raw score. */
  score: number;
  /** Max possible score. */
  total: number;
  /** 0–100. */
  percentage: number;
  validated_level: SkillLevel;
  claimed_level: SkillLevel;
  /** true if validated_level < claimed_level. */
  downgraded: boolean;
  /** true if percentage >= 75. */
  passed: boolean;
  /** Only present on failure. */
  guidance_report?: GuidanceReport;
  /** Only present when downgraded === true. */
  personalised_message?: string;
};

// ─── Advanced Assessment ──────────────────────────────────────────────────────

/** Question grouping / rendering block. */
export type AdvancedAssessmentQuestionBlock =
  | "mcq"
  | "short_text"
  | "long_text";

export type AdvancedAssessmentQuestionType =
  | "single_pick"
  | "multi_pick"
  | "required_text"
  | "optional_text";

export type AdvancedAssessmentSlotType =
  | "work_task"
  | "situational"
  | "reflection";

export type AdvancedAssessmentQuestionMetadata = {
  difficulty: "easy" | "medium" | "hard";
  estimated_time_seconds: number;
  tags: string[];
  competency?: string | null;
  lt3_reflection?: boolean;
};

/** Raw question shape returned by the advanced assessment API. */
export type AdvancedAssessmentApiQuestion = {
  question_id: string;
  question_number: number;
  block: AdvancedAssessmentQuestionBlock;
  question_type: AdvancedAssessmentQuestionType;
  question_text: string;
  options: string[] | null;
  slot_type: AdvancedAssessmentSlotType | null;
  metadata: AdvancedAssessmentQuestionMetadata | null;
  /** Always stripped server-side. */
  correct_answer: null;
};

export type AdvancedAssessmentStartResponseData = {
  status: string;
  message: string;
  session_id: string;
  started_at: string;
  expires_at: string;
  completed_at: string | null;
  is_expired: boolean;
  /** Server-computed — use for the countdown timer. */
  remaining_seconds: number;
  verified_level: string;
  question_count: number;
  questions: AdvancedAssessmentApiQuestion[];
};

/** Resume returns the same shape as the advanced start response. */
export type AssessmentSessionResponseData = AdvancedAssessmentStartResponseData;

export type AdvancedAssessmentSubmitAnswer = {
  question_id: string;
  answer: string | string[];
  time_spent_seconds?: number;
};

export type AdvancedAssessmentSubmitInput = {
  session_id: string;
  answers: AdvancedAssessmentSubmitAnswer[];
};

export type AssessmentTier = "job_ready" | "emerging" | "not_ready";

export type AssessmentIntegrityConfidence = "high" | "medium" | "low";

export type AdvancedAssessmentSubmitResponseData = {
  status: string;
  message: string;
  session_id: string;
  /** Raw score. */
  score: number;
  /** Max possible score. */
  max_score: number;
  /** 0–100. */
  percentage: number;
  tier: AssessmentTier;
  integrity_confidence: AssessmentIntegrityConfidence;
  /** Structured guidance — present on a non-passing result. */
  guidance_report?: GuidanceReport;
  /** Present only when the session had expired and was auto-submitted. */
  auto_submitted?: true;
};

export type AssessmentFlagEventType = "tab_switch" | "copy_paste";

export type AssessmentFlagInput = {
  eventType: AssessmentFlagEventType;
};

export type AssessmentFlagResponseData = {
  message?: string;
  sessionVoided?: boolean;
};
