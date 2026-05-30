import { getSkillAssessmentSession } from "@/actions/assessment";
import { ApiError } from "@/lib/api";
import type { SkillAssessmentStartResponseData } from "@/types/api";

const QUESTION_POLL_INTERVAL_MS = 2000;
const QUESTION_POLL_MAX_ATTEMPTS = 3;

/** A 409 from /skill/start carries the id of the already-active session. */
export function existingSessionIdFromError(error: unknown): string | undefined {
  if (!(error instanceof ApiError) || error.status !== 409) return undefined;
  const data = error.data;
  if (data && typeof data === "object" && "existing_session_id" in data) {
    const id = (data as { existing_session_id?: unknown }).existing_session_id;
    return typeof id === "string" && id ? id : undefined;
  }
  return undefined;
}

export class SkillAssessmentQuestionsUnavailableError extends Error {
  constructor() {
    super("Assessment questions are not ready yet. Please try again.");
    this.name = "SkillAssessmentQuestionsUnavailableError";
  }
}

export async function loadSkillSessionWithQuestions(
  session: SkillAssessmentStartResponseData,
): Promise<SkillAssessmentStartResponseData> {
  if ((session.questions?.length ?? 0) > 0 || !session.session_id) {
    return session;
  }

  let loaded = await getSkillAssessmentSession(session.session_id);
  if ((loaded.questions?.length ?? 0) > 0) {
    return loaded;
  }

  for (let attempt = 0; attempt < QUESTION_POLL_MAX_ATTEMPTS; attempt++) {
    await new Promise((resolve) =>
      setTimeout(resolve, QUESTION_POLL_INTERVAL_MS),
    );
    loaded = await getSkillAssessmentSession(session.session_id);
    if ((loaded.questions?.length ?? 0) > 0) {
      return loaded;
    }
  }

  throw new SkillAssessmentQuestionsUnavailableError();
}
