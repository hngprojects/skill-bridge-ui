"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { GoalOptionId } from "@/constants/talent-onboarding";
import { GOAL_OPTIONS } from "@/constants/talent-onboarding";
import { cn } from "@/lib/utils";

type SetGoalStepProps = {
  onSelectionChange?: (goalId: GoalOptionId | undefined) => void;
};

function SetGoalStep({ onSelectionChange }: SetGoalStepProps) {
  const [goalId, setGoalId] = React.useState<GoalOptionId | "">("");

  return (
    <div className="flex w-full min-w-0 flex-col gap-8">
      <RadioGroup
        value={goalId}
        onValueChange={(v) => {
          const id = v as GoalOptionId;
          setGoalId(id);
          onSelectionChange?.(id);
        }}
        className="grid w-full  gap-3"
      >
        {GOAL_OPTIONS.map((option) => {
          const selected = goalId === option.id;
          return (
            <Label
              key={option.id}
              htmlFor={`goal-${option.id}`}
              className={cn(
                "flex cursor-pointer  items-center justify-between gap-4 rounded-[5px] border border-[#D9D9D9] bg-card px-4 py-4 text-left text-sm font-medium text-foreground shadow-sm transition-colors sm:px-5 sm:py-5 sm:text-base",
                selected
                  ? "border-primary ring-1 ring-primary/20"
                  : "border-border hover:border-muted-foreground/30",
              )}
            >
              <span className="min-w-0 flex-1">{option.label}</span>
              <RadioGroupItem
                value={option.id}
                id={`goal-${option.id}`}
                className="shrink-0"
              />
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export { SetGoalStep };
