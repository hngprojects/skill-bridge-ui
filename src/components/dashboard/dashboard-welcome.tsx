"use client";

import Link from "next/link";

import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { cn } from "@/lib/utils";

interface DashboardWelcomeProps {
  goal?: string;
  profileCompletion?: number;
}

export function DashboardWelcome({
  goal = "placeholder for your goal",
  profileCompletion = 70,
}: DashboardWelcomeProps) {
  const { fullName } = useSessionUserProfile();
  const firstName = fullName?.split(" ")[0] || "Alex";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[22px] font-bold leading-tight tracking-tight text-foreground">
          Welcome, {firstName}!
        </h1>
        <p className="body mt-1 text-muted-foreground">
          Your Goal: <span>{goal}</span>
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
        <Link
          href="/talent/onboarding"
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
    </div>
  );
}
