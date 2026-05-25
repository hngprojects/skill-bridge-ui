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
  const { sections, sourceToNumber } = useMemo<{
    sections: QuestionnaireSidebarSection[];
    sourceToNumber: Map<number, number>;
  }>(() => {
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
    const sorted = Array.from(seen.entries()).sort(([a], [b]) => a - b);
    const built: QuestionnaireSidebarSection[] = sorted.map(
      ([, title], index) => ({ number: index + 1, title }),
    );
    const map = new Map<number, number>(
      sorted.map(([source], index) => [source, index + 1]),
    );

    if (built.length === 0) {
      const fallback = isAssessmentSlug(name)
        ? ASSESSMENT_FALLBACK_SECTION_TITLES[name]
        : "Assessment";
      return {
        sections: [{ number: 1, title: fallback }],
        sourceToNumber: map,
      };
    }
    return { sections: built, sourceToNumber: map };
  }, [questions, name]);

  const activeSectionNumber = useMemo(() => {
    if (!question) return 1;
    if (question.sourceSection !== undefined) {
      return sourceToNumber.get(question.sourceSection) ?? 1;
    }
    if (question.sourceSectionTitle) {
      const idx = sections.findIndex(
        (s) => s.title === question.sourceSectionTitle,
      );
      return idx === -1 ? 1 : idx + 1;
    }
    return 1;
  }, [question, sections, sourceToNumber]);

  return { sections, activeSectionNumber };
}
