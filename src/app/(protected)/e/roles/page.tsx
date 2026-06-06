import type { Metadata } from "next";

import { EmployerRolesPage } from "@/components/dashboard/employer/roles/roles-page";

export const metadata: Metadata = {
  title: "Roles",
};

export default function RolesPage() {
  return <EmployerRolesPage />;
}
