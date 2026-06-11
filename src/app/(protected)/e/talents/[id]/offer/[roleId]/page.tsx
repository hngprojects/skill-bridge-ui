import type { Metadata } from "next";

import { EmployerSendOfferPage } from "@/components/dashboard/employer/talents/employer-send-offer-page";

export const metadata: Metadata = {
  title: "Send Offer",
};

interface PageProps {
  params: Promise<{ id: string; roleId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id, roleId } = await params;
  return <EmployerSendOfferPage userId={id} roleId={roleId} />;
}
