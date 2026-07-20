"use client";

import { useState } from "react";
import { ExternalSignupStep } from "./external-signup-step";
import { ExternalConsentStep } from "./external-consent-step";
import { ExternalAssessmentStep } from "./external-assessment-step";
import { ExternalConfirmationStep } from "./external-confirmation-step";
import {
  useRegisterExternalApplicant,
  useSubmitExternalAssessment,
} from "@/hooks/api/use-external-assessment";
import { toast } from "sonner";

type Step = "signup" | "consent" | "assessment" | "confirmation";

export function ExternalAssessmentPage({ token }: { token: string }) {
  const [currentStep, setCurrentStep] = useState<Step>("signup");
  const [email, setEmail] = useState("");
  const [applicantId, setApplicantId] = useState<string | null>(null);

  const { mutate: register, isPending: isRegistering } =
    useRegisterExternalApplicant();
  const { mutate: submit, isPending: isSubmitting } =
    useSubmitExternalAssessment();

  const handleSignupComplete = (emailStr: string) => {
    setEmail(emailStr);
    setCurrentStep("consent");
  };

  const handleConsentComplete = (consented: boolean) => {
    register(
      { token, email, consentedMarketing: consented },
      {
        onSuccess: (data) => {
          setApplicantId(data.applicant.id);
          setCurrentStep("assessment");
        },
        onError: () => {
          toast.error("Registration failed. Please try again.");
        },
      },
    );
  };

  const handleAssessmentComplete = () => {
    if (!applicantId) return;
    submit(
      { token, externalApplicantId: applicantId, responses: [] },
      {
        onSuccess: () => setCurrentStep("confirmation"),
        onError: () => toast.error("Submission failed. Please try again."),
      },
    );
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-10">
      {currentStep === "signup" && (
        <ExternalSignupStep onContinue={handleSignupComplete} />
      )}
      {currentStep === "consent" && (
        <ExternalConsentStep
          onNext={handleConsentComplete}
          isSubmitting={isRegistering}
        />
      )}
      {currentStep === "assessment" && (
        <ExternalAssessmentStep
          onNext={handleAssessmentComplete}
          isSubmitting={isSubmitting}
        />
      )}
      {currentStep === "confirmation" && <ExternalConfirmationStep />}
    </div>
  );
}
