"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type QuestionnaireSidebarSection = {
  number: number;
  title: string;
};

type QuestionnaireSidebarProps = {
  sections: QuestionnaireSidebarSection[];
  activeSectionNumber: number;
  onSectionChange?: (sectionNumber: number) => void;
};

export function QuestionnaireSidebar({
  sections,
  activeSectionNumber,
  onSectionChange,
}: QuestionnaireSidebarProps) {
  return (
    <aside className="w-80 shrink-0 rounded-xl border border-border bg-white p-5">
      <nav aria-label="Questionnaire sections">
        <ol className="flex flex-col gap-5">
          {sections.map((section) => {
            const isCompleted = section.number < activeSectionNumber;
            const isActive = section.number === activeSectionNumber;

            return (
              <li key={section.number}>
                <button
                  type="button"
                  onClick={() => onSectionChange?.(section.number)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 text-left font-sans text-sm transition-colors",
                    isActive && "font-medium text-foreground",
                    isCompleted && "text-foreground/80",
                    !isActive && !isCompleted && "text-foreground/40",
                  )}
                >
                  {isCompleted ? (
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-google-green">
                      <Check className="size-4 text-white" strokeWidth={2.5} />
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                        isActive
                          ? "border-foreground text-foreground"
                          : "border-foreground/25 text-foreground/40",
                      )}
                    >
                      {section.number}
                    </span>
                  )}
                  <span className="leading-snug">{section.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
