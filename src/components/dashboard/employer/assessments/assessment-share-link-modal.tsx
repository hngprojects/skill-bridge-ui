"use client";

import { Copy } from "lucide-react";
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

type AssessmentShareLinkModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: string;
};

export function AssessmentShareLinkModal({
  open,
  onOpenChange,
  link,
}: AssessmentShareLinkModalProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assessment Link</DialogTitle>
          <DialogDescription>
            Share this link with external candidates to let them take the
            assessment.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex items-center space-x-2">
          <Input readOnly value={link} className="flex-1" />
          <Button
            type="button"
            size="icon"
            onClick={handleCopy}
            title="Copy link"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
