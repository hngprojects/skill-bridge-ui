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

/** @deprecated Legacy interim shape; use skill_breakdown_tabs */
export type VerifiedProfileAssessmentInsight = {
  label: string;
  insight: string;
};

/** @deprecated Legacy interim shape; use skill_breakdown_tabs */
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
  tier: string;
  tier_label: string;
  score_percentage: number;
  skills: string[];
  working_style?: string[];
  growth_insight?: string;
  skill_breakdown_tabs: VerifiedProfileSkillBreakdownTab[];
  recommended_resources?: VerifiedProfileRecommendedResource[];
  resource_page_url?: string;
  resume_url?: string | null;
  share_url: string;
  qr_code_url: string;
  is_owner: boolean;
  verified_at: string;
  /** @deprecated Legacy fields — may be absent on newer API versions */
  key_strengths?: VerifiedProfileKeyStrength[];
  professional_skills?: VerifiedProfileSkillItem[];
  skill_proficiency?: VerifiedProfileSkillProficiency;
  workplace_readiness?: VerifiedProfileMetric;
  practical_application?: VerifiedProfileMetric;
  assessment_insights?: VerifiedProfileAssessmentInsights;
  detailed_skills?: VerifiedProfileDetailedSkill[];
};
