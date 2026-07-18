"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AssessmentInviteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId: string;
};

export function AssessmentInviteModal({
  open,
  onOpenChange,
  assessmentId,
}: AssessmentInviteModalProps) {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      toast.error("Please enter an email or name to invite.");
      return;
    }

    setIsSending(true);
    try {
      // Mock API call (can use assessmentId here)
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(`Invite sent to ${email} for assessment ${assessmentId}`);
      setEmail("");
      onOpenChange(false);
    } catch {
      toast.error("Failed to send invite");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to Assessment</DialogTitle>
          <DialogDescription>
            Search for internal talents by name or email, or enter an external
            email address to invite them to this assessment.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-input">Name or Email</Label>
            <Input
              id="invite-input"
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button onClick={handleInvite} disabled={isSending || !email}>
            {isSending ? "Sending..." : "Send Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
