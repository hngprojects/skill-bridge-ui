import type { Metadata } from "next";

import { ComingSoon } from "@/components/custom/coming-soon";

export const metadata: Metadata = {
  title: "Settings",
};

export default function EmployerSettingsPage() {
  return (
    <ComingSoon
      title="Settings are coming soon"
      description="Manage your company profile, billing, and team access here. This view is still in build."
      backHref="/e/dashboard"
    />
  );
}
