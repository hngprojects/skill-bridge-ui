"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ReadyToSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const ReadyToSubmitModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ReadyToSubmitModalProps) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col px-6 py-8 rounded-2xl max-w-137.5 w-full border-none shadow-xl gap-8">
        <DialogHeader className="sr-only">
          <DialogTitle>Ready to Submit</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 w-full">
          <h2 className="text-center font-bold text-[28px] leading-[150%] text-foreground w-full">
            Ready to submit?
          </h2>
          <p className="text-center text-base font-light text-foreground">
            Talents with higher employability score usually score avg.{" "}
            <span className="font-bold">80%</span>
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 w-full">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(val) => setAgreed(!!val)}
            className="w-4.5 h-4.5 border-2 border-[#757575] rounded-sm"
          />
          <label
            htmlFor="agree"
            className="text-sm text-[#757575] leading-[150%] cursor-pointer"
          >
            I understand that cheating/submitting work not done by me can lead
            to failing this assessment or permanent deactivation
          </label>
        </div>

        <div className="flex justify-center w-full">
          <Button
            disabled={!agreed}
            onClick={onSubmit}
            className="w-60 h-10 bg-[#05060F] hover:bg-[#05060F]/80 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReadyToSubmitModal;
