import type { Metadata } from "next";

import { CreateRoleWizard } from "@/components/dashboard/employer/roles/create-role-wizard/create-role-wizard";

export const metadata: Metadata = {
  title: "Create Role",
};

export default function CreateRolePage() {
  return <CreateRoleWizard />;
}
