export type DashboardJourneyStatus = "available" | "completed" | "locked";

export type DashboardJourneyKey =
  | "onboarding"
  | "personal"
  | "skill"
  | "advanced";

export type DashboardJourneyOverviewItem = {
  key: DashboardJourneyKey | string;
  title: string;
  status: DashboardJourneyStatus;
};

export type DashboardHomeResponseData = {
  firstName: string;
  profileCompletionPercentage: number;
  journeyOverview: DashboardJourneyOverviewItem[];
};
