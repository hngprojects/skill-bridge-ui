"use client";

import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { cn } from "@/lib/utils";
import Link from "next/link";

type OverviewHeaderProps = {
  profileCompletion?: number;
};

export function OverviewHeader({ profileCompletion }: OverviewHeaderProps) {
  const { fullName, isLoading } = useSessionUserProfile();
  const displayName = !isLoading && fullName ? fullName : "";
  // Only surface the CTA when we know the profile is incomplete. Unknown
  // (undefined / loading) and complete (>= 100) both render nothing — the
  // CTA shouldn't appear on a complete profile.
  const showCta =
    typeof profileCompletion === "number" && profileCompletion < 100;

  return (
    <section className="flex flex-col gap-8 py-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:py-10">
      <div className="space-y-2">
        <h1 className="text-[22px] leading-normal font-bold text-[#091417] sm:text-[28px] sm:leading-tight sm:tracking-[-0.01em]">
          Welcome{displayName ? `, ${displayName}` : ""}!
        </h1>
        <p className="max-w-2xl text-sm leading-6 tracking-[0.016em] text-[#151515]/80">
          Here&apos;s how to get started with your assessment engine, It&apos;s
          time to get Job-Ready!
        </p>
      </div>

      {showCta ? (
        <div className="w-full self-start lg:max-w-55 lg:text-right">
          <Link
            href="/t/settings"
            className={cn(
              "label text-foreground underline underline-offset-2",
              "hover:opacity-70 transition-opacity",
            )}
          >
            Complete your profile
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1 flex-1 rounded-full bg-[#D6FFBE]">
              <div
                className={cn("h-1 rounded-full bg-[#4C9924]")}
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <span className="text-xs leading-4 font-semibold text-[#757575]">
              {profileCompletion}%
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
