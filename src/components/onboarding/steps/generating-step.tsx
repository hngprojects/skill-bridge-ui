"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { usePersonaliseTalentDashboard } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

import { OrbitAnimation } from "../generating-steps/orbit-animation";

const LOADING_MESSAGES = [
  "Curating your experience...",
  "Tailoring your roadmap...",
  "Pulling together your dashboard...",
  "Almost there...",
];

const TOTAL_DURATION = 6000;
const MESSAGE_DURATION = TOTAL_DURATION / LOADING_MESSAGES.length;

function GenerateRoadmapStep() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = React.useState(0);
  const [hasPersonalisationError, setHasPersonalisationError] =
    React.useState(false);
  const personalisePromiseRef = React.useRef<Promise<unknown> | null>(null);
  const { mutateAsync: personaliseDashboard } = usePersonaliseTalentDashboard();

  React.useEffect(() => {
    if (hasPersonalisationError) return;

    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1));
    }, MESSAGE_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, [hasPersonalisationError]);

  React.useEffect(() => {
    let cancelled = false;

    async function finishOnboarding() {
      const minimumDelay = new Promise((resolve) =>
        setTimeout(resolve, TOTAL_DURATION),
      );
      personalisePromiseRef.current ??= personaliseDashboard();

      try {
        await Promise.all([personalisePromiseRef.current, minimumDelay]);
        if (!cancelled) router.replace("/t/dashboard");
      } catch (error) {
        await minimumDelay;
        if (cancelled) return;
        setHasPersonalisationError(true);
        appToast.error(authFailureMessage(error));
      }
    }

    void finishOnboarding();

    return () => {
      cancelled = true;
    };
  }, [personaliseDashboard, router]);

  return (
    <div className="relative flex w-full flex-col items-center gap-8 overflow-hidden">
      <OrbitAnimation />
      <p
        key={messageIndex}
        className="animate-in fade-in text-xl font-bold tracking-wide text-foreground duration-500"
        aria-live="polite"
      >
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  );
}

export { GenerateRoadmapStep };
