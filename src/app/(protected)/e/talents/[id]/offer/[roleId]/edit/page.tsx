import type { Metadata } from "next";

import { EmployerEditRolePage } from "@/components/dashboard/employer/talents/employer-edit-role-page";

export const metadata: Metadata = {
  title: "Edit Role",
};

interface PageProps {
  params: Promise<{ id: string; roleId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id, roleId } = await params;
  return <EmployerEditRolePage userId={id} roleId={roleId} />;
}
