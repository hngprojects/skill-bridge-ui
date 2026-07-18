"use client";

import { useState } from "react";
import { ExternalSignupStep } from "./external-signup-step";
import { ExternalConsentStep } from "./external-consent-step";
import { ExternalAssessmentStep } from "./external-assessment-step";
import { ExternalConfirmationStep } from "./external-confirmation-step";

type Step = "signup" | "consent" | "assessment" | "confirmation";

export function ExternalAssessmentPage({}: { token: string }) {
  const [currentStep, setCurrentStep] = useState<Step>("signup");

  const handleSignupComplete = () => {
    setCurrentStep("consent");
  };

  const handleConsentComplete = () => {
    setCurrentStep("assessment");
  };

  const handleAssessmentComplete = () => {
    setCurrentStep("confirmation");
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-10">
      {currentStep === "signup" && (
        <ExternalSignupStep onContinue={handleSignupComplete} />
      )}
      {currentStep === "consent" && (
        <ExternalConsentStep onNext={handleConsentComplete} />
      )}
      {currentStep === "assessment" && (
        <ExternalAssessmentStep onNext={handleAssessmentComplete} />
      )}
      {currentStep === "confirmation" && <ExternalConfirmationStep />}
    </div>
  );
}
