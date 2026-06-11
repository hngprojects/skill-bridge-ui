"use client";

import { FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAssessmentCatalogue } from "@/hooks/api/use-employer-roles";

import type { RoleDescriptionValues } from "./step-role-description";
import type { RoleDetailsValues } from "./step-role-details";

type StepPreviewProps = {
  roleDescription: RoleDescriptionValues;
  roleDetails: RoleDetailsValues;
  selectedAssessmentId: string | undefined;
  /** Pre-formatted salary range from the backend role record (e.g. "NGN
   *  200000-250000"). Falls back to em-dash when nothing is set. */
  salaryRangeLabel?: string;
  educationLabel?: string;
  onViewAssessment: () => void;
};

export function StepPreview({
  roleDescription,
  roleDetails,
  selectedAssessmentId,
  salaryRangeLabel,
  educationLabel,
  onViewAssessment,
}: StepPreviewProps) {
  const { data } = useAssessmentCatalogue();
  const selectedAssessment = data?.catalogue.find(
    (option) => option.id === selectedAssessmentId,
  );

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-[#fbfbfb] p-4">
      <div className="flex h-11 w-full items-center rounded-lg border border-[#d9d9d9] bg-white px-4">
        <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
          {roleDescription.roleTitle}
        </p>
      </div>

      <div className="h-px w-full bg-[#dbdbdb]" />

      <div
        className="max-h-69 overflow-y-auto rounded-lg border border-[#dbdbdb] bg-white p-4 text-base font-light tracking-[0.017em] text-[#151515]"
        dangerouslySetInnerHTML={{ __html: roleDescription.jdHtml }}
      />

      <div className="h-px w-full bg-[#dbdbdb]" />

      <div className="grid grid-cols-1 gap-5 rounded-lg border border-[#dbdbdb] bg-white p-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
            Employment type
          </p>
          <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
            {roleDetails.employmentType || "—"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
            Experience
          </p>
          <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
            {roleDetails.experience || "—"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
            Salary range
          </p>
          <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
            {salaryRangeLabel || "—"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
            Education
          </p>
          <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
            {educationLabel || "—"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
            Keyword
          </p>
          <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
            {roleDetails.skills[0]
              ? `#${roleDetails.skills[0].replace(/\s+/g, "")}`
              : "—"}
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-[#dbdbdb]" />

      <div className="flex flex-col gap-4 rounded-lg border border-[#dbdbdb] bg-white p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-1 items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#10242f]">
            <FlaskConical className="size-6 text-white" aria-hidden />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[#151515]">
              {selectedAssessment?.title ?? "No assessment selected"}
            </p>
            {selectedAssessment ? (
              <>
                <p className="text-base text-[#151515]">
                  {selectedAssessment.role_track} ·{" "}
                  {selectedAssessment.experience_level}
                </p>
                <p className="text-sm text-[#757575]">
                  Estimated time: {selectedAssessment.estimated_completion_time}
                </p>
              </>
            ) : null}
          </div>
        </div>
        {selectedAssessment ? (
          <Button
            type="button"
            variant="link"
            onClick={onViewAssessment}
            className="h-auto shrink-0 p-0 text-base font-semibold text-[#05060f] underline"
          >
            View assessment
          </Button>
        ) : null}
      </div>
    </div>
  );
}
