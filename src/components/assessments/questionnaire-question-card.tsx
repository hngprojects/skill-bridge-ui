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
  onBack?: () => void;
  questionNumber: number;
  totalQuestions: number;
  isLast: boolean;
  showBack?: boolean;
  nextDisabled?: boolean;
  nextLoading?: boolean;
};

export function QuestionnaireQuestionCard({
  question,
  value,
  otherValue,
  onChange,
  onOtherChange,
  onNext,
  onBack,
  questionNumber,
  totalQuestions,
  isLast,
  showBack = false,
  nextDisabled = false,
  nextLoading = false,
}: QuestionnaireQuestionCardProps) {
  const progressPercent = (questionNumber / totalQuestions) * 100;

  return (
    <Card className="min-h-128 flex-1 gap-0 rounded-none border-0 bg-transparent py-0 ring-0 shadow-none lg:rounded-xl lg:border lg:bg-card lg:ring-1 lg:shadow-sm">
      <CardContent className="flex min-h-96 flex-1 flex-col px-0 py-6 lg:px-6 lg:py-8">
        <QuestionnaireQuestionField
          question={question}
          value={value}
          otherValue={otherValue}
          onChange={onChange}
          onOtherChange={onOtherChange}
        />
      </CardContent>
      <CardFooter className="hidden flex-col gap-4 border-t border-border/60 py-6 lg:flex">
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
          <div className="flex items-center gap-3">
            <p className="font-sans text-sm text-muted-foreground">
              Question {questionNumber}/{totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                className="min-w-24 rounded-lg disabled:bg-muted-foreground/25 disabled:text-foreground disabled:opacity-100 bg-[#CBD5E1] text-primary hover:bg-[#BCC9D9] hover:text-primary/60"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={onNext}
              disabled={nextDisabled || nextLoading}
              className="min-w-24 rounded-lg disabled:bg-muted-foreground/25 disabled:text-foreground disabled:opacity-100"
            >
              {nextLoading ? "Submitting..." : isLast ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
