import type { Question } from "@/types/questionnaire";

export function isAnswerValid(
  question: Question,
  value: string | string[] | undefined,
): boolean {
  if (!question.required) return true;
  if (value === undefined) return false;
  if (question.inputType === "text_required") {
    if (typeof value !== "string" || value.trim() === "") return false;
    if (question.minLength && value.trim().length < question.minLength)
      return false;
    return true;
  }
  if (question.inputType === "single") {
    return typeof value === "string" && value !== "";
  }
  if (question.inputType === "multi") {
    return Array.isArray(value) && value.length > 0;
  }
  return true;
}

export function buildAnswers(
  questions: Question[],
  answers: Record<string, string | string[]>,
  otherAnswers: Record<string, string>,
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};
  for (const question of questions) {
    const value = answers[question.id];
    if (
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result[question.key] = value;
    }
    if (question.otherTextKey) {
      const otherValue = otherAnswers[question.id];
      if (otherValue?.trim()) result[question.otherTextKey] = otherValue;
    }
  }
  return result;
}
