"use client";

import Image from "next/image";
import { toast } from "sonner";

import {
  ASSESSMENT_QUESTION_ICON,
  getAssessmentQuestionOptionsByIds,
  type AssessmentQuestionOptionId,
} from "@/constants/create-assessment-wizard";
import {
  formatAssessmentCategoryLabel,
  formatAssessmentDeadlineSummary,
  htmlToPlainText,
} from "@/lib/create-assessment-utils";

type CreateAssessmentPreviewStepProps = {
  welcomeMessageHtml: string;
  category: string;
  passRate: number;
  deadline?: Date;
  selectedQuestionIds: AssessmentQuestionOptionId[];
};

function PreviewSummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <p className="font-sans text-xs text-[#667085]">{label}</p>
      <p className="font-sans text-sm font-semibold text-[#101828]">{value}</p>
    </div>
  );
}

export function CreateAssessmentPreviewStep({
  welcomeMessageHtml,
  category,
  passRate,
  deadline,
  selectedQuestionIds,
}: CreateAssessmentPreviewStepProps) {
  const welcomeMessage = htmlToPlainText(welcomeMessageHtml);
  const selectedQuestions =
    getAssessmentQuestionOptionsByIds(selectedQuestionIds);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-4">
        <p className="whitespace-pre-wrap font-sans text-sm leading-6 text-[#101828]">
          {welcomeMessage}
        </p>
      </div>

      <div className="flex flex-col gap-4 border-y border-[#E5E7EB] py-4 sm:flex-row sm:items-start sm:gap-6">
        <PreviewSummaryItem
          label="Deadline"
          value={deadline ? formatAssessmentDeadlineSummary(deadline) : "—"}
        />
        <PreviewSummaryItem
          label="Category"
          value={formatAssessmentCategoryLabel(category) || "—"}
        />
        <PreviewSummaryItem label="Pass rate" value={`${passRate}%`} />
      </div>

      <div className="flex flex-col gap-3">
        {selectedQuestions.map((option) => (
          <div
            key={option.id}
            className="flex items-start gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4"
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
              <div className="flex items-start justify-between gap-3">
                <p className="font-sans text-sm font-semibold text-[#101828]">
                  {option.title}
                </p>
                <button
                  type="button"
                  onClick={() => toast("Assessment preview is coming soon.")}
                  className="shrink-0 font-sans text-sm font-medium text-[#101828] underline underline-offset-2 transition-opacity hover:opacity-70"
                >
                  View assessment
                </button>
              </div>
              <p className="mt-1 font-sans text-sm leading-5 text-[#667085]">
                {option.description}
              </p>
              <p className="mt-2 font-sans text-xs text-[#667085]">
                Estimated time: {option.estimatedTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
