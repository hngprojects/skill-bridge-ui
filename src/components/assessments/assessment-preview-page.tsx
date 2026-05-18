import { AssessmentPreviewCard } from "@/components/assessments/assessment-preview-card";
import { getAssessmentPreview } from "@/constants/assessment-previews";

type AssessmentPreviewPageProps = {
  assessmentName: string;
};

function AssessmentPreviewPage({ assessmentName }: AssessmentPreviewPageProps) {
  const assessment = getAssessmentPreview(assessmentName);

  return (
    <div className="flex min-h-[calc(100dvh-72px)] items-start justify-center pt-11 pb-14 sm:pt-14 lg:pt-16">
      <div className="w-full max-w-[680px]">
        <AssessmentPreviewCard assessment={assessment} />
      </div>
    </div>
  );
}

export { AssessmentPreviewPage };
export type { AssessmentPreviewPageProps };
