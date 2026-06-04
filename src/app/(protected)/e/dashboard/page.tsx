import type { Metadata } from "next";
import { EmployerDashboardOverview } from "@/components/dashboard/employer/employer-dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function EmployerDashboardPage() {
  return <EmployerDashboardOverview />;
}
