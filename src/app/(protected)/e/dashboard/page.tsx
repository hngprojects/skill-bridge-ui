import type { Metadata } from "next";
import NewEmployerDashboardPage from "@/components/dashboard/employer/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function EmployerDashboardPage() {
  return <NewEmployerDashboardPage />;
}
