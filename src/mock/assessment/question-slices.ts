import type { Question } from "@/types/questionnaire";

import { getBankQuestionsByIds } from "./map-question-bank";

export type DemoAssessmentPhase = "personal" | "skill" | "advanced";

/** Sections 1–2: professional background + skills baseline (12) */
export const PERSONAL_DEMO_QUESTION_IDS = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
  "q11",
  "q12",
] as const;

/** Sections 2–3: skill depth + leadership (12) */
export const SKILL_DEMO_QUESTION_IDS = [
  "q13",
  "q14",
  "q15",
  "q16",
  "q17",
  "q18",
  "q19",
  "q20",
  "q21",
  "q22",
  "q23",
  "q24",
] as const;

/** Sections 6–7: achievements + availability (12) */
export const ADVANCED_DEMO_QUESTION_IDS = [
  "q37",
  "q38",
  "q39",
  "q40",
  "q41",
  "q42",
  "q43",
  "q44",
  "q45",
  "q46",
  "q47",
  "q48",
] as const;

const SLICE_BY_PHASE: Record<DemoAssessmentPhase, readonly string[]> = {
  personal: PERSONAL_DEMO_QUESTION_IDS,
  skill: SKILL_DEMO_QUESTION_IDS,
  advanced: ADVANCED_DEMO_QUESTION_IDS,
};

export function getDemoQuestions(phase: DemoAssessmentPhase): Question[] {
  return getBankQuestionsByIds(SLICE_BY_PHASE[phase]);
}
