"use client";

import { useMemo, useState } from "react";

import {
  ASSESSMENT_CATALOG_STEPS,
  ASSESSMENT_CATALOG_TABS,
  type AssessmentCatalogCategory,
} from "@/constants/assessment-roadmap";
import { useDashboardHome } from "@/hooks/api/use-dashboard";
import { isAssessmentDemoMode, useDemoCatalogSteps } from "@/mock/assessment";

import { AssessmentCatalogCard } from "./assessment-catalog-card";
import { AssessmentCatalogTabs } from "./assessment-catalog-tabs";
import { applyDashboardHomeToCatalogSteps } from "./dashboard-home-state";

type AssessmentCatalogPageProps = {
  initialActiveTab: AssessmentCatalogCategory;
};

export function AssessmentCatalogPage({
  initialActiveTab,
}: AssessmentCatalogPageProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const demoSteps = useDemoCatalogSteps();
  const { data: dashboardHome } = useDashboardHome();
  const catalogSteps = useMemo(() => {
    if (isAssessmentDemoMode()) return demoSteps;
    return applyDashboardHomeToCatalogSteps(
      ASSESSMENT_CATALOG_STEPS,
      dashboardHome,
    );
  }, [demoSteps, dashboardHome]);
  const visibleSteps =
    activeTab === "all"
      ? catalogSteps
      : catalogSteps.filter((step) => step.category === activeTab);

  return (
    <div className="mx-auto max-w-[1096px] animate-in fade-in slide-in-from-bottom-1 px-1 py-6 duration-500 sm:px-0 sm:py-8">
      <AssessmentCatalogTabs
        tabs={ASSESSMENT_CATALOG_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-4">
        {visibleSteps.map((step) => (
          <AssessmentCatalogCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
