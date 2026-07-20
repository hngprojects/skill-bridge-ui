export type ExternalApplicant = {
  id: string;
  email: string;
  consentedMarketing: boolean;
  consentedMarketingAt: string | null;
  assessmentId: string;
};

export type ExternalAssessmentSubmission = {
  id: string;
  assessmentId: string;
  candidateType: "external";
  email: string;
  score: number | null;
  passFail: boolean | null;
  submittedAt: string;
};
