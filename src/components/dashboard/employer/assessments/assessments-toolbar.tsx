"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type AssessmentsViewTab = "all" | "activity";

const TABS: { id: AssessmentsViewTab; label: string }[] = [
  { id: "all", label: "Total assessments" },
  { id: "activity", label: "Activity" },
];

type AssessmentsToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeTab: AssessmentsViewTab;
  onTabChange: (tab: AssessmentsViewTab) => void;
};

export function AssessmentsToolbar({
  searchValue,
  onSearchChange,
  activeTab,
  onTabChange,
}: AssessmentsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A1A1AA]"
          aria-hidden
        />
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search role track, status"
          className="h-10 rounded-full bg-white pl-10"
        />
      </div>
      <div
        role="tablist"
        aria-label="Assessments view"
        className="inline-flex items-center gap-2"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "cursor-pointer rounded-md px-4 py-2 font-sans text-sm font-semibold transition-colors",
              activeTab === tab.id
                ? "bg-[#EBEBEB] text-[#151515]"
                : "bg-transparent text-[#9CA3AF] hover:text-[#151515]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
