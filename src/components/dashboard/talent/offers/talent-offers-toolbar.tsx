"use client";

import { cn } from "@/lib/utils";

export const TALENT_OFFERS_TAB_IDS = [
  "all",
  "pending",
  "accepted",
  "declined",
  "expired",
] as const;

export type TalentOffersTabId = (typeof TALENT_OFFERS_TAB_IDS)[number];

const TAB_LABELS: Record<TalentOffersTabId, string> = {
  all: "All",
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
};

type TalentOffersToolbarProps = {
  activeTab: TalentOffersTabId;
  counts: Record<TalentOffersTabId, number>;
  onTabChange: (tab: TalentOffersTabId) => void;
};

export function TalentOffersToolbar({
  activeTab,
  counts,
  onTabChange,
}: TalentOffersToolbarProps) {
  return (
    <div
      role="tablist"
      aria-label="Offer status filter"
      className="flex flex-wrap items-center gap-2 border-b border-[#E4E7EC] pb-3"
    >
      {TALENT_OFFERS_TAB_IDS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#F2F4F7] text-[#111827]"
                : "border border-[#D0D5DD] bg-white text-[#667085] hover:bg-[#F9FAFB]",
            )}
          >
            <span>{TAB_LABELS[tab]}</span>
            <span
              className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                isActive
                  ? "bg-[#101828] text-white"
                  : "bg-[#F2F4F7] text-[#475467]",
              )}
            >
              {counts[tab] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
