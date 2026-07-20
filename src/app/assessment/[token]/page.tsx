import { ExternalAssessmentPage } from "@/components/external-assessment/external-assessment-page";

export default async function AssessmentTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = await params;
  return <ExternalAssessmentPage token={resolvedParams.token} />;
}
