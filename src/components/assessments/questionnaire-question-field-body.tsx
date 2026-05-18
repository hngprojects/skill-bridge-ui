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

export function isOtherReveal(question: Question, value: string): boolean {
  return question.conditional?.trigger_option === value;
}

export function hasOtherReveal(
  question: Question,
  value: string | string[] | undefined,
): boolean {
  if (!question.conditional) return false;
  if (typeof value === "string") return isOtherReveal(question, value);
  if (Array.isArray(value))
    return value.some((v) => isOtherReveal(question, v));
  return false;
}

type QuestionnaireQuestionFieldBodyProps = {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
};

export function QuestionnaireQuestionFieldBody({
  question,
  value,
  onChange,
}: QuestionnaireQuestionFieldBodyProps) {
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
