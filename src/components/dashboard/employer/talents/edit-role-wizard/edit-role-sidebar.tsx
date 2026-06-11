"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { EDIT_ROLE_STEPS } from "./constants";

type EditRoleSidebarProps = {
  currentStep: number;
  onStepClick: (index: number) => void;
};

export function EditRoleSidebar({
  currentStep,
  onStepClick,
}: EditRoleSidebarProps) {
  return (
    <div className="flex shrink-0 flex-col gap-4 rounded-2xl border border-[#dbdbdb] bg-white p-4 lg:w-72">
      {EDIT_ROLE_STEPS.map((step, index) => {
        const isVisited = index <= currentStep;
        const isActive = index === currentStep;
        return (
          <Button
            key={step}
            type="button"
            variant="ghost"
            onClick={() => onStepClick(index)}
            className={cn(
              "h-auto w-full justify-start gap-4 whitespace-normal rounded-lg px-2 py-1 text-left hover:bg-[#f5f5f5]",
              isActive && "bg-[#f5f5f5]",
            )}
          >
            {isVisited ? (
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1a7f37]">
                <Check className="size-3.5 text-white" aria-hidden />
              </div>
            ) : (
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#757575] text-sm text-[#151515]">
                {index + 1}
              </div>
            )}
            <p
              className={cn(
                "text-sm tracking-[0.016em]",
                isVisited
                  ? "font-medium text-[#151515]"
                  : "font-normal text-[#757575]",
              )}
            >
              {step}
            </p>
          </Button>
        );
      })}
    </div>
  );
}
