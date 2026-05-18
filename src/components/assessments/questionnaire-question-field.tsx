"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MULTI_PICK_PILL_THRESHOLD = 8;

export type QuestionInputType = "text" | "single_pick" | "multi_pick";

export type Question = {
  id: string;
  question: string;
  hint?: string;
  input_type: QuestionInputType;
  required: boolean;
  options?: readonly string[];
  conditional?: { trigger_option: string; reveals: "free_text_input" };
};

type QuestionnaireQuestionFieldProps = {
  question: Question;
  value: string | string[] | undefined;
  otherValue: string;
  onChange: (value: string | string[]) => void;
  onOtherChange: (value: string) => void;
};

function isOtherReveal(question: Question, value: string): boolean {
  return question.conditional?.trigger_option === value;
}

function hasOtherReveal(
  question: Question,
  value: string | string[] | undefined,
): boolean {
  if (!question.conditional) return false;
  if (typeof value === "string") return isOtherReveal(question, value);
  if (Array.isArray(value))
    return value.some((v) => isOtherReveal(question, v));
  return false;
}

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
          {question.question}
          {question.required && (
            <span className="ml-1 text-[#9B3048]" aria-hidden>
              *
            </span>
          )}
          {question.required && <span className="sr-only"> (required)</span>}
          {question.input_type === "multi_pick" && (
            <SelectedCount value={value} />
          )}
        </h2>
        {question.hint && (
          <p className="font-sans text-sm text-muted-foreground">
            {question.hint}
          </p>
        )}
      </header>

      <FieldBody question={question} value={value} onChange={onChange} />

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

function FieldBody({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}) {
  switch (question.input_type) {
    case "text":
      return (
        <Textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your response here"
          rows={5}
        />
      );

    case "single_pick": {
      const options = question.options ?? [];
      const selected = typeof value === "string" ? value : "";
      return (
        <RadioGroup
          value={selected}
          onValueChange={(v) => onChange(v)}
          className="flex flex-col gap-3"
        >
          {options.map((option) => {
            const id = `${question.id}-${option}`;
            const isSelected = selected === option;
            return (
              <label
                key={option}
                htmlFor={id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border bg-muted/40 px-4 py-3 font-sans text-sm transition-colors",
                  isSelected
                    ? "border-foreground/30 bg-muted/70"
                    : "border-transparent hover:bg-muted/60",
                )}
              >
                <RadioGroupItem id={id} value={option} />
                <span>{option}</span>
                {isOtherReveal(question, option) && isSelected && (
                  <span className="sr-only"> — additional input required</span>
                )}
              </label>
            );
          })}
        </RadioGroup>
      );
    }

    case "multi_pick": {
      const options = question.options ?? [];
      const selected = Array.isArray(value) ? value : [];
      const toggle = (option: string, checked: boolean) => {
        const next = checked
          ? Array.from(new Set([...selected, option]))
          : selected.filter((v) => v !== option);
        onChange(next);
      };
      const asPills = options.length > MULTI_PICK_PILL_THRESHOLD;
      return (
        <div
          className={cn(
            asPills ? "flex flex-wrap gap-3" : "flex flex-col gap-3",
          )}
        >
          {options.map((option) => {
            const id = `${question.id}-${option}`;
            const isSelected = selected.includes(option);
            return (
              <label
                key={option}
                htmlFor={id}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 border bg-muted/40 font-sans text-sm transition-colors",
                  asPills ? "rounded-full px-4 py-2" : "rounded-lg px-4 py-3",
                  isSelected
                    ? "border-foreground/30 bg-muted/70"
                    : "border-transparent hover:bg-muted/60",
                )}
              >
                <Checkbox
                  id={id}
                  checked={isSelected}
                  onCheckedChange={(c) => toggle(option, c === true)}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    default:
      return null;
  }
}
