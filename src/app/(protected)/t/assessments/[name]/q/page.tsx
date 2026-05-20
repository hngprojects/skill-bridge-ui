import { notFound } from "next/navigation";

import { QuestionnairePageClient } from "@/components/assessments/questionnaire-page-client";
import { isAssessmentSlug } from "@/constants/assessment-previews";

type QuestionnairePageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function QuestionnairePage({
  params,
}: QuestionnairePageProps) {
  const { name } = await params;

  if (!isAssessmentSlug(name)) {
    notFound();
  }

  return <QuestionnairePageClient />;
}
