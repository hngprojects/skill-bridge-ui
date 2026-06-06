import type { Metadata } from "next";

import { EmployerTalentProfilePage } from "@/components/dashboard/employer/talents/employer-talent-profile-page";

export const metadata: Metadata = {
  title: "Talent Profile",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <EmployerTalentProfilePage userId={id} />;
}
