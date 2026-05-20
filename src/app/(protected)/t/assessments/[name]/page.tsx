import { notFound, redirect } from "next/navigation";

import { AssessmentPreviewPage } from "@/components/assessments/assessment-preview-page";
import { ASSESSMENT_CATALOG_TABS } from "@/constants/assessment-roadmap";
import { isAssessmentSlug } from "@/constants/assessment-previews";

type AssessmentPageProps = {
  params: Promise<{ name: string }>;
};

function isAssessmentCatalogAlias(name: string): boolean {
  return ASSESSMENT_CATALOG_TABS.some(
    (tab) => tab.id === name || tab.aliases?.includes(name),
  );
}

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { name } = await params;

  if (!isAssessmentSlug(name)) {
    if (isAssessmentCatalogAlias(name)) {
      redirect("/t/assessments");
    }

    notFound();
  }

  return <AssessmentPreviewPage assessmentName={name} />;
}
