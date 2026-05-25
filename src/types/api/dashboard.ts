import type {
  AssessmentIntegrityConfidence,
  AssessmentTier,
  GuidanceReport,
  SkillLevel,
} from "./assessment";

export type DashboardJourneyStatus = "available" | "completed" | "locked";

export type DashboardJourneyKey =
  | "onboarding"
  | "personal"
  | "skill"
  | "advanced";

export type DashboardJourneyOverviewItem = {
  key: DashboardJourneyKey | string;
  title: string;
  status: DashboardJourneyStatus;
};

export type DashboardPerformanceSkill = {
  score: number;
  maxScore: number;
  percentage: number;
  validatedLevel: SkillLevel;
  passed: boolean;
  /** Mirror of `!passed`, sent by the API. */
  failed?: boolean;
  /** ISO timestamp. */
  completedAt: string;
  /** May be empty `{}` until AI grading produces a report. */
  guidanceReport: Partial<GuidanceReport>;
  /** Number of skill attempts the user has consumed. */
  attemptsUsed?: number;
  /** Number of attempts still available on the skill assessment. */
  attemptsRemaining?: number;
};

export type DashboardAdvancedRetake = {
  /** ISO timestamp the probation period started. */
  probationStartDate?: string;
  /** ISO timestamp the probation period ends. */
  probationEndDate?: string;
  /** ISO timestamp at which the user becomes eligible to retake. */
  eligibilityDate: string;
  ctaEnabled: boolean;
  countdownSeconds: number;
  daysRemaining: number;
};

export type DashboardPerformanceAdvanced = {
  score: number;
  maxScore: number;
  percentage: number;
  tier: AssessmentTier;
  /** Display label for `tier`, e.g. "Job Ready". */
  tierLabel: string;
  integrityConfidence: AssessmentIntegrityConfidence;
  /** ISO timestamp. */
  completedAt: string;
  /** May be empty `{}` until AI grading produces a report. */
  guidanceReport: Partial<GuidanceReport>;
  retake: DashboardAdvancedRetake;
};

export type DashboardPerformance = {
  skill?: DashboardPerformanceSkill;
  advanced?: DashboardPerformanceAdvanced;
};

export type DashboardHomeResponseData = {
  firstName: string;
  avatarUrl?: string;
  goal?: string;
  profileCompletionPercentage: number;
  journeyOverview: DashboardJourneyOverviewItem[];
  /** Present once the user has at least started skill or advanced. */
  performance?: DashboardPerformance;
  /** Top-level retake hint mirroring `performance.advanced.retake`. */
  advancedRetake?: DashboardAdvancedRetake;
  /** Top-level mirror of `performance.skill.attemptsUsed` — present even
   *  when `performance.skill` is null. */
  skillAttemptsUsed?: number;
  /** Total skill attempts allowed for this user (e.g. 3). */
  skillMaxAttempts?: number;
};
