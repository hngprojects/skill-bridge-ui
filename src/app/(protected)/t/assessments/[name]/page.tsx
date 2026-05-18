import { AssessmentCatalogPage } from "@/components/assessments/assessment-catalog-page";
import {
  ASSESSMENT_CATALOG_TABS,
  type AssessmentCatalogCategory,
} from "@/constants/assessment-roadmap";

type AssessmentPageProps = {
  params: Promise<{ name: string }>;
};

function resolveAssessmentTab(name: string): AssessmentCatalogCategory {
  const match = ASSESSMENT_CATALOG_TABS.find(
    (tab) => tab.id === name || tab.aliases?.includes(name),
  );

  return match?.id ?? "job-assessment";
}

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { name } = await params;

  return <AssessmentCatalogPage activeTab={resolveAssessmentTab(name)} />;
}
