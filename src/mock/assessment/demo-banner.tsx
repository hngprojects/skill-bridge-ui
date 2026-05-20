"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useAssessmentDemoStore } from "./demo-store";

export function AssessmentDemoBanner() {
  const router = useRouter();
  const resetDemo = useAssessmentDemoStore((s) => s.resetDemo);

  const handleReset = () => {
    resetDemo();
    router.push("/t/dashboard");
  };

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 sm:px-6">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2">
        <p className="font-sans text-sm font-medium text-amber-950">
          Assessment demo mode — progression is simulated locally (no API).
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-amber-300 bg-white text-amber-950 hover:bg-amber-100"
          onClick={handleReset}
        >
          Reset demo
        </Button>
      </div>
    </div>
  );
}
