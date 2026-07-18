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
import { FormInput } from "@/components/custom/form-input";

type AddInterviewLinkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  isSubmitting: boolean;
  onSubmit: (link: string) => void;
};

export function AddInterviewLinkDialog({
  open,
  onOpenChange,
  candidateName,
  isSubmitting,
  onSubmit,
}: AddInterviewLinkDialogProps) {
  const [link, setLink] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSubmitting) return;
    if (!nextOpen) setLink("");
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    const trimmed = link.trim();
    if (!trimmed) return;
    const normalizedLink = trimmed.replace(/^(?!https?:\/\/)/, "https://");
    onSubmit(normalizedLink);
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
            Add Interview Link
          </DialogTitle>
          <DialogDescription className="text-sm tracking-[0.017em] text-[#475467]">
            {candidateName} has requested a call. Provide a scheduling link
            (e.g., Calendly, Google Meet) for them to book time with you.
          </DialogDescription>
        </DialogHeader>

        <FormInput
          label="Scheduling Link"
          type="url"
          placeholder="https://calendly.com/your-link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          autoFocus
        />

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
            disabled={!link.trim() || isSubmitting}
            className="h-10 rounded-lg bg-[#111827] text-white hover:bg-[#111827]/90"
          >
            {isSubmitting ? "Adding..." : "Add link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
