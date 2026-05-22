import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AssessmentSlug } from "@/constants/assessment-previews";
import type {
  AdvancedAssessmentSubmitResponseData,
  PersonalAssessmentSubmitResponseData,
  SkillAssessmentSubmitResponseData,
} from "@/types/api";

type AssessmentSummaryResult = {
  personal: PersonalAssessmentSubmitResponseData | null;
  skill: SkillAssessmentSubmitResponseData | null;
  advanced: AdvancedAssessmentSubmitResponseData | null;
};

type AssessmentSummaryState = {
  results: AssessmentSummaryResult;
  setResult: <T extends AssessmentSlug>(
    slug: T,
    result: AssessmentSummaryResult[T],
  ) => void;
  clearResult: (slug: AssessmentSlug) => void;
};

const INITIAL_RESULTS: AssessmentSummaryResult = {
  personal: null,
  skill: null,
  advanced: null,
};

export const useAssessmentSummaryStore = create<AssessmentSummaryState>()(
  persist(
    (set) => ({
      results: INITIAL_RESULTS,
      setResult: (slug, result) =>
        set((state) => ({
          results: {
            ...state.results,
            [slug]: result,
          },
        })),
      clearResult: (slug) =>
        set((state) => ({
          results: {
            ...state.results,
            [slug]: null,
          },
        })),
    }),
    {
      name: "skillbridge-assessment-summary",
      partialize: (state) => ({
        results: state.results,
      }),
    },
  ),
);
