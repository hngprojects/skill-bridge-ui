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
          aria-hidden
        />

        <div className="inline-flex h-5 items-center gap-1 rounded-md border border-[#F79009] bg-[#FFFAEB] px-1.5 text-[10px] font-medium text-[#181D27]">
          <AlertTriangle className="size-3" aria-hidden />
          <span>{assessment.retakeText}</span>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="font-sans text-xl font-bold tracking-normal text-foreground">
          {assessment.title}
        </h1>
        <p className="mt-0.5 max-w-2xl font-sans text-xs leading-4 text-muted-foreground">
          {assessment.description}
        </p>
      </div>
    </>
  );
}

export { AssessmentPreviewHeader };
export type { AssessmentPreviewHeaderProps };
