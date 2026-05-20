import { QUESTION_BANK } from "@/constants/question-bank";
import type { InputTypeParams, Question } from "@/types/questionnaire";

type BankQuestion =
  (typeof QUESTION_BANK.sections)[number]["questions"][number];

const DYNAMIC_OPTIONS: Record<string, readonly string[]> = {
  q12: [
    "Frontend",
    "Backend",
    "Full stack",
    "Mobile",
    "Data engineering",
    "Other",
  ],
  q14: [
    "Git",
    "VS Code",
    "Figma",
    "Jira",
    "AWS",
    "Docker",
    "PostgreSQL",
    "Other",
  ],
};

function mapInputType(inputType: BankQuestion["input_type"]): InputTypeParams {
  switch (inputType) {
    case "text":
      return "text_required";
    case "single_pick":
      return "single";
    case "multi_pick":
      return "multi";
    default:
      return "text_required";
  }
}

function resolveOptions(q: BankQuestion): readonly string[] | undefined {
  if (!("options" in q)) return undefined;
  if (typeof q.options === "string") {
    return DYNAMIC_OPTIONS[q.id];
  }
  if (Array.isArray(q.options)) {
    return q.options;
  }
  return undefined;
}

function mapBankQuestion(
  q: BankQuestion,
  sectionNumber: number,
  sectionTitle: string,
): Question {
  const options = resolveOptions(q);
  const conditional =
    "conditional" in q && q.conditional?.reveals === "free_text_input"
      ? q.conditional
      : undefined;
  const hasOther =
    options?.includes("Other") ||
    (conditional?.trigger_option === "Yes" && conditional.reveals);

  return {
    id: q.id,
    key: q.id,
    sourceQuestionNumber: q.number,
    sourceSection: sectionNumber,
    sourceSectionTitle: sectionTitle,
    inputType: mapInputType(q.input_type),
    prompt: q.question,
    helperText: "hint" in q ? (q.hint ?? null) : null,
    required: q.required,
    minLength:
      "validation" in q && q.validation && "min_length" in q.validation
        ? q.validation.min_length
        : undefined,
    options,
    otherTextKey: hasOther ? `${q.id}_other` : undefined,
    conditional: conditional
      ? {
          trigger_option: conditional.trigger_option,
          reveals: "free_text_input",
        }
      : undefined,
  };
}

const bankQuestionById = new Map<string, Question>();

for (const [sectionIndex, section] of QUESTION_BANK.sections.entries()) {
  const sectionNumber = sectionIndex + 1;
  for (const q of section.questions) {
    bankQuestionById.set(
      q.id,
      mapBankQuestion(q, sectionNumber, section.title),
    );
  }
}

export function getBankQuestionById(id: string): Question | undefined {
  return bankQuestionById.get(id);
}

export function getBankQuestionsByIds(ids: readonly string[]): Question[] {
  return ids
    .map((id) => bankQuestionById.get(id))
    .filter((q): q is Question => q != null);
}
