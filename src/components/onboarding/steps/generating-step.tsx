"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { OrbitAnimation } from "../generating-steps/orbit-animation";

const REDIRECT_DELAY = 2000;

function GenerateRoadmapStep() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [dots, setDots] = React.useState("");

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);

    const dotsInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);

    setTimeout(() => {
      clearInterval(dotsInterval);
      router.push("/dashboard");
    }, REDIRECT_DELAY);
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
