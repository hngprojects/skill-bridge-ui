"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/custom/form-input";
import { Textarea } from "@/components/ui/textarea";

type SendInterviewInviteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  isSubmitting: boolean;
  onSubmit: (data: { schedulingLink: string; message: string }) => void;
};

export function SendInterviewInviteDialog({
  open,
  onOpenChange,
  candidateName,
  isSubmitting,
  onSubmit,
}: SendInterviewInviteDialogProps) {
  const [schedulingLink, setSchedulingLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSchedulingLink("");
      setMessage("");
    }
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isSubmitting) {
      onOpenChange(nextOpen);
    }
  };

  const handleSubmit = () => {
    onSubmit({ schedulingLink, message });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md gap-6 rounded-3xl p-6">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-xl font-bold text-[#151515]">
            Invite {candidateName} to Interview
          </DialogTitle>
          <DialogDescription className="text-sm tracking-[0.017em] text-[#475467]">
            Send an interview invitation directly. You can provide your
            scheduling link (e.g., Calendly) and a personalized message.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <FormInput
            label="Scheduling Link (Optional)"
            placeholder="https://calendly.com/your-link"
            value={schedulingLink}
            onChange={(e) => setSchedulingLink(e.target.value)}
          />

          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[#344054]"
            >
              Personalized Message (Optional)
            </label>
            <Textarea
              id="message"
              placeholder="Hi there! We'd love to schedule a quick chat..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-24 resize-none rounded-lg border-[#d9d9d9] focus-visible:ring-[#079455]"
            />
          </div>
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
            disabled={isSubmitting}
            className="h-10 rounded-lg bg-[#111827] text-white hover:bg-[#111827]/90"
          >
            {isSubmitting ? "Sending..." : "Send Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
