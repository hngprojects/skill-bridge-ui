import { AlertTriangle } from "lucide-react";

import type { AssessmentPreviewWarning as AssessmentPreviewWarningData } from "@/constants/assessment-previews";

type AssessmentPreviewWarningProps = {
  warning?: AssessmentPreviewWarningData;
};

function AssessmentPreviewWarning({ warning }: AssessmentPreviewWarningProps) {
  if (!warning) return null;

  return (
    <div className="mt-5 rounded-md border border-[#FDA29B] bg-[#FFFBFA] px-3 py-2 font-sans text-[10px] leading-3.5 text-[#B42318]">
      <div className="flex gap-1.5">
        <AlertTriangle className="mt-px size-3 shrink-0" aria-hidden />
        <p>
          <span className="font-semibold">{warning.title}</span>
          <br />
          <span>{warning.description}</span>
        </p>
      </div>
    </div>
  );
}

export { AssessmentPreviewWarning };
export type { AssessmentPreviewWarningProps };
