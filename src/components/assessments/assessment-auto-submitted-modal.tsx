"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AssessmentAutoSubmittedModalProps {
  isOpen: boolean;
  violationLimit?: number;
  onDispute?: () => void;
  onReturnToDashboard?: () => void;
}

const AssessmentAutoSubmittedModal = ({
  isOpen,
  violationLimit = 3,
  onDispute,
  onReturnToDashboard,
}: AssessmentAutoSubmittedModalProps) => (
  <Dialog open={isOpen}>
    <DialogContent
      className="flex flex-col items-center gap-8 px-6 py-8 rounded-2xl max-w-xl w-full border-none shadow-xl"
      onEscapeKeyDown={(e) => e.preventDefault()}
      onPointerDownOutside={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <DialogHeader className="sr-only">
        <DialogTitle>Assessment auto-submitted</DialogTitle>
      </DialogHeader>

      <div className="flex justify-center w-full">
        <Image
          src="/assets/icons/violation-detected-icon.svg"
          width={100}
          height={120}
          alt="Assessment auto-submitted icon"
        />
      </div>

      <div className="flex flex-col items-center gap-3.5 w-full">
        <h2 className="text-center font-bold text-2xl text-foreground">
          Assessment auto-submitted
        </h2>

        <div className="flex flex-col items-center gap-3.5 w-full">
          <p className="text-center text-base text-foreground max-w-122.5">
            We noticed some movements during the assessment and warned you{" "}
            {violationLimit} times. Because of this, your assessment was
            automatically submitted.
          </p>
          <p className="text-center text-sm text-[#757575] w-full">
            If you think this is not your fault, you can dispute the decision.
          </p>
        </div>

        <div className="flex flex-row gap-4 w-full mt-2">
          <Button
            onClick={onDispute}
            className="flex-1 h-10 bg-[#757575] hover:bg-[#757575]/80 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer"
          >
            Click to dispute
          </Button>
          <Button
            onClick={onReturnToDashboard}
            className="flex-1 h-10 bg-[#05060F] hover:bg-[#05060F]/80 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer"
          >
            Return to dashboard
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default AssessmentAutoSubmittedModal;
