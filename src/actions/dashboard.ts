import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  DashboardAdvancedRetake,
  DashboardHomeResponseData,
  DashboardPerformanceAdvanced,
  DashboardPerformanceSkill,
  RawDashboardAdvancedRetake,
  RawDashboardHomeResponseData,
  RawDashboardPerformanceAdvanced,
  RawDashboardPerformanceSkill,
} from "@/types/api";

import { unwrapData } from "./utils";

function mapRetake(
  retake: RawDashboardAdvancedRetake | undefined,
): DashboardAdvancedRetake | undefined {
  if (!retake) return undefined;

  return {
    probationStartDate: retake.probation_start_date,
    probationEndDate: retake.probation_end_date,
    eligibilityDate: retake.eligibility_date,
    ctaEnabled: retake.cta_enabled,
    countdownSeconds: retake.countdown_seconds,
    daysRemaining: retake.days_remaining,
  };
}

function mapSkillPerformance(
  skill: RawDashboardPerformanceSkill | undefined,
): DashboardPerformanceSkill | undefined {
  if (!skill) return undefined;

  return {
    score: skill.score,
    maxScore: skill.max_score,
    percentage: skill.percentage,
    validatedLevel: skill.validated_level,
    passed: skill.passed,
    failed: skill.failed,
    completedAt: skill.completed_at,
    guidanceReport: skill.guidance_report,
    attemptsUsed: skill.attempts_used,
    attemptsRemaining: skill.attempts_remaining,
  };
}

function mapAdvancedPerformance(
  advanced: RawDashboardPerformanceAdvanced | undefined,
): DashboardPerformanceAdvanced | undefined {
  if (!advanced) return undefined;

  return {
    score: advanced.score,
    maxScore: advanced.max_score,
    percentage: advanced.percentage,
    tier: advanced.tier,
    tierLabel: advanced.tier_label,
    integrityConfidence: advanced.integrity_confidence,
    completedAt: advanced.completed_at,
    guidanceReport: advanced.guidance_report,
    retake: mapRetake(advanced.retake),
  };
}

function mapDashboardHome(
  data: RawDashboardHomeResponseData,
): DashboardHomeResponseData {
  const mappedSkill = data.performance?.skill
    ? mapSkillPerformance(data.performance.skill)
    : undefined;
  const mappedAdvanced = data.performance?.advanced
    ? mapAdvancedPerformance(data.performance.advanced)
    : undefined;
  const performance =
    data.performance && (mappedSkill || mappedAdvanced)
      ? {
          skill: mappedSkill,
          advanced: mappedAdvanced,
        }
      : undefined;

  return {
    firstName: data.first_name,
    avatarUrl: data.avatar_url,
    goal: data.goal,
    profileCompletionPercentage: data.profile_completion_percentage,
    journeyOverview: data.journey_overview ?? [],
    performance,
    advancedRetake: mapRetake(data.advanced_retake),
    skillAttemptsUsed: data.skill_attempts_used,
    skillMaxAttempts: data.skill_max_attempts,
  };
}

export async function getDashboardHome(): Promise<DashboardHomeResponseData> {
  const res =
    await authApi.get<ApiEnvelope<RawDashboardHomeResponseData>>(
      "/dashboard/home",
    );
  return mapDashboardHome(unwrapData(res));
}
