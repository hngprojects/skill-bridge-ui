import type { Metadata } from "next";

import { EmployerSettingsPage } from "@/components/dashboard/employer/settings/employer-settings-page";

export const metadata: Metadata = {
  title: "Settings",
};

export default function EmployerSettings() {
  return <EmployerSettingsPage />;
}
