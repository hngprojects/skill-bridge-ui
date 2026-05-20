import {
  Clock01Icon,
  LeftToRightListBulletIcon,
  TaskDone01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import type { AssessmentPreview } from "@/constants/assessment-previews";

type AssessmentPreviewMetaProps = {
  assessment: AssessmentPreview;
};

type AssessmentFact = {
  id: string;
  icon: IconSvgElement;
  label: string;
  strong?: boolean;
};

function AssessmentPreviewMeta({ assessment }: AssessmentPreviewMetaProps) {
  const assessmentFacts: AssessmentFact[] = [
    {
      id: "question-count",
      icon: LeftToRightListBulletIcon,
      label: assessment.questionCount,
    },
    {
      id: "duration",
      icon: Clock01Icon,
      label: assessment.duration,
      strong: true,
    },
    {
      id: "attempts",
      icon: TaskDone01Icon,
      label: assessment.attempts,
    },
  ];

  return (
    <dl className="mt-4 flex flex-col gap-3 2xl:mt-6 2xl:gap-4">
      {assessmentFacts.map((fact) => (
        <div
          key={fact.id}
          className="flex items-center gap-3 font-sans text-xs text-muted-foreground 2xl:gap-4 2xl:text-base"
        >
          <HugeiconsIcon
            icon={fact.icon}
            size={18}
            strokeWidth={1.5}
            className="text-muted-foreground 2xl:size-5"
            aria-hidden
          />
          <dt className="sr-only">{fact.label}</dt>
          <dd className={fact.strong ? "font-semibold text-foreground" : ""}>
            {fact.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { AssessmentPreviewMeta };
export type { AssessmentPreviewMetaProps };
