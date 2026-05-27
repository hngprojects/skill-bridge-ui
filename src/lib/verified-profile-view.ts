import type {
  VerifiedProfileDetailedSkill,
  VerifiedProfileResponseData,
} from "@/types/api";

export type VerifiedProfileViewModel = {
  name: string;
  role: string;
  goal: string;
  about: string[];
  skills: string[];
  aiReport: string;
  scorePercentage: number;
  tierLabel: string;
  avatarUrl: string | null;
  detailedSkills: VerifiedProfileDetailedSkill[];
};

function buildAboutTags(data: VerifiedProfileResponseData): string[] {
  if (data.aboutTags.length > 0) {
    return data.aboutTags;
  }
  if (data.about.trim()) {
    return [data.about.trim()];
  }
  return [];
}

export function toVerifiedProfileViewModel(
  data: VerifiedProfileResponseData,
): VerifiedProfileViewModel {
  return {
    name: data.fullName,
    role: data.role,
    goal: data.goal,
    about: buildAboutTags(data),
    skills: data.skills,
    aiReport: data.aiReport || data.aiSummary,
    scorePercentage: data.scorePercentage,
    tierLabel: data.tierLabel,
    avatarUrl: data.avatarUrl,
    detailedSkills: data.detailedSkills,
  };
}
