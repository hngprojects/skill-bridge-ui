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
          className="size-10 2xl:size-[60px]"
          aria-hidden
        />

        <div className="inline-flex h-5 items-center gap-1 rounded-md border border-[#F79009] bg-[#FFFAEB] px-1.5 text-[10px] font-medium text-[#181D27] 2xl:h-8 2xl:px-3 2xl:text-sm">
          <AlertTriangle className="size-3 2xl:size-4" aria-hidden />
          <span>{assessment.retakeText}</span>
        </div>
      </div>

      <div className="mt-4 2xl:mt-8">
        <h1 className="font-sans text-xl font-bold tracking-normal text-foreground 2xl:text-3xl">
          {assessment.title}
        </h1>
        <p className="mt-0.5 max-w-2xl font-sans text-xs leading-4 text-muted-foreground 2xl:mt-2 2xl:text-base 2xl:leading-6">
          {assessment.description}
        </p>
      </div>
    </>
  );
}

export { AssessmentPreviewHeader };
export type { AssessmentPreviewHeaderProps };
