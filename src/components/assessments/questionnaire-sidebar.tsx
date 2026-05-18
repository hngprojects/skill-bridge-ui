"use client";

import {
  QUESTION_BANK_SECTIONS,
  type QuestionBankSectionId,
} from "@/constants/question-bank";
import { cn } from "@/lib/utils";

type QuestionnaireSidebarProps = {
  activeSectionId: QuestionBankSectionId;
  onSectionChange: (sectionId: QuestionBankSectionId) => void;
};

export function QuestionnaireSidebar({
  activeSectionId,
  onSectionChange,
}: QuestionnaireSidebarProps) {
  return (
    <aside className="w-80 shrink-0 rounded-xl border border-border bg-white p-5">
      <nav aria-label="Questionnaire sections">
        <ol className="flex flex-col gap-5">
          {QUESTION_BANK_SECTIONS.map((section) => {
            const isActive = section.id === activeSectionId;

            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onSectionChange(section.id)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 text-left font-sans text-sm transition-colors",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                      isActive
                        ? "border-foreground text-foreground"
                        : "border-foreground/30 text-foreground/70",
                    )}
                  >
                    {section.number}
                  </span>
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
