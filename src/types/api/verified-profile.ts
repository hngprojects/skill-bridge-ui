export type VerifiedProfileSkillItem = {
  label: string;
  percentage: number;
};

export type VerifiedProfileKeyStrength = {
  competency: string;
  label: string;
  percentage: number;
};

export type VerifiedProfileMetric = {
  label: string;
  percentage: number;
};

export type VerifiedProfileSkillProficiency = {
  validated_level: string;
  skill_assessment_percentage: number;
};

export type VerifiedProfileAssessmentInsight = {
  label: string;
  insight: string;
};

export type VerifiedProfileAssessmentInsights = {
  skill_proficiency: VerifiedProfileAssessmentInsight;
  workplace_readiness: VerifiedProfileAssessmentInsight;
  practical_application: VerifiedProfileAssessmentInsight;
};

export type VerifiedProfileSkillBreakdownItem = {
  id?: string;
  label: string;
  percentage: number;
  insight?: string;
  validated_level?: string;
  competency?: string;
};

export type VerifiedProfileSkillBreakdownTab = {
  id: string;
  label: string;
  items: VerifiedProfileSkillBreakdownItem[];
};

export type VerifiedProfileRecommendedResource = {
  title: string;
  provider: string;
  url: string;
  tier: string;
  competency: string;
  reason: string;
};

export type VerifiedProfileSkillInfo = {
  label: string;
  value: number;
  insight?: string;
};

export type VerifiedProfileDetailedSkill = {
  title: string;
  skill_info: VerifiedProfileSkillInfo[];
};

export type VerifiedProfileResponseData = {
  full_name: string;
  role: string;
  goal: string;
  about: string;
  about_tags: string[];
  ai_summary?: string;
  ai_report: string;
  avatar_url: string | null;
  verified: boolean;
  status: string;
  seniority_badge: string;
  skills: string[];
  tier_label: string;
  score_percentage: number;
  key_strengths: VerifiedProfileKeyStrength[];
  professional_skills: VerifiedProfileSkillItem[];
  working_style?: string[];
  growth_insight?: string;
  skill_proficiency: VerifiedProfileSkillProficiency;
  workplace_readiness: VerifiedProfileMetric;
  practical_application: VerifiedProfileMetric;
  assessment_insights?: VerifiedProfileAssessmentInsights;
  skill_breakdown_tabs?: VerifiedProfileSkillBreakdownTab[];
  recommended_resources?: VerifiedProfileRecommendedResource[];
  resource_page_url?: string;
  resume_url?: string | null;
  /** @deprecated Prefer skill_breakdown_tabs */
  detailed_skills?: VerifiedProfileDetailedSkill[];
  share_url: string;
  qr_code_url: string;
  is_owner: boolean;
  verified_at: string;
  tier: string;
};
