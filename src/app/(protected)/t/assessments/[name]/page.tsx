import { notFound } from "next/navigation";

import { AssessmentPreviewPage } from "@/components/assessments/assessment-preview-page";
import { isAssessmentSlug } from "@/constants/assessment-previews";

type AssessmentPageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { name } = await params;

  if (!isAssessmentSlug(name)) {
    notFound();
  }

  return <AssessmentPreviewPage assessmentName={name} />;
}
