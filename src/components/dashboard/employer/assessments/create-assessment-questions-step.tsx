"use client";

import Image from "next/image";

import { Switch } from "@/components/ui/switch";
import {
  ASSESSMENT_QUESTION_ICON,
  ASSESSMENT_QUESTION_OPTIONS,
  type AssessmentQuestionOptionId,
} from "@/constants/create-assessment-wizard";
import { cn } from "@/lib/utils";

type CreateAssessmentQuestionsStepProps = {
  selectedQuestionIds: AssessmentQuestionOptionId[];
  onSelectionChange: (ids: AssessmentQuestionOptionId[]) => void;
};

export function CreateAssessmentQuestionsStep({
  selectedQuestionIds,
  onSelectionChange,
}: CreateAssessmentQuestionsStepProps) {
  const toggleQuestion = (
    questionId: AssessmentQuestionOptionId,
    checked: boolean,
  ) => {
    if (checked) {
      onSelectionChange([...selectedQuestionIds, questionId]);
      return;
    }

    onSelectionChange(selectedQuestionIds.filter((id) => id !== questionId));
  };

  return (
    <div className="flex flex-col gap-3">
      {ASSESSMENT_QUESTION_OPTIONS.map((option) => {
        const isSelected = selectedQuestionIds.includes(option.id);

        return (
          <div
            key={option.id}
            className={cn(
              "flex items-start gap-4 rounded-xl border bg-white p-4 transition-colors",
              isSelected ? "border-[#34A853]" : "border-[#E5E7EB]",
            )}
          >
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#153140]">
              <Image
                src={ASSESSMENT_QUESTION_ICON}
                alt=""
                width={40}
                height={40}
                aria-hidden
                className="size-10 object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-sans text-sm font-semibold text-[#101828]">
                {option.title}
              </p>
              <p className="mt-1 font-sans text-sm leading-5 text-[#667085]">
                {option.description}
              </p>
              <p className="mt-2 font-sans text-xs text-[#667085]">
                Estimated time: {option.estimatedTime}
              </p>
              {option.recommended ? (
                <p className="mt-1 font-sans text-xs font-medium text-[#34A853]">
                  Recommended for this role
                </p>
              ) : null}
            </div>

            <Switch
              checked={isSelected}
              onCheckedChange={(checked) =>
                toggleQuestion(option.id, checked === true)
              }
              aria-label={`Include ${option.title}`}
              className="mt-1 shrink-0 data-checked:bg-[#111827]"
            />
          </div>
        );
      })}
    </div>
  );
}
