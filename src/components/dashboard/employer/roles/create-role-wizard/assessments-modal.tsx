"use client";

import { useState } from "react";
import { FlaskConical, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import type { CatalogueAssessmentItem } from "@/types/api/employer-roles";
import { cn } from "@/lib/utils";

type AssessmentsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onConfirm: (selectedIds: string[]) => void;
  items: CatalogueAssessmentItem[];
  isLoading?: boolean;
};

export function AssessmentsModal({
  open,
  onOpenChange,
  selectedIds,
  onConfirm,
  items,
  isLoading,
}: AssessmentsModalProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedIds);

  const toggleAssessment = (id: string) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleConfirm = () => {
    onConfirm(localSelected);
    onOpenChange(false);
  };

  const enabledCount = localSelected.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-120 flex-col gap-0 overflow-hidden rounded-2xl p-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F2F4F7] px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-[#101828]">Assessments</h2>
            <p className="mt-0.5 text-sm text-[#667085]">
              {enabledCount} assessment{enabledCount !== 1 ? "s" : ""} enabled
            </p>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="flex size-8 items-center justify-center rounded-lg text-[#667085] transition-colors hover:bg-[#F9FAFB] hover:text-[#101828]"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </DialogClose>
        </div>

        {/* Scrollable assessment list */}
        <div className="flex flex-col gap-3 overflow-y-auto px-6 py-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]"
              />
            ))
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#98A2B3]">
              No assessments available.
            </p>
          ) : (
            items.map((assessment) => {
              const isSelected = localSelected.includes(assessment.id);
              return (
                <div
                  key={assessment.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-4 transition-colors",
                    isSelected ? "border-[#079455]" : "border-[#E5E7EB]",
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0D2025]">
                    <FlaskConical
                      className="size-5 text-[#4BB3C9]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#101828]">
                      {assessment.title}
                    </p>
                    {typeof assessment.description === "string" &&
                      assessment.description && (
                        <p className="mt-1 text-xs leading-5 text-[#667085]">
                          {assessment.description}
                        </p>
                      )}
                    <p className="mt-2 text-xs text-[#98A2B3]">
                      Estimated time: {assessment.estimated_completion_time}
                    </p>
                  </div>

                  <Switch
                    checked={isSelected}
                    onCheckedChange={() => toggleAssessment(assessment.id)}
                    className="mt-0.5 shrink-0 data-[state=checked]:bg-[#101828]"
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#F2F4F7] px-6 py-4">
          <Button
            type="button"
            onClick={handleConfirm}
            className="h-11 w-full rounded-xl bg-[#101828] text-sm font-semibold text-white hover:bg-[#101828]/90"
          >
            Add assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
