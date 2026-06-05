import type { Metadata } from "next";

import { ComingSoon } from "@/components/custom/coming-soon";

export const metadata: Metadata = {
  title: "Shortlist",
};

export default function EmployerShortlistPage() {
  return (
    <ComingSoon
      title="Shortlist is coming soon"
      description="Save and organise candidates you want to follow up with. This view is still in build."
      backHref="/e/dashboard"
    />
  );
}
