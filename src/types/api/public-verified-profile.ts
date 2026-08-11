import type { VerifiedProfileSkillBreakdownTab } from "./verified-profile";

/**
 * The public, unauthenticated "share this profile" payload — deliberately a
 * TRIMMED subset of `VerifiedProfileResponseData`. No email, no resume URL,
 * no share/QR links (those are owner-only actions), no internal IDs beyond
 * the share token already in the route. Anyone with the link can fetch
 * this, so only what's safe to show an anonymous visitor belongs here.
 */
export type PublicVerifiedProfileResponseData = {
  full_name: string;
  role: string;
  goal: string;
  about: string;
  about_tags: string[];
  ai_summary?: string;
  ai_report: string;
  avatar_url: string | null;
  verified: boolean;
  tier: string;
  tier_label: string;
  score_percentage: number;
  skills: string[];
  working_style?: string[];
  growth_insight?: string;
  skill_breakdown_tabs: VerifiedProfileSkillBreakdownTab[];
  verified_at: string;
  /** Public-safe, unlike `resume_url` — this is the talent's own public
   *  LinkedIn link, not a private document. */
  linkedin_url?: string | null;
  average_hire_rating?: number | null;
  hire_rating_count?: number;
  would_hire_again_rate?: number | null;
};
