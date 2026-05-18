import { AssessmentPreviewPage } from "@/components/assessments/assessment-preview-page";

type AssessmentPageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { name } = await params;

  return <AssessmentPreviewPage assessmentName={name} />;
}
