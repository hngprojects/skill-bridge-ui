import type { Metadata } from "next";

import { ComingSoon } from "@/components/custom/coming-soon";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function EmployerNotificationsPage() {
  return (
    <ComingSoon
      title="Notifications are coming soon"
      description="Updates on candidates, assessments, and shortlist activity will land here."
      backHref="/e/dashboard"
    />
  );
}
