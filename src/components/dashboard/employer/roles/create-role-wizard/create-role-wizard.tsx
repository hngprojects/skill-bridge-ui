"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CREATE_ROLE_STEPS,
  CREATE_ROLE_STEP_META,
  type CreateRoleStepId,
} from "@/constants/create-role-wizard";
import { workPreferencesSchema } from "@/types/create-role-schema";
import { useCreatedRoleStore } from "@/stores/created-role-store";

import { WizardRoleHeader } from "./wizard-role-header";
import { WizardSidebar } from "./wizard-sidebar";
import { StepUploadJd, type UploadJdValues } from "./step-upload-jd";
import {
  StepWorkPreferences,
  INITIAL_WORK_PREFERENCES,
} from "./step-work-preferences";
import type { WorkPreferencesValues } from "@/types/create-role-schema";
import { StepTalentAssessment } from "./step-talent-assessment";
import { StepPreview } from "./step-preview";

type WizardState = {
  uploadJd: UploadJdValues;
  workPreferences: WorkPreferencesValues;
  selectedAssessments: string[];
};

const INITIAL_STATE: WizardState = {
  uploadJd: { jdHtml: "", jdFile: null },
  workPreferences: INITIAL_WORK_PREFERENCES,
  selectedAssessments: [],
};

function getStripWidth(index: number) {
  return `${((index + 1) / CREATE_ROLE_STEPS.length) * 100}%`;
}

function isStepValid(stepId: CreateRoleStepId, state: WizardState): boolean {
  if (stepId === "upload-jd") {
    const { jdHtml, jdFile } = state.uploadJd;
    const hasText = jdHtml.replace(/<[^>]*>/g, "").trim().length > 0;
    return hasText || jdFile !== null;
  }
  if (stepId === "work-preferences") {
    return workPreferencesSchema.safeParse(state.workPreferences).success;
  }
  return true;
}

export function CreateRoleWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roleTitle = searchParams.get("title") ?? "";
  const category = searchParams.get("category") ?? "";
  const companyUrl = searchParams.get("companyUrl") ?? "";

  const [currentStepId, setCurrentStepId] =
    useState<CreateRoleStepId>("upload-jd");
  const [wizardState, setWizardState] = useState<WizardState>(INITIAL_STATE);

  const currentIndex = CREATE_ROLE_STEPS.findIndex(
    (s) => s.id === currentStepId,
  );
  const isLastStep = currentIndex === CREATE_ROLE_STEPS.length - 1;
  const meta = CREATE_ROLE_STEP_META[currentStepId];
  const nextDisabled = !isStepValid(currentStepId, wizardState);

  const handleNext = () => {
    if (isLastStep) {
      useCreatedRoleStore.getState().setRole({
        title: roleTitle,
        category,
        companyUrl,
        uploadJd: wizardState.uploadJd,
        workPreferences: wizardState.workPreferences,
        selectedAssessments: wizardState.selectedAssessments,
      });
      router.push("/e/roles/create/success");
      return;
    }
    setCurrentStepId(CREATE_ROLE_STEPS[currentIndex + 1].id);
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      router.push("/e/roles");
      return;
    }
    setCurrentStepId(CREATE_ROLE_STEPS[currentIndex - 1].id);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <WizardRoleHeader
        title={roleTitle}
        category={category}
        companyUrl={companyUrl}
        onSaveAndExit={() => router.push("/e/roles")}
      />

      {/* Mobile step indicator */}
      <div className="lg:hidden">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded-full bg-[#079455] text-white">
            <Check className="size-3 stroke-[2.5]" />
          </div>
          <p className="text-sm font-semibold text-[#101828]">
            Step {currentIndex + 1} of {CREATE_ROLE_STEPS.length} ·{" "}
            {CREATE_ROLE_STEPS[currentIndex].title}
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={CREATE_ROLE_STEPS.length}
          className="h-1 w-full overflow-hidden rounded-full bg-[#E5E7EB]"
        >
          <div
            className="h-full rounded-full bg-[#EF4444] transition-[width] duration-300"
            style={{ width: getStripWidth(currentIndex) }}
          />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start gap-5">
        {/* Sidebar card */}
        <aside className="hidden w-56 shrink-0 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm lg:block">
          <WizardSidebar currentStepId={currentStepId} />
        </aside>

        {/* Main card */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
          {/* Step header */}
          <div className="px-8 pt-8">
            <h1 className="text-xl font-bold leading-tight text-[#101828]">
              {meta.title}
            </h1>
            <p className="mt-1 text-sm leading-6 text-[#667085]">
              {meta.description}
            </p>
          </div>

          {/* Step content */}
          <div className="flex-1 px-8 py-6">
            {currentStepId === "upload-jd" && (
              <StepUploadJd
                values={wizardState.uploadJd}
                onChange={(uploadJd) =>
                  setWizardState((s) => ({ ...s, uploadJd }))
                }
              />
            )}
            {currentStepId === "work-preferences" && (
              <StepWorkPreferences
                values={wizardState.workPreferences}
                onChange={(workPreferences) =>
                  setWizardState((s) => ({ ...s, workPreferences }))
                }
              />
            )}
            {currentStepId === "talent-assessment" && (
              <StepTalentAssessment
                selectedAssessments={wizardState.selectedAssessments}
                onSelectionChange={(selectedAssessments) =>
                  setWizardState((s) => ({ ...s, selectedAssessments }))
                }
              />
            )}
            {currentStepId === "preview" && (
              <StepPreview
                uploadJd={wizardState.uploadJd}
                workPreferences={wizardState.workPreferences}
                selectedAssessments={wizardState.selectedAssessments}
              />
            )}
          </div>

          {/* Step progress strip */}
          <div className="h-1 w-full overflow-hidden bg-[#F2F4F7]">
            <div
              className="h-full bg-[#EF4444] transition-[width] duration-300 ease-out"
              style={{ width: getStripWidth(currentIndex) }}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-8 py-5">
            {currentIndex === 0 ? (
              <p className="text-sm text-[#98A2B3]">{meta.tip}</p>
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                className="h-9 rounded-xl border border-[#E5E7EB] px-5 text-sm text-[#667085] hover:bg-[#F9FAFB]"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              disabled={nextDisabled}
              onClick={handleNext}
              className="h-9 min-w-24 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white hover:bg-[#111827]/90 disabled:opacity-40"
            >
              {isLastStep ? "Create Role" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
