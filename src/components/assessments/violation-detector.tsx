"use client";

import { useEffect, useState, type ReactNode } from "react";
import AssessmentAutoSubmittedModal from "@/components/assessments/assessment-auto-submitted-modal";
import ViolationDetectedModal from "@/components/assessments/violation-detected-modal";
import useAntiCheat from "@/hooks/useAntiCheat";

type AntiCheatProps = {
  children: ReactNode;
  enabled: boolean;
  onViolation: (count: number) => void;
  limit?: number;
};

const ViolationDetector = ({
  children,
  enabled,
  onViolation,
  limit = 3,
}: AntiCheatProps) => {
  const [dismissedAt, setDismissedAt] = useState(0);

  const { count } = useAntiCheat({ enabled, onViolation });

  useEffect(() => {
    if (!enabled) return;
    const block = (e: Event) => e.preventDefault();
    const events = ["copy", "cut", "paste", "contextmenu", "dragstart"];
    events.forEach((evt) => document.addEventListener(evt, block));
    return () => {
      events.forEach((evt) => document.removeEventListener(evt, block));
    };
  }, [enabled]);

  const warningOpen = count > dismissedAt && count < limit;
  const autoSubmittedOpen = count >= limit;
  const dismissWarning = () => setDismissedAt(count);

  return (
    <>
      {children}
      <ViolationDetectedModal
        isOpen={warningOpen}
        onClose={dismissWarning}
        violationCount={count}
        onContinue={dismissWarning}
      />
      <AssessmentAutoSubmittedModal
        isOpen={autoSubmittedOpen}
        violationLimit={limit}
      />
    </>
  );
};

export default ViolationDetector;
