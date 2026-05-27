import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  RawVerifiedProfileDetailedSkill,
  RawVerifiedProfileKeyStrength,
  RawVerifiedProfileResponseData,
  RawVerifiedProfileSkillItem,
  RawVerifiedProfileSkillProficiency,
  VerifiedProfileDetailedSkill,
  VerifiedProfileKeyStrength,
  VerifiedProfileResponseData,
  VerifiedProfileSkillItem,
  VerifiedProfileSkillProficiency,
} from "@/types/api";

import { unwrapData } from "./utils";

function mapSkillItem(
  item: RawVerifiedProfileSkillItem,
): VerifiedProfileSkillItem {
  return {
    label: item.label,
    percentage: item.percentage,
  };
}

function mapKeyStrength(
  item: RawVerifiedProfileKeyStrength,
): VerifiedProfileKeyStrength {
  return {
    competency: item.competency,
    label: item.label,
    percentage: item.percentage,
  };
}

function mapSkillProficiency(
  proficiency: RawVerifiedProfileSkillProficiency,
): VerifiedProfileSkillProficiency {
  return {
    validatedLevel: proficiency.validated_level,
    skillAssessmentPercentage: proficiency.skill_assessment_percentage,
  };
}

function mapDetailedSkill(
  section: RawVerifiedProfileDetailedSkill,
): VerifiedProfileDetailedSkill {
  return {
    title: section.title,
    skillInfo: section.skill_info.map((item) => ({
      label: item.label,
      value: item.value,
    })),
  };
}

function mapVerifiedProfile(
  data: RawVerifiedProfileResponseData,
): VerifiedProfileResponseData {
  return {
    fullName: data.full_name,
    role: data.role,
    goal: data.goal,
    about: data.about,
    aboutTags: data.about_tags ?? [],
    aiSummary: data.ai_summary,
    aiReport: data.ai_report,
    avatarUrl: data.avatar_url,
    verified: data.verified,
    status: data.status,
    seniorityBadge: data.seniority_badge,
    skills: data.skills ?? [],
    tierLabel: data.tier_label,
    scorePercentage: data.score_percentage,
    keyStrengths: (data.key_strengths ?? []).map(mapKeyStrength),
    professionalSkills: (data.professional_skills ?? []).map(mapSkillItem),
    skillProficiency: data.skill_proficiency
      ? mapSkillProficiency(data.skill_proficiency)
      : { validatedLevel: "", skillAssessmentPercentage: 0 },
    workplaceReadiness: {
      label: data.workplace_readiness?.label ?? "Workplace Readiness",
      percentage: data.workplace_readiness?.percentage ?? 0,
    },
    practicalApplication: {
      label: data.practical_application?.label ?? "Practical Application",
      percentage: data.practical_application?.percentage ?? 0,
    },
    detailedSkills: (data.detailed_skills ?? []).map(mapDetailedSkill),
    shareUrl: data.share_url,
    qrCodeUrl: data.qr_code_url,
    isOwner: data.is_owner,
    verifiedAt: data.verified_at,
    tier: data.tier,
  };
}

export async function getVerifiedProfile(): Promise<VerifiedProfileResponseData> {
  const res = await authApi.get<ApiEnvelope<RawVerifiedProfileResponseData>>(
    "/talent/verified-profile",
  );
  return mapVerifiedProfile(unwrapData(res));
}
