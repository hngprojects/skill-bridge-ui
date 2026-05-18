import {
  ASSESSMENT_CATALOG_STEPS,
  ASSESSMENT_CATALOG_TABS,
  type AssessmentCatalogCategory,
} from "@/constants/assessment-roadmap";

import { AssessmentCatalogCard } from "./assessment-catalog-card";
import { AssessmentCatalogTabs } from "./assessment-catalog-tabs";

type AssessmentCatalogPageProps = {
  activeTab: AssessmentCatalogCategory;
};

export function AssessmentCatalogPage({
  activeTab,
}: AssessmentCatalogPageProps) {
  const visibleSteps =
    activeTab === "all"
      ? ASSESSMENT_CATALOG_STEPS
      : ASSESSMENT_CATALOG_STEPS.filter((step) => step.category === activeTab);

  return (
    <div className="mx-auto max-w-[1096px] px-1 py-6 sm:px-0 sm:py-8">
      <AssessmentCatalogTabs
        tabs={ASSESSMENT_CATALOG_TABS}
        activeTab={activeTab}
      />

      <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-4">
        {visibleSteps.map((step) => (
          <AssessmentCatalogCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
