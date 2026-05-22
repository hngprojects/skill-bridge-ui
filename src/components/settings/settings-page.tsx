"use client";

import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

import { SettingsAboutMe } from "./settings-about-me";
import { SettingsTabsCard } from "./settings-tabs-card";

export function SettingsPage() {
  const { fullName, email } = useSessionUserProfile();

  return (
    <div className="py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and edit your account with your personal information
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SettingsAboutMe
          initialFullName={fullName}
          initialEmail={email}
          isVerified
        />
        <SettingsTabsCard />
      </div>
    </div>
  );
}
