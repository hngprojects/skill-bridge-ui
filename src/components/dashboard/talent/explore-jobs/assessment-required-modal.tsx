"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AssessmentRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssessmentRequiredModal({
  open,
  onOpenChange,
}: AssessmentRequiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assessment Required</DialogTitle>
          <DialogDescription>
            You need to complete your job-ready assessment to verify your skills
            before you can express interest in roles.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Go to Assessment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
