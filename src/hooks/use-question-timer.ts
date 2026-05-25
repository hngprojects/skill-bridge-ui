"use client";

import { useEffect, useRef } from "react";

import type { Question } from "@/types/questionnaire";

export function useQuestionTimer(
  question: Question | undefined,
  isReady: boolean,
) {
  const timeSpentRef = useRef<Record<string, number>>({});
  const questionStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (isReady && question && questionStartRef.current === null) {
      questionStartRef.current = Date.now();
    }
  }, [isReady, question]);

  const accumulate = () => {
    if (!question) return;
    // Effect hasn't captured a start yet (questionnaire still loading).
    if (questionStartRef.current === null) return;
    const now = Date.now();
    const elapsed = Math.floor((now - questionStartRef.current) / 1000);
    if (elapsed > 0) {
      timeSpentRef.current = {
        ...timeSpentRef.current,
        [question.id]: (timeSpentRef.current[question.id] ?? 0) + elapsed,
      };
    }
    questionStartRef.current = now;
  };

  const resetStart = () => {
    questionStartRef.current = Date.now();
  };

  const buildByKey = (questions: Question[]): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const q of questions) {
      const t = timeSpentRef.current[q.id];
      if (t != null) result[q.key] = t;
    }
    return result;
  };

  return { accumulate, resetStart, buildByKey };
}
