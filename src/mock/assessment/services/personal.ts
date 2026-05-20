import type {
  PersonalAssessmentSession,
  PersonalAssessmentSessionResponseData,
  PersonalAssessmentStartResponseData,
  PersonalAssessmentSubmitResponseData,
} from "@/types/api";

import { useAssessmentDemoStore } from "../demo-store";
import { mockDelay } from "../utils";

function buildPersonalSession(
  sessionId: string,
  questions: PersonalAssessmentSession["questions"],
): PersonalAssessmentSession {
  return {
    sessionId,
    generatedAt: new Date().toISOString(),
    source: "demo",
    track: "Software Engineering",
    claimedLevel: "Mid",
    questionCount: questions.length,
    questions,
  };
}

export async function mockGetPersonalAssessmentSession(): Promise<PersonalAssessmentSessionResponseData> {
  await mockDelay();
  const phase = useAssessmentDemoStore.getState().phases.personal;

  if (phase.status !== "in_progress" || !phase.sessionId) {
    return { status: "success", session: null, answers: {} };
  }

  return {
    status: "success",
    session: buildPersonalSession(phase.sessionId, phase.questions),
    answers: phase.answers,
  };
}

export async function mockStartPersonalAssessment(): Promise<PersonalAssessmentStartResponseData> {
  await mockDelay();
  const store = useAssessmentDemoStore.getState();
  store.startPhase("personal");
  const phase = useAssessmentDemoStore.getState().phases.personal;

  return {
    status: "success",
    session: buildPersonalSession(phase.sessionId!, phase.questions),
  };
}

export async function mockSubmitPersonalAssessment(
  answers: Record<string, string | string[]>,
): Promise<PersonalAssessmentSubmitResponseData> {
  await mockDelay();
  const store = useAssessmentDemoStore.getState();
  store.saveAnswers("personal", answers);
  store.completePhase("personal");

  return {
    message: "Personal assessment completed (demo)",
    completedAt: new Date().toISOString(),
  };
}
