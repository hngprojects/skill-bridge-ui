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
  validatedLevel: string;
  skillAssessmentPercentage: number;
};

export type VerifiedProfileSkillInfo = {
  label: string;
  value: number;
};

export type VerifiedProfileDetailedSkill = {
  title: string;
  skillInfo: VerifiedProfileSkillInfo[];
};

export type VerifiedProfileResponseData = {
  fullName: string;
  role: string;
  goal: string;
  about: string;
  aboutTags: string[];
  aiSummary: string;
  aiReport: string;
  avatarUrl: string | null;
  verified: boolean;
  status: string;
  seniorityBadge: string;
  skills: string[];
  tierLabel: string;
  scorePercentage: number;
  keyStrengths: VerifiedProfileKeyStrength[];
  professionalSkills: VerifiedProfileSkillItem[];
  skillProficiency: VerifiedProfileSkillProficiency;
  workplaceReadiness: VerifiedProfileMetric;
  practicalApplication: VerifiedProfileMetric;
  detailedSkills: VerifiedProfileDetailedSkill[];
  shareUrl: string;
  qrCodeUrl: string;
  isOwner: boolean;
  verifiedAt: string;
  tier: string;
};

export type RawVerifiedProfileSkillItem = {
  label: string;
  percentage: number;
};

export type RawVerifiedProfileKeyStrength = {
  competency: string;
  label: string;
  percentage: number;
};

export type RawVerifiedProfileMetric = {
  label: string;
  percentage: number;
};

export type RawVerifiedProfileSkillProficiency = {
  validated_level: string;
  skill_assessment_percentage: number;
};

export type RawVerifiedProfileSkillInfo = {
  label: string;
  value: number;
};

export type RawVerifiedProfileDetailedSkill = {
  title: string;
  skill_info: RawVerifiedProfileSkillInfo[];
};

export type RawVerifiedProfileResponseData = {
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
  key_strengths: RawVerifiedProfileKeyStrength[];
  professional_skills: RawVerifiedProfileSkillItem[];
  skill_proficiency: RawVerifiedProfileSkillProficiency;
  workplace_readiness: RawVerifiedProfileMetric;
  practical_application: RawVerifiedProfileMetric;
  detailed_skills: RawVerifiedProfileDetailedSkill[];
  share_url: string;
  qr_code_url: string;
  is_owner: boolean;
  verified_at: string;
  tier: string;
};
