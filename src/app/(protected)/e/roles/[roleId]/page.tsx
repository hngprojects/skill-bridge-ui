import type { Metadata } from "next";

import { EmployerRoleDetailPage } from "@/components/dashboard/employer/roles/role-detail-page";

export const metadata: Metadata = {
  title: "Role details",
};

interface PageProps {
  params: Promise<{ roleId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { roleId } = await params;
  return <EmployerRoleDetailPage roleId={roleId} />;
}
