"use client";

import { useMemo } from "react";
import type { QuestionnaireSidebarSection } from "@/components/assessments/questionnaire-sidebar";
import {
  ASSESSMENT_FALLBACK_SECTION_TITLES,
  isAssessmentSlug,
} from "@/constants/assessment-previews";
import type { Question } from "@/types/questionnaire";

export function useQuestionnaireSections(
  questions: Question[],
  name: string,
  question: Question | undefined,
): {
  sections: QuestionnaireSidebarSection[];
  activeSectionNumber: number;
} {
  const sections = useMemo<QuestionnaireSidebarSection[]>(() => {
    const seen = new Map<number, string>();
    for (const q of questions) {
      if (
        q.sourceSection !== undefined &&
        q.sourceSectionTitle &&
        !seen.has(q.sourceSection)
      ) {
        seen.set(q.sourceSection, q.sourceSectionTitle);
      }
    }
    const built = Array.from(seen.entries())
      .sort(([a], [b]) => a - b)
      .map(([, title], index) => ({ number: index + 1, title }));

    if (built.length === 0) {
      const fallback = isAssessmentSlug(name)
        ? ASSESSMENT_FALLBACK_SECTION_TITLES[name]
        : "Assessment";
      return [{ number: 1, title: fallback }];
    }
    return built;
  }, [questions, name]);

  const activeSectionNumber = useMemo(() => {
    if (!question?.sourceSectionTitle) return 1;
    const idx = sections.findIndex(
      (s) => s.title === question.sourceSectionTitle,
    );
    return idx === -1 ? 1 : idx + 1;
  }, [question, sections]);

  return { sections, activeSectionNumber };
}
