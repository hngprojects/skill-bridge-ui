import { AssessmentPreviewExpectations } from "@/components/assessments/assessment-preview-expectations";
import { AssessmentPreviewFooter } from "@/components/assessments/assessment-preview-footer";
import { AssessmentPreviewHeader } from "@/components/assessments/assessment-preview-header";
import { AssessmentPreviewMeta } from "@/components/assessments/assessment-preview-meta";
import { AssessmentPreviewWarning } from "@/components/assessments/assessment-preview-warning";
import { Card, CardContent } from "@/components/ui/card";
import type { AssessmentPreview } from "@/constants/assessment-previews";

type AssessmentPreviewCardProps = {
  assessment: AssessmentPreview;
};

function AssessmentPreviewCard({ assessment }: AssessmentPreviewCardProps) {
  return (
    <Card className="w-full rounded-xl border border-[#D9D9D9] bg-white py-0 shadow-none">
      <CardContent className="px-4 py-4 sm:px-5 lg:px-6">
        <AssessmentPreviewHeader assessment={assessment} />
        <AssessmentPreviewMeta assessment={assessment} />
        <AssessmentPreviewExpectations />
        <AssessmentPreviewWarning warning={assessment.warning} />
        <AssessmentPreviewFooter assessmentSlug={assessment.slug} />
      </CardContent>
    </Card>
  );
}

export { AssessmentPreviewCard };
export type { AssessmentPreviewCardProps };
