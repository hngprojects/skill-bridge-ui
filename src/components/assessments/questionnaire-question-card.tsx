import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QuestionnaireQuestionField } from "@/components/assessments/questionnaire-question-field";
import type { Question } from "@/types/questionnaire";

type QuestionnaireQuestionCardProps = {
  question: Question;
  value: string | string[] | undefined;
  otherValue: string;
  onChange: (value: string | string[]) => void;
  onOtherChange: (value: string) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  isLast: boolean;
};

export function QuestionnaireQuestionCard({
  question,
  value,
  otherValue,
  onChange,
  onOtherChange,
  onNext,
  questionNumber,
  totalQuestions,
  isLast,
}: QuestionnaireQuestionCardProps) {
  const progressPercent = (questionNumber / totalQuestions) * 100;

  return (
    <Card className="min-h-128 flex-1 gap-0 py-0 ring-border/60">
      <CardContent className="flex min-h-96 flex-1 flex-col py-8">
        <QuestionnaireQuestionField
          question={question}
          value={value}
          otherValue={otherValue}
          onChange={onChange}
          onOtherChange={onOtherChange}
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t border-border/60 py-6">
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={questionNumber}
          aria-valuemin={0}
          aria-valuemax={totalQuestions}
          aria-label="Question progress"
        >
          <div
            className="h-full rounded-full bg-[#9B3048]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-4">
          <p className="font-sans text-sm text-muted-foreground">
            Question {questionNumber}/{totalQuestions}
          </p>
          <Button
            type="button"
            onClick={onNext}
            disabled={isLast}
            className="min-w-24 rounded-lg disabled:bg-muted-foreground/25 disabled:text-foreground disabled:opacity-100"
          >
            {isLast ? "Submit" : "Next"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
