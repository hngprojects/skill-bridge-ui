"use client";

import { useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAssessmentCatalogue } from "@/hooks/api/use-employer-roles";
import { AssessmentsModal } from "./assessments-modal";

type StepTalentAssessmentProps = {
  selectedAssessments: string[];
  onSelectionChange: (ids: string[]) => void;
};

export function StepTalentAssessment({
  selectedAssessments,
  onSelectionChange,
}: StepTalentAssessmentProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useAssessmentCatalogue();

  const items = data?.catalogue ?? [];
  const hasSelections = selectedAssessments.length > 0;

  return (
    <>
      <button
        type="button"
        aria-label="Add assessment"
        onClick={() => setModalOpen(true)}
        className={cn(
          "flex min-h-72 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
          "border-[#D0D5DD] bg-[#FBFBFB] hover:border-[#98A2B3] hover:bg-[#F9FAFB]",
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-2xl border border-[#D0D5DD] bg-white text-[#344054]">
          <Plus className="size-5" strokeWidth={1.75} />
        </div>

        <p className="mt-4 text-base font-bold text-[#101828]">
          Choose your assessments
        </p>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#667085]">
          Create your custom assessment or you can select from the ones we have
          recommended for you.
        </p>

        {hasSelections ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {selectedAssessments.map((id) => {
              const item = items.find((o) => o.id === id);
              if (!item) return null;
              return (
                <span
                  key={id}
                  className="flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-medium text-[#027A48]"
                >
                  <CheckCircle2 className="size-3.5" strokeWidth={2} />
                  {item.title}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-md bg-[#0D2025] text-[10px] font-bold text-white">
              C
            </div>
            <span className="text-sm font-semibold text-[#101828]">
              {isLoading
                ? "Loading assessments..."
                : `${items.length} assessments available`}
            </span>
          </div>
        )}
      </button>

      <AssessmentsModal
        key={String(modalOpen)}
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedIds={selectedAssessments}
        onConfirm={onSelectionChange}
        items={items}
        isLoading={isLoading}
      />
    </>
  );
}
