import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ASSESSMENT_DEFAULT_DURATION_SECONDS } from "@/constants/question-bank";
import type { Question } from "@/types/questionnaire";

import { getDemoQuestions, type DemoAssessmentPhase } from "./question-slices";
import { createMockSessionId } from "./utils";

export type PhaseStatus = "locked" | "available" | "in_progress" | "completed";

type PhaseRecord = {
  status: PhaseStatus;
  sessionId: string | null;
  questions: Question[];
  answers: Record<string, string | string[]>;
  remainingSeconds: number;
};

type AssessmentDemoState = {
  phases: Record<DemoAssessmentPhase, PhaseRecord>;
  startPhase: (phase: DemoAssessmentPhase) => void;
  saveAnswers: (
    phase: DemoAssessmentPhase,
    answers: Record<string, string | string[]>,
  ) => void;
  completePhase: (phase: DemoAssessmentPhase) => void;
  getPhaseStatus: (phase: DemoAssessmentPhase) => PhaseStatus;
  resetDemo: () => void;
};

const INITIAL_PHASES: Record<DemoAssessmentPhase, PhaseRecord> = {
  personal: {
    status: "available",
    sessionId: null,
    questions: [],
    answers: {},
    remainingSeconds: 0,
  },
  skill: {
    status: "locked",
    sessionId: null,
    questions: [],
    answers: {},
    remainingSeconds: 0,
  },
  advanced: {
    status: "locked",
    sessionId: null,
    questions: [],
    answers: {},
    remainingSeconds: ASSESSMENT_DEFAULT_DURATION_SECONDS,
  },
};

function unlockNext(current: DemoAssessmentPhase): DemoAssessmentPhase | null {
  if (current === "personal") return "skill";
  if (current === "skill") return "advanced";
  return null;
}

export const useAssessmentDemoStore = create<AssessmentDemoState>()(
  persist(
    (set, get) => ({
      phases: { ...INITIAL_PHASES },

      startPhase: (phase) => {
        const questions = getDemoQuestions(phase);
        set((state) => ({
          phases: {
            ...state.phases,
            [phase]: {
              ...state.phases[phase],
              status: "in_progress",
              sessionId: createMockSessionId(phase),
              questions,
              answers: {},
              remainingSeconds:
                phase === "advanced"
                  ? ASSESSMENT_DEFAULT_DURATION_SECONDS
                  : state.phases[phase].remainingSeconds,
            },
          },
        }));
      },

      saveAnswers: (phase, answers) => {
        set((state) => ({
          phases: {
            ...state.phases,
            [phase]: {
              ...state.phases[phase],
              answers: { ...state.phases[phase].answers, ...answers },
            },
          },
        }));
      },

      completePhase: (phase) => {
        const next = unlockNext(phase);
        set((state) => {
          const phases = {
            ...state.phases,
            [phase]: {
              ...state.phases[phase],
              status: "completed" as const,
            },
          };
          if (next && phases[next].status === "locked") {
            phases[next] = { ...phases[next], status: "available" };
          }
          return { phases };
        });
      },

      getPhaseStatus: (phase) => get().phases[phase].status,

      resetDemo: () => set({ phases: { ...INITIAL_PHASES } }),
    }),
    { name: "CredLane-assessment-demo" },
  ),
);
