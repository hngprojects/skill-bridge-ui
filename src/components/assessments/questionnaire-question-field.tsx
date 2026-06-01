import { Textarea } from "@/components/ui/textarea";
import {
  QuestionnaireQuestionFieldBody,
  hasOtherReveal,
} from "@/components/assessments/questionnaire-question-field-body";
import type { Question } from "@/types/questionnaire";

type QuestionnaireQuestionFieldProps = {
  question: Question;
  value: string | string[] | undefined;
  otherValue: string;
  onChange: (value: string | string[]) => void;
  onOtherChange: (value: string) => void;
};

export function QuestionnaireQuestionField({
  question,
  value,
  otherValue,
  onChange,
  onOtherChange,
}: QuestionnaireQuestionFieldProps) {
  const showOther = hasOtherReveal(question, value);

  return (
    <div className="flex w-full flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h2 className="font-sans text-base font-semibold text-foreground">
          {question.prompt}
          {question.required && (
            <span className="ml-1 text-[#9B3048]" aria-hidden>
              *
            </span>
          )}
          {question.required && <span className="sr-only"> (required)</span>}
          {question.inputType === "multi" && <SelectedCount value={value} />}
        </h2>
        {question.helperText && (
          <p className="font-sans text-sm text-muted-foreground">
            {question.helperText}
          </p>
        )}
      </header>

      <QuestionnaireQuestionFieldBody
        question={question}
        value={value}
        onChange={onChange}
      />

      {showOther && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${question.id}-other`}
            className="font-sans text-sm text-foreground"
          >
            Please specify
          </label>
          <Textarea
            id={`${question.id}-other`}
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Type your response here"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}

function SelectedCount({ value }: { value: string | string[] | undefined }) {
  const count = Array.isArray(value) ? value.length : 0;
  return (
    <span className="ml-2 font-sans text-sm font-medium text-[#9B3048]">
      ({count} selected)
    </span>
  );
}
