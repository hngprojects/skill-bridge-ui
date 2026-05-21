"use client";

import { useState, type ReactNode } from "react";
import ViolationDetectedModal from "@/components/assessments/violation-detected-modal";
import useAntiCheat from "@/hooks/useAntiCheat";

type AntiCheatProps = {
  children: ReactNode;
  enabled?: boolean;
  limit?: number;
  onLimitReached?: () => void;
};

const ViolationDetector = ({
  children,
  enabled = true,
  limit = 3,
  onLimitReached,
}: AntiCheatProps) => {
  const [dismissedAt, setDismissedAt] = useState(0);

  const { count } = useAntiCheat({ enabled, limit, onLimitReached });

  const modalOpen = count > dismissedAt && count < limit;
  const dismiss = () => setDismissedAt(count);

  return (
    <>
      {children}
      <ViolationDetectedModal
        isOpen={modalOpen}
        onClose={dismiss}
        violationCount={count}
        onContinue={dismiss}
      />
    </>
  );
};

export default ViolationDetector;
