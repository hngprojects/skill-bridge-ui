import type {
  VerifiedProfileAssessmentInsights,
  VerifiedProfileDetailedSkill,
  VerifiedProfileResponseData,
  VerifiedProfileSkillBreakdownTab,
} from "@/types/api";

const ASSESSMENT_INSIGHT_KEYS = [
  "skill_proficiency",
  "workplace_readiness",
  "practical_application",
] as const satisfies ReadonlyArray<keyof VerifiedProfileAssessmentInsights>;

function tabToDetailedSkill(
  tab: VerifiedProfileSkillBreakdownTab,
): VerifiedProfileDetailedSkill {
  return {
    title: tab.label,
    skill_info: tab.items.map((item) => ({
      label: item.label,
      value: item.percentage,
      insight: item.insight,
    })),
  };
}

function getAssessmentInsightPercentage(
  data: VerifiedProfileResponseData,
  key: keyof VerifiedProfileAssessmentInsights,
): number {
  switch (key) {
    case "skill_proficiency":
      return data.skill_proficiency.skill_assessment_percentage;
    case "workplace_readiness":
      return data.workplace_readiness.percentage;
    case "practical_application":
      return data.practical_application.percentage;
  }
}

function buildAssessmentScoresTab(
  data: VerifiedProfileResponseData,
): VerifiedProfileDetailedSkill | null {
  const insights = data.assessment_insights;

  if (insights) {
    const skill_info = ASSESSMENT_INSIGHT_KEYS.flatMap((key) => {
      const insight = insights[key];
      if (!insight) return [];

      return [
        {
          label: insight.label,
          value: getAssessmentInsightPercentage(data, key),
          insight: insight.insight,
        },
      ];
    });

    if (skill_info.length === 0) return null;

    return { title: "Assessment Scores", skill_info };
  }

  const skill_info = [
    {
      label: "Skill Proficiency",
      value: data.skill_proficiency.skill_assessment_percentage,
    },
    {
      label: data.workplace_readiness.label,
      value: data.workplace_readiness.percentage,
    },
    {
      label: data.practical_application.label,
      value: data.practical_application.percentage,
    },
  ];

  return { title: "Assessment Scores", skill_info };
}

function buildProfessionalSkillsTab(
  data: VerifiedProfileResponseData,
): VerifiedProfileDetailedSkill | null {
  if (!data.professional_skills.length) return null;

  return {
    title: "Professional Skills",
    skill_info: data.professional_skills.map((item) => ({
      label: item.label,
      value: item.percentage,
    })),
  };
}

function buildStrengthsTab(
  data: VerifiedProfileResponseData,
): VerifiedProfileDetailedSkill | null {
  if (!data.key_strengths.length) return null;

  return {
    title: "Strengths",
    skill_info: data.key_strengths.map((item) => ({
      label: item.label,
      value: item.percentage,
    })),
  };
}

function buildTabsFromLegacyFields(
  data: VerifiedProfileResponseData,
): VerifiedProfileDetailedSkill[] {
  return [
    buildAssessmentScoresTab(data),
    buildProfessionalSkillsTab(data),
    buildStrengthsTab(data),
  ].filter((tab): tab is VerifiedProfileDetailedSkill => tab !== null);
}

/** Maps API data to tabbed skill breakdown for SkillsDisplay. */
export function getSkillBreakdownTabs(
  data: VerifiedProfileResponseData,
): VerifiedProfileDetailedSkill[] {
  if (data.skill_breakdown_tabs?.length) {
    return data.skill_breakdown_tabs
      .map(tabToDetailedSkill)
      .filter((tab) => tab.skill_info.length > 0);
  }

  if (data.detailed_skills?.length) {
    return data.detailed_skills;
  }

  return buildTabsFromLegacyFields(data);
}

export function getAboutTags(data: VerifiedProfileResponseData): string[] {
  if (data.about_tags.length > 0) return data.about_tags;
  if (data.about.trim()) return [data.about.trim()];
  return [];
}

export function getAiReport(data: VerifiedProfileResponseData): string {
  return data.ai_report || data.ai_summary || "";
}
