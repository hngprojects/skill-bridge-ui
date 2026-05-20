"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RotatedCardIcon from "./rotated-card-icon";
import ValidatedBadge from "./validated-badge";

interface AssessmentResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  icon: "level-adjusted" | "congratulations";
  validatedLevel: string;
}

const AssessmentResultModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  validatedLevel,
}: AssessmentResultModalProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="flex flex-col items-center gap-8 px-6 py-8 rounded-2xl max-w-xl w-full border-none shadow-xl">
      <DialogHeader className="sr-only">
        <DialogTitle>Assessment Result</DialogTitle>
      </DialogHeader>
      <RotatedCardIcon icon={icon} />
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-1 w-full">
          <h2 className="text-center font-bold text-foreground">{title}</h2>
          <p className="text-center text-foreground">{subtitle}</p>
        </div>
        <ValidatedBadge level={validatedLevel} />
      </div>
    </DialogContent>
  </Dialog>
);

export default AssessmentResultModal;
