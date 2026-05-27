import type { VerifiedProfileResponseData } from "@/types/api";

export function getAboutTags(data: VerifiedProfileResponseData): string[] {
  if (data.about_tags.length > 0) return data.about_tags;
  if (data.about.trim()) return [data.about.trim()];
  return [];
}

export function getAiReport(data: VerifiedProfileResponseData): string {
  return data.ai_report || data.ai_summary;
}
