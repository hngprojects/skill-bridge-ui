"use client";

import type { ReactNode } from "react";
import { useLayoutEffect } from "react";

// import { AssessmentDemoBanner } from "./demo-banner";
import { setAssessmentDemoEnabled } from "./demo-runtime";

/**
 * Single switch for the assessment demo. To disable entirely:
 * - Remove `<AssessmentDemoShell>` from `src/app/(protected)/t/layout.tsx`, or
 * - Set `ASSESSMENT_DEMO_ENABLED` to `false` below.
 */
export const ASSESSMENT_DEMO_ENABLED = true;

type AssessmentDemoShellProps = {
  children: ReactNode;
};

export function AssessmentDemoShell({ children }: AssessmentDemoShellProps) {
  useLayoutEffect(() => {
    if (ASSESSMENT_DEMO_ENABLED) {
      setAssessmentDemoEnabled(true);
    }
    return () => setAssessmentDemoEnabled(false);
  }, []);

  useLayoutEffect(() => {
    return () => setAssessmentDemoEnabled(false);
  }, []);

  if (!ASSESSMENT_DEMO_ENABLED) {
    return <>{children}</>;
  }

  return (
    <>
      {/* <AssessmentDemoBanner /> */}
      {children}
    </>
  );
}
