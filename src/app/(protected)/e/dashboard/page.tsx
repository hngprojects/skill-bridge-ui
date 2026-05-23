import type { Metadata } from "next";

import { ComingSoon } from "@/components/custom/coming-soon";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function EmployerDashboardPage() {
  return (
    <ComingSoon
      title="Employer dashboard coming soon"
      description="We're building out the talent discovery experience. You'll see verified candidates and offers here as soon as it's ready."
    />
  );
}
