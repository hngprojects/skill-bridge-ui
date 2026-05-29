type RecommendedResource = {
  title: string;
  provider: string;
  url: string;
  tier: string;
  competency: string;
  reason: string;
};

type Rating = { item: string; rating: number };

type GuidanceReport = {
  score: number;
  percentile: number;
  attempt_date: Record<string, string>;
  report_type: string;
  ai_summary: string;
  summary: string;
  retake_advice: string;
  growth_insight: string;
  strength_ratings: Rating[];
  resource_page_url: string;
  weak_area_ratings: Rating[];
  recommended_resources: RecommendedResource[];
};

type AIReportResponse = {
  skill_guidance_report: GuidanceReport | null;
  advanced_guidance_report: GuidanceReport | null;
};

export type { GuidanceReport, RecommendedResource, AIReportResponse, Rating };
