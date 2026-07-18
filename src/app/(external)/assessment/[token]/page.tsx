import { ExternalAssessmentPage } from "@/components/external-assessment/external-assessment-page";

export default function AssessmentTokenPage({
  params,
}: {
  params: { token: string };
}) {
  return <ExternalAssessmentPage token={params.token} />;
}
