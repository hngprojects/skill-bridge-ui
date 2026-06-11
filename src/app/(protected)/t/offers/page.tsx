import type { Metadata } from "next";

import { TalentOffersPage } from "@/components/dashboard/talent/offers/talent-offers-page";

export const metadata: Metadata = {
  title: "Offers",
};

export default function Page() {
  return <TalentOffersPage />;
}
