import type { ReactNode } from "react";

export type OnboardingIntroHeaderProps = {
  resolvedTitle: ReactNode | null | undefined;
  description: ReactNode | undefined;
  fallbackTitle: string;
  hasIntro: boolean;
  centered?: boolean;
};
