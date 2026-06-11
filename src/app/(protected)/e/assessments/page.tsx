import type { Metadata } from "next";

import { EmployerAssessmentsPage } from "@/components/dashboard/employer/assessments/employer-assessments-page";

export const metadata: Metadata = {
  title: "Assessments",
};

export default function Page() {
  return <EmployerAssessmentsPage />;
}
