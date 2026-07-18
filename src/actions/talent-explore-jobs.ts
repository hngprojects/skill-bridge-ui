import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  ExploreJobRole,
  ExploreJobsListData,
  RawExploreJobRole,
  RawExploreJobsListResponse,
  RawWeeklyCapStatus,
  WeeklyCapStatus,
} from "@/types/api/talent-explore-jobs";
import { unwrapData } from "./utils";

function mapExploreJobRole(raw: RawExploreJobRole): ExploreJobRole {
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category,
    employerName: raw.employer_name,
    employerLogoUrl: raw.employer_logo_url,
    companyUrl: raw.company_url,
    employmentType: raw.employment_type,
    workArrangement: raw.work_arrangement,
    description: raw.description,
    keywords: raw.keywords ?? [],
    isFull: raw.is_full,
    alreadyInterested: raw.already_interested,
    createdAt: raw.created_at,
  };
}

export async function getExploreJobs(params?: {
  page?: number;
  limit?: number;
}): Promise<ExploreJobsListData> {
  const res = await authApi.get<ApiEnvelope<RawExploreJobsListResponse>>(
    "/talent/explore-jobs",
    { params },
  );
  const data = unwrapData(res);
  return {
    roles: (data.roles ?? []).map(mapExploreJobRole),
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 20,
    totalPages: data.total_pages ?? 1,
  };
}

export async function expressInterest(roleId: string): Promise<void> {
  await authApi.post(`/talent/explore-jobs/${roleId}/interested`);
}

export async function getWeeklyCapStatus(): Promise<WeeklyCapStatus> {
  const res = await authApi.get<ApiEnvelope<RawWeeklyCapStatus>>(
    "/talent/explore-jobs/weekly-cap",
  );
  const data = unwrapData(res);
  return {
    weeklyLimit: data.weekly_limit,
    usedThisWeek: data.used_this_week,
    weeklyRemaining: data.weekly_remaining,
    resetsAt: data.resets_at,
  };
}
