import Image from "next/image";
import { AlertTriangle } from "lucide-react";

import type { AssessmentPreview } from "@/constants/assessment-previews";

type AssessmentPreviewHeaderProps = {
  assessment: AssessmentPreview;
};

function AssessmentPreviewHeader({ assessment }: AssessmentPreviewHeaderProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <Image
          src={assessment.iconSrc}
          alt=""
          width={40}
          height={40}
          className="size-10 lg:size-14"
          aria-hidden
        />

        {assessment.retakeText ? (
          <div className="inline-flex items-center gap-1 rounded-md border border-[#F79009] bg-[#FFFAEB] px-1.5 text-[10px] font-medium text-[#181D27] lg:px-3 lg:py-1 lg:text-sm">
            <AlertTriangle className="size-3 lg:size-4" aria-hidden />
            <span>{assessment.retakeText}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-4 lg:mt-8">
        <h1 className="font-sans text-xl font-bold tracking-normal text-foreground lg:text-3xl">
          {assessment.title}
        </h1>
        <p className="mt-0.5 max-w-2xl font-sans text-xs leading-4 text-muted-foreground lg:mt-2 lg:text-base lg:leading-6">
          {assessment.description}
        </p>
      </div>
    </>
  );
}

export { AssessmentPreviewHeader };
export type { AssessmentPreviewHeaderProps };
