"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

import {
  getSavedRoleById,
  type SavedRole,
} from "@/constants/employer-saved-roles";
import {
  useDiscoveryCandidateProfile,
  useSaveCandidate,
} from "@/hooks/api/use-employer-discovery";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

import { CandidateAvatar } from "../shared/candidate-avatar";
import { ConfirmSendOfferDialog } from "./edit-role-wizard/confirm-send-offer-dialog";
import {
  EDIT_ROLE_STEP_META,
  EDIT_ROLE_STEPS,
} from "./edit-role-wizard/constants";
import { EditRoleFooter } from "./edit-role-wizard/edit-role-footer";
import { EditRoleSidebar } from "./edit-role-wizard/edit-role-sidebar";
import {
  StepRoleDescription,
  type RoleDescriptionValues,
} from "./edit-role-wizard/step-role-description";
import {
  StepRoleDetails,
  type RoleDetailsValues,
} from "./edit-role-wizard/step-role-details";
import { StepPreview } from "./edit-role-wizard/step-preview";
import { StepTalentAssessment } from "./edit-role-wizard/step-talent-assessment";

type EmployerEditRolePageProps = {
  userId: string;
  roleId: string;
};

function buildJobDescriptionHtml(role: SavedRole): string {
  return role.sections
    .map((section) => {
      const lines = [section.heading];
      if (section.paragraph) lines.push("", section.paragraph);
      if (section.items?.length) lines.push("", ...section.items);
      return lines.join("<br>");
    })
    .join("<br><br>");
}

export function EmployerEditRolePage({
  userId,
  roleId,
}: EmployerEditRolePageProps) {
  const router = useRouter();
  const { data: candidate, isPending } = useDiscoveryCandidateProfile(userId);
  const { mutate: saveCandidate, isPending: isSubmittingOffer } =
    useSaveCandidate();
  const role = getSavedRoleById(roleId);

  const [currentStep, setCurrentStep] = useState(0);
  const [roleDescription, setRoleDescription] = useState<RoleDescriptionValues>(
    {
      roleTitle: role?.title ?? "",
      jdHtml: role ? buildJobDescriptionHtml(role) : "",
    },
  );
  const [roleDetails, setRoleDetails] = useState<RoleDetailsValues>({
    employmentType: role?.employmentType ?? "",
    experience: role?.experience ?? "",
    location: role?.location ?? "",
    skills: role?.skills ?? [],
    acceptsRelocation: role?.acceptsRelocation ? "yes" : "no",
  });
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<
    string | undefined
  >();
  const [isSendOfferModalOpen, setIsSendOfferModalOpen] = useState(false);
  const [sendScoreUpdates, setSendScoreUpdates] = useState(false);

  if (!role) {
    notFound();
  }

  const isLastStep = currentStep === EDIT_ROLE_STEPS.length - 1;
  const meta = EDIT_ROLE_STEP_META[currentStep];

  function handleNext() {
    if (isLastStep) {
      setIsSendOfferModalOpen(true);
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, EDIT_ROLE_STEPS.length - 1));
  }

  function handleBack() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function handleSubmitOffer() {
    saveCandidate(userId, {
      onSuccess: () => {
        setIsSendOfferModalOpen(false);
        appToast.success("Offer sent successfully.");
        router.push(`/e/talents/${userId}`);
      },
      onError: (error) => {
        appToast.error(authFailureMessage(error));
      },
    });
  }

  function handleViewAssessment() {
    appToast.success("Viewing assessments is coming soon.");
  }

  return (
    <div className="mx-auto max-w-274 space-y-6 py-6 sm:py-8">
      <div className="flex flex-col gap-4 border-b border-[#ebebeb] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <CandidateAvatar
            avatarUrl={candidate?.avatar_url ?? null}
            fullName={candidate?.full_name ?? ""}
            className="size-14 text-base"
          />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-[#151515]">
              {isPending ? "Loading…" : candidate?.full_name}
            </p>
            <div className="flex items-center gap-2 text-sm font-light tracking-[0.017em] text-[#151515]">
              <span>{candidate?.role}</span>
              {candidate?.seniority_badge ? (
                <>
                  <span className="size-0.75 shrink-0 rounded-full bg-[#151515]" />
                  <span>{candidate.seniority_badge}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <Link
          href={`/e/talents/${userId}/offer/${roleId}`}
          className="flex items-center gap-2 text-base font-medium tracking-[0.017em] text-[#151515]"
        >
          Save and Exit
          <LogOut className="size-5" aria-hidden />
        </Link>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <EditRoleSidebar
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <div className="flex flex-1 flex-col gap-6 rounded-3xl border border-[#dbdbdb] bg-white p-6">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold text-[#151515]">
              {meta.title}
            </p>
            <p className="text-base font-light tracking-[0.017em] text-[#151515]">
              {meta.description}
            </p>
          </div>

          {currentStep === 0 ? (
            <StepRoleDescription
              values={roleDescription}
              onChange={setRoleDescription}
            />
          ) : currentStep === 1 ? (
            <StepRoleDetails values={roleDetails} onChange={setRoleDetails} />
          ) : currentStep === 2 ? (
            <StepTalentAssessment
              selectedAssessmentId={selectedAssessmentId}
              onSelect={setSelectedAssessmentId}
            />
          ) : (
            <StepPreview
              role={role}
              roleDescription={roleDescription}
              roleDetails={roleDetails}
              selectedAssessmentId={selectedAssessmentId}
              onViewAssessment={handleViewAssessment}
            />
          )}

          <EditRoleFooter
            currentStep={currentStep}
            totalSteps={EDIT_ROLE_STEPS.length}
            onBack={handleBack}
            onNext={handleNext}
            isLastStep={isLastStep}
          />
        </div>
      </div>

      <ConfirmSendOfferDialog
        open={isSendOfferModalOpen}
        onOpenChange={setIsSendOfferModalOpen}
        candidateName={candidate?.full_name}
        scorePercentage={candidate?.score_percentage}
        sendScoreUpdates={sendScoreUpdates}
        onSendScoreUpdatesChange={setSendScoreUpdates}
        onSubmit={handleSubmitOffer}
        isSubmitting={isSubmittingOffer}
      />
    </div>
  );
}
