"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onNext: () => void;
};

export function ExternalAssessmentStep({ onNext }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center space-y-8 rounded-lg border bg-card p-8 shadow-sm">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Assessment
        </h2>
        <p className="text-sm text-muted-foreground">
          Please answer the following questions to the best of your ability.
        </p>
      </div>

      <div className="flex h-64 w-full flex-col items-center justify-center rounded-md border border-dashed bg-muted/30">
        <p className="text-sm text-muted-foreground">
          [Assessment Modules Render Here]
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full max-w-sm bg-[#111827] hover:bg-[#111827]/90 text-white"
      >
        {isSubmitting ? "Submitting..." : "Submit Assessment"}
      </Button>
    </div>
  );
}
