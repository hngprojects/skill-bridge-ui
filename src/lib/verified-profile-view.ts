import type { VerifiedProfileResponseData } from "@/types/api";

// const UUID_RE =
//   /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type VerifiedProfileDetailedSkill = {
  title: string;
  skillInfo: { label: string; value: number }[];
};

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

// function formatSkillLabel(label: string, index: number): string {
//   const trimmed = label.trim();
//   if (UUID_RE.test(trimmed)) {
//     return `Competency ${index + 1}`;
//   }
//   return trimmed;
// }

function capitalizeWord(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildAboutChips(data: VerifiedProfileResponseData): string[] {
  if (data.about.trim()) {
    return [data.about.trim()];
  }

  const chips: string[] = [];
  if (data.seniorityBadge) chips.push(data.seniorityBadge);
  if (data.tierLabel) chips.push(data.tierLabel);
  if (data.skillProficiency?.validatedLevel) {
    chips.push(`${capitalizeWord(data.skillProficiency.validatedLevel)} level`);
  }
  if (data.verified) chips.push("Verified");
  return chips.length > 0 ? chips : ["Verified talent"];
}

function buildDetailedSkills(
  data: VerifiedProfileResponseData,
): VerifiedProfileDetailedSkill[] {
  const sections: VerifiedProfileDetailedSkill[] = [
    {
      title: "Professional Skills",
      skillInfo: [
        {
          label: "Skill Proficiency",
          value: data.skillProficiency?.skillAssessmentPercentage ?? 0,
        },
        {
          label: data.workplaceReadiness?.label ?? "Workplace Readiness",
          value: data.workplaceReadiness?.percentage ?? 0,
        },
        {
          label: data.practicalApplication?.label ?? "Practical Application",
          value: data.practicalApplication?.percentage ?? 0,
        },
      ],
    },
  ];

  // if (data.keyStrengths?.length) {
  //   sections.push({
  //     title: "Strengths",
  //     skillInfo: data.keyStrengths.map((item, index) => ({
  //       label: formatSkillLabel(item.label, index),
  //       value: item.percentage,
  //     })),
  //   });
  // }

  // const ratedProfessional = (data.professionalSkills ?? []).filter(
  //   (item) => item.percentage > 0,
  // );
  // if (ratedProfessional.length) {
  //   sections.push({
  //     title: "Competencies",
  //     skillInfo: ratedProfessional.map((item, index) => ({
  //       label: formatSkillLabel(item.label, index),
  //       value: item.percentage,
  //     })),
  //   });
  // }

  return sections;
}

export function toVerifiedProfileViewModel(
  data: VerifiedProfileResponseData,
): VerifiedProfileViewModel {
  return {
    name: data.fullName,
    role: data.role,
    goal: data.goal,
    about: buildAboutChips(data),
    skills: data.skills ?? [],
    aiReport: data.aiSummary,
    scorePercentage: data.scorePercentage,
    tierLabel: data.tierLabel,
    avatarUrl: data.avatarUrl,
    detailedSkills: buildDetailedSkills(data),
  };
}
