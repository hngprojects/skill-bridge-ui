import type { Metadata } from "next";

import { ComingSoon } from "@/components/custom/coming-soon";

export const metadata: Metadata = {
  title: "Assessments",
};

export default function EmployerAssessmentsPage() {
  return (
    <ComingSoon
      title="Assessments are coming soon"
      description="Create and review assessments for candidates. This view is still in build."
      backHref="/e/dashboard"
    />
  );
}
