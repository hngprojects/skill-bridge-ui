import type {
  AdvancedAssessmentQuestion,
  AdvancedAssessmentSession,
  AdvancedAssessmentStartResponseData,
  AdvancedAssessmentSubmitInput,
  AdvancedAssessmentSubmitResponseData,
  AssessmentSessionResponseData,
} from "@/types/api";
import type { Question } from "@/types/questionnaire";

import { useAssessmentDemoStore } from "../demo-store";
import { mockDelay } from "../utils";

function toAdvancedApiQuestions(
  questions: Question[],
): AdvancedAssessmentQuestion[] {
  return questions.map((q) => ({
    id: q.id,
    type:
      q.inputType === "single"
        ? "mcq"
        : q.minLength && q.minLength >= 80
          ? "long_text"
          : "short_text",
    prompt: q.prompt,
    options: q.options ? [...q.options] : undefined,
  }));
}

function buildAdvancedSession(
  sessionId: string,
  questions: Question[],
  remainingSeconds: number,
): AdvancedAssessmentSession {
  return {
    sessionId,
    remainingSeconds,
    questions: toAdvancedApiQuestions(questions),
  };
}

export async function mockStartAdvancedAssessment(): Promise<AdvancedAssessmentStartResponseData> {
  await mockDelay();
  const store = useAssessmentDemoStore.getState();
  store.startPhase("advanced");
  const phase = useAssessmentDemoStore.getState().phases.advanced;

  return {
    status: "success",
    session: buildAdvancedSession(
      phase.sessionId!,
      phase.questions,
      phase.remainingSeconds,
    ),
  };
}

export async function mockGetAssessmentSession(
  sessionId: string,
): Promise<AssessmentSessionResponseData> {
  await mockDelay();
  const phase = useAssessmentDemoStore.getState().phases.advanced;

  if (!phase.sessionId || phase.sessionId !== sessionId) {
    throw new Error("Demo session not found");
  }

  return {
    status: "success",
    session: buildAdvancedSession(
      phase.sessionId,
      phase.questions,
      phase.remainingSeconds,
    ),
  };
}

export async function mockSubmitAdvancedAssessment(
  body: AdvancedAssessmentSubmitInput,
): Promise<AdvancedAssessmentSubmitResponseData> {
  await mockDelay();
  const answersByKey = Object.fromEntries(
    body.answers.map((a) => [a.questionId, a.value]),
  );
  const store = useAssessmentDemoStore.getState();
  store.saveAnswers("advanced", answersByKey);
  store.completePhase("advanced");

  return {
    tier: "emerging",
    score: 72,
    guidanceReport: "Demo advanced assessment complete.",
  };
}
