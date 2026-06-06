import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  EmployerDashboardHomeData,
  EmployerDashboardViewState,
  EmployerProfilePrompt,
  EmployerRecentActivityItem,
  RawEmployerDashboardHomeResponse,
} from "@/types/api/employer-dashboard";

import { unwrapData } from "./utils";

function normalizeViewState(value: string): EmployerDashboardViewState {
  return value === "new_user" ? "new_user" : "existing_user";
}

function mapProfilePrompt(
  raw: RawEmployerDashboardHomeResponse["profile_prompt"],
): EmployerProfilePrompt | null {
  if (!raw) return null;
  return {
    showPrompt: raw.show_prompt,
    isVerified: raw.is_verified,
    completionPercentage: raw.completion_percentage,
    missingItems: raw.missing_items ?? [],
  };
}

function mapRecentActivity(
  raw: RawEmployerDashboardHomeResponse["recent_activity"],
): EmployerRecentActivityItem[] {
  if (!raw) return [];
  return raw.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    occurredAt: item.occurred_at,
  }));
}

export async function getEmployerDashboardHome(): Promise<EmployerDashboardHomeData> {
  const res = await authApi.get<ApiEnvelope<RawEmployerDashboardHomeResponse>>(
    "/dashboard/employer/home",
  );
  const raw = unwrapData(res);
  return {
    viewState: normalizeViewState(raw.view_state),
    companyName: raw.company_name ?? "",
    profilePrompt: mapProfilePrompt(raw.profile_prompt),
    overviewCounts: raw.overview_counts ?? {},
    recentActivity: mapRecentActivity(raw.recent_activity),
  };
}
