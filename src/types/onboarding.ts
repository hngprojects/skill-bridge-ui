import type { ReactNode } from "react";

import type { OnboardingStepId } from "@/constants/talent-onboarding";

export type OnboardingIntroHeaderProps = {
  resolvedTitle: ReactNode | null | undefined;
  description: ReactNode | undefined;
  fallbackTitle: string;
  hasIntro: boolean;
  centered?: boolean;
};

export type OnboardingShellProps = {
  currentStepId: OnboardingStepId;
  onNext: () => void;
  onBack: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};
