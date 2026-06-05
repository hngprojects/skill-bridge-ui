/**
 * Internal shape the UI consumes. Mapped from the bloated raw response in
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

export type EmployerRecentActivityItem = {
  /** Stable React key. Derived FE-side because the backend payload omits it. */
  id: string;
  type: string;
  title: string;
  description: string;
  occurredAt: string;
};

export type EmployerDashboardHomeData = {
  viewState: EmployerDashboardViewState;
  companyName: string;
  profilePrompt: EmployerProfilePrompt | null;
  /** Count keyed by the backend's `overview_cards[].key`. Joined with
   *  client-side metadata to render the stat cards. */
  overviewCounts: Record<string, number>;
  recentActivity: EmployerRecentActivityItem[];
};

// ─── Raw backend response ─────────────────────────────────────────────────────

type RawProfilePrompt = {
  show_prompt: boolean;
  is_verified: boolean;
  completion_percentage: number;
  title?: string;
  description?: string;
  cta_label?: string;
  cta_route?: string;
  missing_items: string[];
};

type RawOverviewCard = {
  key: string;
  title?: string;
  value: number;
  description?: string;
  cta_label?: string;
  cta_route?: string;
};

type RawRecentActivityItem = {
  type: string;
  title: string;
  description: string;
  occurred_at: string;
  route?: string;
};

export type RawEmployerDashboardHomeResponse = {
  company_name: string;
  view_state: string;
  header?: string;
  subheader?: string;
  profile_prompt?: RawProfilePrompt;
  create_role_cta?: { label: string; route: string; variant?: string };
  overview_cards?: RawOverviewCard[];
  recent_activity?: RawRecentActivityItem[];
  hero?: unknown;
  capabilities?: unknown;
  social_proof?: unknown;
  roles_empty_state_message?: string;
};
