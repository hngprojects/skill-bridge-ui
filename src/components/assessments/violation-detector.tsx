"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import AssessmentAutoSubmittedModal from "@/components/assessments/assessment-auto-submitted-modal";
import ViolationDetectedModal from "@/components/assessments/violation-detected-modal";
import useAntiCheat from "@/hooks/useAntiCheat";

type AntiCheatProps = {
  children: ReactNode;
  enabled?: boolean;
  limit?: number;
  onLimitReached?: () => void;
  onViolation?: (count: number) => void;
  onDispute?: () => void;
  onReturnToDashboard?: () => void;
};

const ViolationDetector = ({
  children,
  enabled = true,
  limit = 3,
  onLimitReached,
  onViolation,
  onDispute,
  onReturnToDashboard,
}: AntiCheatProps) => {
  const router = useRouter();
  const [dismissedAt, setDismissedAt] = useState(0);

  const { count } = useAntiCheat({
    enabled,
    limit,
    onLimitReached,
    onViolation,
  });

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

  const handleReturnToDashboard =
    onReturnToDashboard ?? (() => router.push("/t/dashboard"));

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
        onDispute={onDispute}
        onReturnToDashboard={handleReturnToDashboard}
      />
    </>
  );
};

export default ViolationDetector;
