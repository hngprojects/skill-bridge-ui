"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QUESTION_BANK_TOTAL_QUESTIONS } from "@/constants/question-bank";

export function QuestionnaireQuestionCard() {
  return (
    <Card className="min-h-[32rem] flex-1 gap-0 py-0 ring-border/60">
      <CardContent className="flex min-h-[24rem] flex-1 flex-col py-8" />
      <CardFooter className="flex flex-col gap-4 border-t border-border/60 py-6">
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={1}
          aria-valuemin={0}
          aria-valuemax={QUESTION_BANK_TOTAL_QUESTIONS}
          aria-label="Question progress"
        >
          <div className="h-full w-[12%] rounded-full bg-[#9B3048]" />
        </div>
        <div className="w-full flex items-center justify-between gap-4">
          <p className="font-sans text-sm text-muted-foreground">
            Question 1/{QUESTION_BANK_TOTAL_QUESTIONS}
          </p>
          <Button
            type="button"
            disabled
            className="min-w-24 rounded-lg bg-muted-foreground/25 text-foreground hover:bg-muted-foreground/25"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
