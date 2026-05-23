import type {
  AdvancedAssessmentApiQuestion,
  AdvancedAssessmentQuestionType,
  AdvancedAssessmentSubmitAnswer,
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
    minLength: q.min_length ?? undefined,
    maxLength: q.max_length ?? undefined,
  }));
}

function mapAdvancedTypeToInputType(type: AdvancedAssessmentQuestionType): {
  inputType: InputTypeParams;
  required: boolean;
} {
  switch (type) {
    case "single_pick":
      return { inputType: "single", required: true };
    case "multi_pick":
      return { inputType: "multi", required: true };
    case "required_text":
      return { inputType: "text_required", required: true };
    case "optional_text":
      return { inputType: "text_required", required: false };
    default:
      return { inputType: "text_required", required: true };
  }
}

/** Map raw advanced API questions into the internal Question shape for the UI. */
export function mapAdvancedQuestions(
  questions: AdvancedAssessmentApiQuestion[],
): Question[] {
  return questions.map((q) => {
    const { inputType, required } = mapAdvancedTypeToInputType(q.question_type);
    return {
      id: q.question_id,
      key: q.question_id,
      sourceQuestionNumber: q.question_number,
      inputType,
      prompt: q.question_text,
      required,
      options: q.options ?? undefined,
      minLength: q.min_length ?? undefined,
      maxLength: q.max_length ?? undefined,
    };
  });
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

/** Build the advanced submit payload from QuestionnaireFlow answers (keyed by question.key). */
export function toAdvancedSubmitAnswers(
  questions: Question[],
  answersByKey: Record<string, string | string[]>,
): AdvancedAssessmentSubmitAnswer[] {
  const result: AdvancedAssessmentSubmitAnswer[] = [];
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
