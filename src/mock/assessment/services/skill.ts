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
    session: {
      sessionId: phase.sessionId!,
      questions: phase.questions,
    },
  };
}

export async function mockSubmitSkillAssessment(
  body: SkillAssessmentSubmitInput,
): Promise<SkillAssessmentSubmitResponseData> {
  await mockDelay();
  const answersByKey = Object.fromEntries(
    body.answers.map((a) => [a.questionId, a.value]),
  );
  const store = useAssessmentDemoStore.getState();
  store.saveAnswers("skill", answersByKey);
  store.completePhase("skill");

  return {
    score: 78,
    passed: true,
    validatedLevel: "Mid",
    guidanceReport: "Demo skill assessment complete.",
  };
}
