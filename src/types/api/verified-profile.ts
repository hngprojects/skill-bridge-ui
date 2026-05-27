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

export type VerifiedProfileSkillInfo = {
  label: string;
  value: number;
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
  ai_summary: string;
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
  skill_proficiency: VerifiedProfileSkillProficiency;
  workplace_readiness: VerifiedProfileMetric;
  practical_application: VerifiedProfileMetric;
  detailed_skills: VerifiedProfileDetailedSkill[];
  share_url: string;
  qr_code_url: string;
  is_owner: boolean;
  verified_at: string;
  tier: string;
};
