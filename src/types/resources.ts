type ResourceArticle = {
  url: string;
  title: string;
  description: string;
  duration: string;
};

type ResourceVideo = {
  url: string;
  title: string;
  duration: string;
};

type ResourceArticleSection = {
  id: string;
  title: string;
  type: "article";
  items: ResourceArticle[];
};

type ResourceVideoSection = {
  id: string;
  title: string;
  type: "video";
  items: ResourceVideo[];
};

type ResourceSection = ResourceArticleSection | ResourceVideoSection;

type RecommendedResource = {
  title: string;
  provider: string;
  url: string;
  tier: string;
  competency: string;
  reason: string;
};

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
  skill_guidance_report: GuidanceReport;
  advanced_guidance_report: GuidanceReport;
};

type Rating = { item: string; rating: number };

export type {
  ResourceSection,
  ResourceArticle,
  ResourceVideo,
  GuidanceReport,
  RecommendedResource,
  AIReportResponse,
};
