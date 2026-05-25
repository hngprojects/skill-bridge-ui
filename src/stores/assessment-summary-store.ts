import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AssessmentSlug } from "@/constants/assessment-previews";
import type {
  PersonalAssessmentSubmitResponseData,
  SkillAssessmentSubmitResponseData,
} from "@/types/api";

type SummarySlug = Exclude<AssessmentSlug, "advanced">;

type AssessmentSummaryResult = {
  personal: PersonalAssessmentSubmitResponseData | null;
  skill: SkillAssessmentSubmitResponseData | null;
};

type AssessmentSummaryState = {
  resultsByUser: Record<string, AssessmentSummaryResult>;
  skillClaimedLevelsByUser: Record<string, string | null>;
  setResult: <T extends SummarySlug>(
    userId: string,
    slug: T,
    result: AssessmentSummaryResult[T],
  ) => void;
  clearResult: (userId: string, slug: SummarySlug) => void;
  setSkillClaimedLevel: (userId: string, level: string | null) => void;
};

const INITIAL_RESULTS: AssessmentSummaryResult = {
  personal: null,
  skill: null,
};

export const useAssessmentSummaryStore = create<AssessmentSummaryState>()(
  persist(
    (set) => ({
      resultsByUser: {},
      skillClaimedLevelsByUser: {},
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
      setSkillClaimedLevel: (userId, level) =>
        set((state) => ({
          skillClaimedLevelsByUser: {
            ...state.skillClaimedLevelsByUser,
            [userId]: level,
          },
        })),
    }),
    {
      name: "skillbridge-assessment-summary",
      partialize: (state) => ({
        resultsByUser: state.resultsByUser,
        skillClaimedLevelsByUser: state.skillClaimedLevelsByUser,
      }),
    },
  ),
);
