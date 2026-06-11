import type { Metadata } from "next";

import { TalentOfferDetailPage } from "@/components/dashboard/talent/offers/talent-offer-detail-page";

export const metadata: Metadata = {
  title: "Offer",
};

interface PageProps {
  params: Promise<{ offerId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { offerId } = await params;
  return <TalentOfferDetailPage offerId={offerId} />;
}
