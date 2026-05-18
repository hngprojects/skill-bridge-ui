import { ClipboardCheck, Clock3, List } from "lucide-react";

import type { AssessmentPreview } from "@/constants/assessment-previews";

type AssessmentPreviewMetaProps = {
  assessment: AssessmentPreview;
};

function AssessmentPreviewMeta({ assessment }: AssessmentPreviewMetaProps) {
  const assessmentFacts = [
    {
      icon: List,
      label: assessment.questionCount,
    },
    {
      icon: Clock3,
      label: assessment.duration,
      strong: true,
    },
    {
      icon: ClipboardCheck,
      label: assessment.attempts,
    },
  ];

  return (
    <dl className="mt-4 flex flex-col gap-3">
      {assessmentFacts.map((fact) => {
        const Icon = fact.icon;

        return (
          <div
            key={fact.label}
            className="flex items-center gap-3 font-sans text-xs text-muted-foreground"
          >
            <Icon className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">{fact.label}</dt>
            <dd className={fact.strong ? "font-semibold text-foreground" : ""}>
              {fact.label}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export { AssessmentPreviewMeta };
export type { AssessmentPreviewMetaProps };
