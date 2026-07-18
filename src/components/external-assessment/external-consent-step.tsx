"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  onNext: () => void;
};

export function ExternalConsentStep({ onNext }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border bg-card p-8 shadow-sm">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Terms & Consent
        </h2>
        <p className="text-sm text-muted-foreground">
          Please review the following before continuing to the assessment.
        </p>
      </div>

      <div className="flex w-full max-w-sm items-start space-x-3 rounded-md border p-4">
        <Checkbox
          id="consent"
          checked={agreed}
          onCheckedChange={(c) => setAgreed(c === true)}
          className="mt-1"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="consent"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Marketing Consent
          </label>
          <p className="text-sm text-muted-foreground">
            I agree to receive job opportunities and marketing communications
            from CredLane.
          </p>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!agreed}
        className="w-full max-w-sm bg-[#111827] hover:bg-[#111827]/90 text-white"
      >
        Start Assessment
      </Button>
    </div>
  );
}
