import type { Metadata } from "next";

import { ComingSoon } from "@/components/custom/coming-soon";

export const metadata: Metadata = {
  title: "Offers",
};

export default function OffersPage() {
  return (
    <ComingSoon
      title="Offers are coming soon"
      description="Once you've completed your verified assessments, employer offers will land here."
      backHref="/t/dashboard"
    />
  );
}
