"use client";

import Link from "next/link";

import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { cn } from "@/lib/utils";

interface DashboardWelcomeProps {
  firstName?: string;
  goal?: string;
  profileCompletion?: number;
}

export function DashboardWelcome({
  firstName,
  goal = "Become a global talent",
  profileCompletion,
}: DashboardWelcomeProps) {
  const { fullName } = useSessionUserProfile();
  const resolvedFirstName = firstName || fullName?.split(" ")[0] || "Alex";
  // Only surface the CTA when we know the profile is incomplete. Unknown
  // (undefined / loading) and complete (>= 100) both render nothing — the
  // CTA shouldn't appear on a complete profile and shouldn't lie about
  // completion before the dashboard has loaded.
  const showCta =
    typeof profileCompletion === "number" && profileCompletion < 100;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[22px] font-bold leading-tight tracking-tight text-foreground">
          Welcome, {resolvedFirstName}!
        </h1>
        <p className="body mt-1 text-muted-foreground">
          Your Goal: <span>{goal}</span>
        </p>
      </div>

      {showCta ? (
        <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
          <Link
            href="/t/settings"
            className={cn(
              "label text-foreground underline underline-offset-2",
              "hover:opacity-70 transition-opacity",
            )}
          >
            Complete your profile
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-44 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <span className="caption text-muted-foreground">
              {profileCompletion}%
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
