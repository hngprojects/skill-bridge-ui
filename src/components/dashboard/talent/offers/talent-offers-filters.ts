import type { EmployerOfferStatus } from "@/types/api/employer-offers";
import type { TalentOffer } from "@/types/api/talent-offers";

import type { TalentOffersTabId } from "./talent-offers-toolbar";

export const TAB_STATUS_FILTER: Record<
  Exclude<TalentOffersTabId, "all">,
  ReadonlyArray<EmployerOfferStatus>
> = {
  pending: ["pending"],
  accepted: [
    "accepted",
    "assessment_unlocked",
    "assessment_completed",
    "passed",
    "hired",
  ],
  declined: ["declined", "failed"],
  expired: ["expired", "withdrawn"],
};

export function matchesTab(
  offer: TalentOffer,
  tab: TalentOffersTabId,
): boolean {
  if (tab === "all") return true;
  return TAB_STATUS_FILTER[tab].includes(offer.status);
}

export function emptyCopyFor(tab: TalentOffersTabId): {
  title: string;
  description: string;
} {
  switch (tab) {
    case "pending":
      return {
        title: "No pending offers",
        description: "You'll see new offers from employers here.",
      };
    case "accepted":
      return {
        title: "No accepted offers yet",
        description: "Offers you accept will appear here.",
      };
    case "declined":
      return {
        title: "No declined offers",
        description: "Offers you decline or fail will appear here.",
      };
    case "expired":
      return {
        title: "No expired or withdrawn offers",
        description: "Old offers that lapsed will show up here.",
      };
    case "all":
    default:
      return {
        title: "No offers yet",
        description: "Once an employer sends you an offer, it'll show up here.",
      };
  }
}
