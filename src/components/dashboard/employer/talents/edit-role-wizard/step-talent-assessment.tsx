"use client";

import { Search, SquarePlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ASSESSMENT_OPTIONS } from "@/constants/create-role-wizard";

type StepTalentAssessmentProps = {
  selectedAssessmentId: string | undefined;
  onSelect: (id: string | undefined) => void;
};

export function StepTalentAssessment({
  selectedAssessmentId,
  onSelect,
}: StepTalentAssessmentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedAssessment = ASSESSMENT_OPTIONS.find(
    (option) => option.id === selectedAssessmentId,
  );

  return (
    <div className="rounded-lg bg-[#fbfbfb] p-4">
      <Button
        type="button"
        variant="ghost"
        aria-label="Choose your assessments"
        onClick={() => setIsOpen(true)}
        className="flex h-64 w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed border-[#dbdbdb] text-center whitespace-normal hover:bg-transparent"
      >
        <SquarePlus
          className="size-10 text-[#151515]"
          strokeWidth={1.5}
          aria-hidden
        />
        {selectedAssessment ? (
          <p className="text-lg font-medium tracking-[0.017em] text-[#151515]">
            {selectedAssessment.name}
          </p>
        ) : (
          <p className="text-lg font-normal tracking-[0.017em] text-[#757575]">
            Choose your assessments
          </p>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl gap-6 rounded-3xl p-6">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="text-lg font-bold text-[#151515]">
              Assessments
            </DialogTitle>
            <DialogDescription className="text-base font-light tracking-[0.016em] text-[#151515]">
              {selectedAssessmentId ? 1 : 0} assessment
              {selectedAssessmentId ? "" : "s"} enabled
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 rounded-full border border-[#d9d9d9] bg-white px-3 py-2">
            <Search className="size-4.5 shrink-0 text-muted-foreground" />
            <input
              placeholder="Search assessment title, category"
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <ScrollArea className="h-75 pr-3">
            <RadioGroup
              value={selectedAssessmentId}
              onValueChange={onSelect}
              className="gap-4"
            >
              {ASSESSMENT_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  htmlFor={`assessment-${option.id}`}
                  className="flex w-full cursor-pointer items-start gap-4 rounded-lg border border-[#dbdbdb] bg-white p-4"
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`assessment-${option.id}`}
                    className="mt-1"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold tracking-[0.017em] text-[#151515]">
                      {option.name}
                    </p>
                    <p className="text-sm font-light tracking-[0.017em] text-[#757575]">
                      {option.description}
                    </p>
                    <p className="text-sm font-light tracking-[0.017em] text-[#757575]">
                      Estimated time: {option.estimatedTime}
                    </p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </ScrollArea>

          <Button
            onClick={() => setIsOpen(false)}
            className="mx-auto h-10 w-60 rounded-lg"
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
