import type {
  AdvancedAssessmentStartResponseData,
  AdvancedAssessmentSubmitInput,
  AdvancedAssessmentSubmitResponseData,
  AssessmentSessionResponseData,
} from "@/types/api";

import { useAssessmentDemoStore } from "../demo-store";
import { mockDelay } from "../utils";

function buildStartResponse(
  sessionId: string,
  remainingSeconds: number,
  questionCount: number,
): AdvancedAssessmentStartResponseData {
  const now = new Date();
  return {
    status: "success",
    message: "Advanced assessment session created",
    session_id: sessionId,
    started_at: now.toISOString(),
    expires_at: new Date(now.getTime() + remainingSeconds * 1000).toISOString(),
    completed_at: null,
    is_expired: false,
    remaining_seconds: remainingSeconds,
    verified_level: "mid",
    question_count: questionCount,
    // Demo questions are read straight from the demo store by the flow.
    questions: [],
  };
}

export async function mockStartAdvancedAssessment(): Promise<AdvancedAssessmentStartResponseData> {
  await mockDelay();
  const store = useAssessmentDemoStore.getState();
  store.startPhase("advanced");
  const phase = useAssessmentDemoStore.getState().phases.advanced;

  return buildStartResponse(
    phase.sessionId ?? "",
    phase.remainingSeconds,
    phase.questions.length,
  );
}

export async function mockGetAssessmentSession(
  sessionId: string,
): Promise<AssessmentSessionResponseData> {
  await mockDelay();
  const phase = useAssessmentDemoStore.getState().phases.advanced;

  if (!phase.sessionId || phase.sessionId !== sessionId) {
    throw new Error("Demo session not found");
  }

  return buildStartResponse(
    phase.sessionId,
    phase.remainingSeconds,
    phase.questions.length,
  );
}

export async function mockSubmitAdvancedAssessment(
  body: AdvancedAssessmentSubmitInput,
): Promise<AdvancedAssessmentSubmitResponseData> {
  await mockDelay();
  const answersByKey = Object.fromEntries(
    body.answers.map((a) => [a.questionId, a.answer]),
  );
  const store = useAssessmentDemoStore.getState();
  store.saveAnswers("advanced", answersByKey);
  store.completePhase("advanced");

  return {
    status: "success",
    message: "Demo advanced assessment complete.",
    session_id: body.sessionId,
    score: 130,
    max_score: 186,
    percentage: 70,
    tier: "emerging",
    integrity_confidence: "high",
  };
}
