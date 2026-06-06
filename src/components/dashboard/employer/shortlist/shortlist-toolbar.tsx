"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { ShortlistTabId } from "@/constants/employer-shortlist";
import { cn } from "@/lib/utils";

type ShortlistToolbarProps = {
  activeTab: ShortlistTabId;
  shortlistCount: number;
  offersCount: number;
  searchValue: string;
  searchPlaceholder: string;
  onTabChange: (tab: ShortlistTabId) => void;
  onSearchChange: (value: string) => void;
};

export function ShortlistToolbar({
  activeTab,
  shortlistCount,
  offersCount,
  searchValue,
  searchPlaceholder,
  onTabChange,
  onSearchChange,
}: ShortlistToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A1A1AA]"
          aria-hidden
        />
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 rounded-full bg-white pl-10"
        />
      </div>
      <div
        role="tablist"
        aria-label="Shortlist view"
        className="inline-flex items-center gap-2"
      >
        <TabButton
          isActive={activeTab === "shortlist"}
          onClick={() => onTabChange("shortlist")}
        >
          My Shortlist ({shortlistCount})
        </TabButton>
        <TabButton
          isActive={activeTab === "offers"}
          onClick={() => onTabChange("offers")}
        >
          Offers sent ({offersCount})
        </TabButton>
      </div>
    </div>
  );
}

function TabButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-md px-4 py-2 font-sans text-sm font-semibold transition-colors",
        isActive
          ? "bg-[#EBEBEB]"
          : "bg-transparent text-[#9CA3AF] hover:text-[#151515]",
      )}
    >
      {children}
    </button>
  );
}
