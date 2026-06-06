"use client";

import { EmployerSettingsTabsCard } from "./employer-settings-tabs-card";
import { EmployerVerificationBanner } from "./employer-verification-banner";

export function EmployerSettingsPage() {
  return (
    <div className="py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your company profile, hiring preferences, and account.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <EmployerVerificationBanner />
        <EmployerSettingsTabsCard />
      </div>
    </div>
  );
}
