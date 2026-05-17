"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { OrbitAnimation } from "../generating-steps/orbit-animation";
import { usePersonaliseTalentDashboard } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

const REDIRECT_DELAY = 2000;

function GenerateRoadmapStep() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [dots, setDots] = React.useState("");
  const { mutateAsync: personalise } = usePersonaliseTalentDashboard();

  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    intervalRef.current = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);

    try {
      await personalise();

      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        router.push("/dashboard");
      }, REDIRECT_DELAY);
    } catch (error) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isMountedRef.current) return; // guard
      setIsGenerating(false);
      setDots("");
      appToast.error(authFailureMessage(error));
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center gap-8 overflow-hidden">
      <OrbitAnimation />

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="flex w-full max-w-md items-center justify-center gap-2.5 rounded-lg bg-primary px-4 py-2.5 transition-opacity disabled:opacity-80"
      >
        <span className="text-xl font-bold tracking-wide text-primary-foreground">
          {isGenerating ? `Generating${dots}` : "Generate"}
        </span>
      </button>
    </div>
  );
}

export { GenerateRoadmapStep };
