"use client";

import { JdRichEditor } from "@/components/dashboard/employer/roles/create-role-wizard/jd-rich-editor";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ASSESSMENT_GUIDELINE_OPTIONS,
  DEFAULT_WELCOME_MESSAGE_HTML,
  WELCOME_MESSAGE_MAX_CHARS,
  type AssessmentGuidelineId,
} from "@/constants/create-assessment-wizard";

type CreateAssessmentDetailsStepProps = {
  welcomeMessageHtml: string;
  onWelcomeMessageChange: (html: string) => void;
  guidelines: Record<AssessmentGuidelineId, boolean>;
  onGuidelineChange: (id: AssessmentGuidelineId, checked: boolean) => void;
};

export function CreateAssessmentDetailsStep({
  welcomeMessageHtml,
  onWelcomeMessageChange,
  guidelines,
  onGuidelineChange,
}: CreateAssessmentDetailsStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Label className="font-sans text-base font-medium text-[#101828]">
          Welcome Message{" "}
          <span className="font-normal text-[#667085]">(Optional)</span>
        </Label>
        <JdRichEditor
          initialHtml={welcomeMessageHtml || DEFAULT_WELCOME_MESSAGE_HTML}
          onChange={onWelcomeMessageChange}
          placeholder="Write a welcome message for candidates…"
          maxChars={WELCOME_MESSAGE_MAX_CHARS}
          ariaLabel="Welcome message content"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-sans text-base font-medium text-[#101828]">
          Guidelines
        </p>
        <div className="flex flex-col gap-3">
          {ASSESSMENT_GUIDELINE_OPTIONS.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-[#E5E7EB] px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-sans text-sm font-medium text-[#101828]">
                  {option.label}
                </p>
                <p className="font-sans text-sm text-[#667085]">
                  {option.description}
                </p>
              </div>
              <Checkbox
                id={`guideline-${option.id}`}
                checked={guidelines[option.id]}
                onCheckedChange={(checked) =>
                  onGuidelineChange(option.id, checked === true)
                }
                className="size-5 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
