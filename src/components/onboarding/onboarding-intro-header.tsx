"use client";

import type { OnboardingIntroHeaderProps } from "@/types/onboarding";

function OnboardingIntroHeader({
  resolvedTitle,
  description,
  fallbackTitle,
  hasIntro,
  centered = false,
}: OnboardingIntroHeaderProps) {
  if (hasIntro) {
    return (
      <header
        className={
          centered ? "w-full space-y-2 text-center" : "max-w-2xl space-y-2"
        }
      >
        {resolvedTitle != null ? (
          <h1
            id="onboarding-step-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {resolvedTitle}
          </h1>
        ) : (
          <h2 id="onboarding-step-heading" className="sr-only">
            {fallbackTitle}
          </h2>
        )}
        {description != null ? (
          <p
            className={
              centered
                ? "mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
                : "max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            }
          >
            {description}
          </p>
        ) : null}
      </header>
    );
  }

  return (
    <h2 id="onboarding-step-heading" className="sr-only">
      {fallbackTitle}
    </h2>
  );
}

export { OnboardingIntroHeader };
