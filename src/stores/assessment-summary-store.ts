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
  resultsByUser: Record<string, AssessmentSummaryResult>;
  setResult: <T extends AssessmentSlug>(
    userId: string,
    slug: T,
    result: AssessmentSummaryResult[T],
  ) => void;
  clearResult: (userId: string, slug: AssessmentSlug) => void;
};

const INITIAL_RESULTS: AssessmentSummaryResult = {
  personal: null,
  skill: null,
  advanced: null,
};

export const useAssessmentSummaryStore = create<AssessmentSummaryState>()(
  persist(
    (set) => ({
      resultsByUser: {},
      setResult: (userId, slug, result) =>
        set((state) => ({
          resultsByUser: {
            ...state.resultsByUser,
            [userId]: {
              ...(state.resultsByUser[userId] ?? INITIAL_RESULTS),
              [slug]: result,
            },
          },
        })),
      clearResult: (userId, slug) =>
        set((state) => ({
          resultsByUser: {
            ...state.resultsByUser,
            [userId]: {
              ...(state.resultsByUser[userId] ?? INITIAL_RESULTS),
              [slug]: null,
            },
          },
        })),
    }),
    {
      name: "skillbridge-assessment-summary",
      partialize: (state) => ({
        resultsByUser: state.resultsByUser,
      }),
    },
  ),
);
