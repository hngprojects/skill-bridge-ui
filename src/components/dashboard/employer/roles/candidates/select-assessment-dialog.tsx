"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployerAssessments } from "@/hooks/api/use-employer-assessments";
import { Spinner } from "@/components/ui/spinner";

type SelectAssessmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  isSubmitting: boolean;
  onSubmit: (assessmentId: string) => void;
};

export function SelectAssessmentDialog({
  open,
  onOpenChange,
  candidateName,
  isSubmitting,
  onSubmit,
}: SelectAssessmentDialogProps) {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const { data, isLoading } = useEmployerAssessments({ limit: 100 });

  const activeAssessments = (data?.assessments ?? []).filter(
    (a) => a.status === "active" && a.type === "internal",
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSubmitting) return;
    if (!nextOpen) setSelectedAssessmentId("");
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    if (!selectedAssessmentId) return;
    onSubmit(selectedAssessmentId);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-md gap-6 rounded-3xl p-6"
        onInteractOutside={(e) => {
          if (isSubmitting) e.preventDefault();
        }}
      >
        <DialogHeader className="gap-2 text-left">
          <DialogTitle className="text-xl font-bold text-[#151515]">
            Send Assessment
          </DialogTitle>
          <DialogDescription className="text-sm tracking-[0.017em] text-[#475467]">
            Select an active internal assessment to send to {candidateName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <label className="text-sm font-medium text-[#344054]">
            Assessment
          </label>
          {isLoading ? (
            <div className="flex h-10 items-center justify-center rounded-lg border border-[#d9d9d9] bg-muted/50">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          ) : activeAssessments.length === 0 ? (
            <div className="rounded-lg border border-[#d9d9d9] p-4 text-center text-sm text-muted-foreground">
              No active internal assessments found. Please create one first.
            </div>
          ) : (
            <Select
              value={selectedAssessmentId}
              onValueChange={setSelectedAssessmentId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an assessment..." />
              </SelectTrigger>
              <SelectContent>
                {activeAssessments.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
            className="h-10 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !selectedAssessmentId ||
              isSubmitting ||
              activeAssessments.length === 0
            }
            className="h-10 rounded-lg bg-[#111827] text-white hover:bg-[#111827]/90"
          >
            {isSubmitting ? "Sending..." : "Send Assessment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
