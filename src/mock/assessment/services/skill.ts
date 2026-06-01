import type {
  SkillAssessmentStartResponseData,
  SkillAssessmentSubmitInput,
  SkillAssessmentSubmitResponseData,
} from "@/types/api";

import { useAssessmentDemoStore } from "../demo-store";
import { mockDelay } from "../utils";

export async function mockStartSkillAssessment(): Promise<SkillAssessmentStartResponseData> {
  await mockDelay();
  const store = useAssessmentDemoStore.getState();
  store.startPhase("skill");
  const phase = useAssessmentDemoStore.getState().phases.skill;

  return {
    status: "success",
    session_id: phase.sessionId ?? "",
    verified_level: "mid",
    questions: [],
  };
}

export async function mockSubmitSkillAssessment(
  body: SkillAssessmentSubmitInput,
): Promise<SkillAssessmentSubmitResponseData> {
  await mockDelay();
  const answersByKey = Object.fromEntries(
    body.answers.map((a) => [a.questionId, a.answer]),
  );
  const store = useAssessmentDemoStore.getState();
  store.saveAnswers("skill", answersByKey);
  store.completePhase("skill");

  return {
    status: "success",
    message: "Demo skill assessment complete.",
    session_id: body.attemptId,
    score: 78,
    total: 100,
    percentage: 78,
    validated_level: "mid",
    claimed_level: "mid",
    downgraded: false,
    passed: true,
  };
}
