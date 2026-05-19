"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type {
  AssessmentCatalogCategory,
  AssessmentCatalogTab,
} from "@/constants/assessment-roadmap";
import { cn } from "@/lib/utils";

type AssessmentCatalogTabsProps = {
  tabs: AssessmentCatalogTab[];
  activeTab: AssessmentCatalogCategory;
  onTabChange: (tab: AssessmentCatalogCategory) => void;
};

export function AssessmentCatalogTabs({
  tabs,
  activeTab,
  onTabChange,
}: AssessmentCatalogTabsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex min-w-max items-center gap-2 pb-2 sm:gap-3">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm tracking-[0.016em] transition-all duration-300 hover:-translate-y-0.5 sm:min-w-[193px] sm:px-6 sm:text-base",
                isActive
                  ? "bg-[#EBEBEB] font-medium text-[#151515]"
                  : "bg-[#FBFBFB] font-normal text-[#757575] hover:text-[#151515]",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
