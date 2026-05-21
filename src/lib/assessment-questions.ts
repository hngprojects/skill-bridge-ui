import type {
  AdvancedAssessmentAnswer,
  AdvancedAssessmentQuestion,
  SkillAssessmentApiQuestion,
  SkillAssessmentQuestionType,
  SkillAssessmentSubmitAnswer,
} from "@/types/api";
import type { InputTypeParams, Question } from "@/types/questionnaire";

/** Normalize API questions that already use the personal Question shape. */
export function normalizePersonalQuestions(questions: Question[]): Question[] {
  return questions.map((q) => ({
    ...q,
    key: q.key || q.id,
    required: q.required ?? true,
  }));
}

function mapSkillTypeToInputType(
  type: SkillAssessmentQuestionType,
): InputTypeParams {
  switch (type) {
    case "single_pick":
      return "single";
    case "multi_pick":
      return "multi";
    case "required_text":
      return "text_required";
    default:
      return "text_required";
  }
}

/** Map raw skill API questions into the internal Question shape for the UI. */
export function mapSkillQuestions(
  questions: SkillAssessmentApiQuestion[],
): Question[] {
  return questions.map((q) => ({
    id: q.question_id,
    key: q.question_id,
    sourceQuestionNumber: q.question_number,
    inputType: mapSkillTypeToInputType(q.question_type),
    prompt: q.question_text,
    required: true,
    options: q.options ?? undefined,
  }));
}

function mapAdvancedTypeToInputType(
  type: AdvancedAssessmentQuestion["type"],
): InputTypeParams {
  switch (type) {
    case "mcq":
      return "single";
    case "short_text":
    case "long_text":
      return "text_required";
    default:
      return "text_required";
  }
}

/** Map advanced API questions into personal inputType values for the UI. */
export function mapAdvancedToPersonalQuestion(
  q: AdvancedAssessmentQuestion,
): Question {
  return {
    id: q.id,
    key: q.id,
    inputType: mapAdvancedTypeToInputType(q.type),
    prompt: q.prompt,
    required: true,
    options: q.options,
  };
}

export function mapAdvancedQuestions(
  questions: AdvancedAssessmentQuestion[],
): Question[] {
  return questions.map(mapAdvancedToPersonalQuestion);
}

/** Map resume API answers (keyed by question.key) to form state (keyed by question.id). */
export function buildPersonalPrefillAnswers(
  questions: Question[],
  answers: Record<string, string | string[]> | null | undefined,
): Record<string, string | string[]> {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return {};
  }
  const result: Record<string, string | string[]> = {};
  for (const q of questions) {
    const value = answers[q.key];
    if (value !== undefined) result[q.id] = value;
  }
  return result;
}

/** Build advanced submit payload from QuestionnaireFlow answers (keyed by question.key). */
export function toSubmitAnswers(
  questions: Question[],
  answersByKey: Record<string, string | string[]>,
): AdvancedAssessmentAnswer[] {
  const result: AdvancedAssessmentAnswer[] = [];
  for (const q of questions) {
    const value = answersByKey[q.key];
    if (
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }
    result.push({ questionId: q.id, value });
  }
  return result;
}

/** Build the skill submit payload from QuestionnaireFlow answers (keyed by question.key). */
export function toSkillSubmitAnswers(
  questions: Question[],
  answersByKey: Record<string, string | string[]>,
): SkillAssessmentSubmitAnswer[] {
  const result: SkillAssessmentSubmitAnswer[] = [];
  for (const q of questions) {
    const value = answersByKey[q.key];
    if (
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }
    result.push({
      question_id: q.id,
      answer: value,
      time_spent_seconds: 0,
    });
  }
  return result;
}
