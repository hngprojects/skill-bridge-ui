export type ExploreJobRole = {
  id: string;
  title: string;
  category: string;
  employerName: string;
  employerLogoUrl: string | null;
  companyUrl: string | null;
  employmentType: string | null;
  workArrangement: string | null;
  description: string | null;
  keywords: string[];
  isFull: boolean;
  alreadyInterested: boolean;
  createdAt: string;
};

export type ExploreJobsListData = {
  roles: ExploreJobRole[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type WeeklyCapStatus = {
  weeklyLimit: number;
  usedThisWeek: number;
  weeklyRemaining: number;
  resetsAt: string;
};

export type RawExploreJobRole = {
  id: string;
  title: string;
  category: string;
  employer_name: string;
  employer_logo_url: string | null;
  company_url: string | null;
  employment_type: string | null;
  work_arrangement: string | null;
  description: string | null;
  keywords: string[] | null;
  is_full: boolean;
  already_interested: boolean;
  created_at: string;
};

export type RawExploreJobsListResponse = {
  roles: RawExploreJobRole[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type RawWeeklyCapStatus = {
  weekly_limit: number;
  used_this_week: number;
  weekly_remaining: number;
  resets_at: string;
};
