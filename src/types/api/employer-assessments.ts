export type EmployerAssessmentStatus = "active" | "inactive";

export type EmployerAssessmentQuestionInput = {
  questionText: string;
  questionType: "single_pick" | "multi_pick" | "required_text";
  options?: string[];
  correctAnswer?: string | string[];
  points?: number;
};

export type CreateEmployerAssessmentInput = {
  title: string;
  roleTrack: string;
  experienceLevel: "junior" | "mid" | "senior";
  timeLimitMinutes: 20 | 30 | 40 | 60;
  passingThreshold: number;
  questionSource:
    | "credlane_bank"
    | "company_questions"
    | "manual"
    | "admin_upload";
  shareViaLink: boolean;
  sendToCandidates: boolean;
  type: "internal" | "external";
  questions?: EmployerAssessmentQuestionInput[];
};

export type InviteToAssessmentInput = {
  assessmentId: string;
  talentIds?: string[];
  emails?: string[];
};

export type EmployerAssessmentQuestion = {
  id: string;
  questionText: string;
  questionType: "single_pick" | "multi_pick" | "required_text";
  options: string[] | null;
  points: number;
};

export type RawEmployerAssessment = {
  id: string;
  employer_user_id: string;
  title: string;
  role_track: string;
  experience_level: string;
  time_limit_minutes: number;
  passing_threshold: number;
  question_source: string;
  share_via_link: boolean;
  send_to_candidates: boolean;
  status: EmployerAssessmentStatus;
  type: "internal" | "external";
  token: string | null;
  questions?: EmployerAssessmentQuestion[];
  submissions_count?: number;
  created_at: string;
  updated_at: string;
};

export type EmployerAssessmentItem = {
  id: string;
  title: string;
  roleTrack: string;
  experienceLevel: string;
  timeLimitMinutes: number;
  passingThreshold: number;
  status: EmployerAssessmentStatus;
  type: "internal" | "external";
  token: string | null;
  questionsCount: number;
  submissionsCount: number;
  createdAt: string;
};

export type ListEmployerAssessmentsResponse = {
  assessments: RawEmployerAssessment[];
  total: number;
  page: number;
  limit: number;
};

export type AssessmentResultItem = {
  candidateId: string;
  candidateName: string;
  score: number;
  passed: boolean;
  submittedAt: string;
};

export type ListEmployerAssessmentResultsResponse = {
  results: AssessmentResultItem[];
  total: number;
};
