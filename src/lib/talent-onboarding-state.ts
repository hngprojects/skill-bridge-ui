import type { TalentOnboardingStateResponseData } from "@/types/api";

function toTrackStrings(tracks: unknown): string[] {
  if (!Array.isArray(tracks)) return [];
  return tracks
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const row = item as Record<string, unknown>;
        const value = row.track ?? row.roleTrack ?? row.role_track;
        if (typeof value === "string") return value;
      }
      return "";
    })
    .filter(Boolean);
}

export function normalizeTalentOnboardingState(
  raw: unknown,
): TalentOnboardingStateResponseData {
  if (!raw || typeof raw !== "object") return {};

  const record = raw as Record<string, unknown>;
  const nested =
    record.onboarding && typeof record.onboarding === "object"
      ? (record.onboarding as Record<string, unknown>)
      : record;

  const goal =
    (typeof nested.goal === "string" ? nested.goal : undefined) ??
    (typeof nested.career_goal === "string" ? nested.career_goal : undefined) ??
    null;

  const roleTracks = toTrackStrings(
    nested.roleTracks ?? nested.role_tracks ?? nested.tracks,
  );

  return {
    goal: goal ?? null,
    roleTracks: roleTracks.length > 0 ? roleTracks : null,
  };
}
