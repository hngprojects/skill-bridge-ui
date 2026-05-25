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

export type VerifiedProfileResponseData = {
  fullName: string;
  role: string;
  goal: string;
  about: string;
  aiSummary: string;
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
  shareUrl: string;
  qrCodeUrl: string;
  isOwner: boolean;
  verifiedAt: string;
  tier: string;
};
