"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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

  React.useEffect(() => {
    let mounted = true;

    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1));
    }, MESSAGE_DURATION);

    const timeout = setTimeout(() => {
      if (!mounted) return;
      router.push("/t/dashboard");
    }, TOTAL_DURATION);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="relative flex w-full flex-col items-center gap-8 overflow-hidden">
      <h3
        key={messageIndex}
        id="onboarding-step-heading"
        className="animate-in fade-in font-heading text-2xl font-semibold tracking-tight text-foreground duration-500 sm:text-3xl"
        aria-live="polite"
      >
        {LOADING_MESSAGES[messageIndex]}
      </h3>
      <OrbitAnimation />
    </div>
  );
}

export { GenerateRoadmapStep };
