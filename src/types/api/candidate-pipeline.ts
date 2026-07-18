export type PipelineCandidateStatus =
  | "matched"
  | "interested"
  | "assessment_sent"
  | "assessment_completed_pass"
  | "assessment_completed_fail"
  | "interview_invited"
  | "interview_accepted"
  | "interview_declined";

export type PipelineAssessmentStatus = "not_sent" | "sent" | "completed";
export type PipelineAssessmentResult = "pass" | "fail" | null;
export type PipelineOfferStatus = "none" | "invited" | "accepted" | "declined";

export type PipelineCandidate = {
  candidateId: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
  roleTrack: string;
  seniorityBadge: string;
  matchScore: number;
  isInterested: boolean;
  interestedAt: string | null;
  pipelineStatus: PipelineCandidateStatus;
  assessmentStatus: PipelineAssessmentStatus;
  assessmentResult: PipelineAssessmentResult;
  offerStatus: PipelineOfferStatus;
  interviewLink: string | null;
  updatedAt: string;
};

export type PipelineRoleSummary = {
  id: string;
  title: string;
  isFull: boolean;
};

export type PipelineCounts = {
  bestMatch: number;
  other: number;
  interested: number;
  total: number;
};

export type CandidatePipelineListData = {
  role: PipelineRoleSummary;
  candidates: PipelineCandidate[];
  counts: PipelineCounts;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type RawPipelineCandidate = {
  candidate_id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  role_track: string;
  seniority_badge: string;
  match_score: number;
  is_interested: boolean;
  interested_at: string | null;
  pipeline_status: PipelineCandidateStatus;
  assessment_status: PipelineAssessmentStatus;
  assessment_result: PipelineAssessmentResult;
  offer_status: PipelineOfferStatus;
  interview_link: string | null;
  updated_at: string;
};

export type RawCandidatePipelineListResponse = {
  role: {
    id: string;
    title: string;
    is_full: boolean;
  };
  candidates: RawPipelineCandidate[];
  counts: {
    best_match: number;
    other: number;
    interested: number;
    total: number;
  };
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};
