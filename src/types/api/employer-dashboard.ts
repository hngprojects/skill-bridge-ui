/**
 * Internal shape the UI consumes. Mapped from the raw response in
 * `actions/employer-dashboard.ts` so the components stay decoupled from
 * whatever shape the backend currently emits.
 */
export type EmployerDashboardViewState = "new_user" | "existing_user";

export type EmployerProfilePrompt = {
  showPrompt: boolean;
  isVerified: boolean;
  completionPercentage: number;
  missingItems: string[];
};

/** Activity event types the backend ships on `recent_activity[i].type`. */
export type EmployerActivityType =
  | "verified_talent"
  | "shortlist"
  | "offer_accepted"
  | "role_created"
  | "assessment_completed";

export type EmployerRecentActivityItem = {
  id: string;
  type: EmployerActivityType;
  title: string;
  description: string;
  occurredAt: string;
};

export type EmployerDashboardHomeData = {
  viewState: EmployerDashboardViewState;
  companyName: string;
  profilePrompt: EmployerProfilePrompt | null;
  overviewCounts: Record<string, number>;
  recentActivity: EmployerRecentActivityItem[];
};

// ─── Raw backend response ─────────────────────────────────────────────────────

type RawProfilePrompt = {
  show_prompt: boolean;
  is_verified: boolean;
  completion_percentage: number;
  missing_items: string[];
};

type RawRecentActivityItem = {
  id: string;
  type: EmployerActivityType;
  title: string;
  description: string;
  occurred_at: string;
  link?: string;
};

export type RawEmployerDashboardHomeResponse = {
  company_name: string;
  view_state: string;
  new_user_state?: boolean;
  profile_prompt?: RawProfilePrompt;
  overview_counts?: Record<string, number>;
  recent_activity?: RawRecentActivityItem[];
  recent_roles?: unknown[];
};
