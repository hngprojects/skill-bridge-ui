"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  type Control,
  Controller,
  type UseFormRegister,
} from "react-hook-form";

import { FormInput } from "@/components/custom/form-input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { TRACK_SELECT_OPTIONS } from "@/constants/talent-onboarding";
import { cn } from "@/lib/utils";
import type { CreateAssessmentValues } from "@/types/create-assessment-schema";

const formFieldLabelClass =
  "inline-flex flex-row items-start gap-0.5 p-0 shadow-none select-none " +
  "font-sans text-base font-medium leading-normal tracking-[0.256px] text-foreground";

const formFieldControlClass =
  "h-9 w-full min-w-0 rounded-[5px] border border-border bg-background px-3 py-2 text-base font-normal leading-5 tracking-[0.017em] md:text-base md:leading-5 " +
  "text-foreground shadow-none outline-none transition-[color,box-shadow,border-color] " +
  "font-sans placeholder:text-sm placeholder:text-muted-foreground " +
  "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const formFieldHintClass =
  "font-sans text-sm font-normal leading-[18px] tracking-[0.016em] text-muted-foreground";

const formFieldErrorClass =
  "font-sans text-sm font-normal leading-[18px] text-error";

type CreateAssessmentDialogFieldsProps = {
  register: UseFormRegister<CreateAssessmentValues>;
  control: Control<CreateAssessmentValues>;
  passRate: number;
  titleError?: string;
  categoryError?: string;
  deadlineError?: string;
};

export function CreateAssessmentDialogFields({
  register,
  control,
  passRate,
  titleError,
  categoryError,
  deadlineError,
}: CreateAssessmentDialogFieldsProps) {
  return (
    <div className="space-y-4">
      <FormInput
        label="Assessment title"
        placeholder="e.g. frontend developer assessment"
        description="Placeholder for more info"
        error={titleError}
        {...register("title")}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormInput
            mode="select"
            label="Category"
            placeholder="Select.."
            description="Placeholder for more info"
            options={TRACK_SELECT_OPTIONS}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            error={categoryError}
          />
        )}
      />

      <div className="flex w-full flex-col items-stretch gap-1.5">
        <Label className={formFieldLabelClass}>Pass rate %</Label>
        <Controller
          name="passRate"
          control={control}
          render={({ field }) => (
            <div className="relative pt-0.5">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0] ?? 0)}
                className={cn(
                  "**:data-[slot=slider-track]:h-2",
                  "**:data-[slot=slider-track]:rounded-full",
                  "**:data-[slot=slider-track]:bg-[#E5E7EB]",
                  "**:data-[slot=slider-range]:rounded-full",
                  "**:data-[slot=slider-range]:bg-[#34A853]",
                  "**:data-[slot=slider-thumb]:size-5",
                  "**:data-[slot=slider-thumb]:border-0",
                  "**:data-[slot=slider-thumb]:bg-[#34A853]",
                  "**:data-[slot=slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
                  "**:data-[slot=slider-thumb]:ring-0",
                  "**:data-[slot=slider-thumb]:hover:ring-0",
                  "**:data-[slot=slider-thumb]:focus-visible:ring-0",
                )}
              />
              <span
                className="pointer-events-none absolute top-7 -translate-x-1/2 rounded-md bg-[#151515] px-2 py-0.5 text-xs font-semibold text-white"
                style={{ left: `${passRate}%` }}
              >
                {passRate}%
              </span>
              <div className="mt-1 flex justify-between">
                <div className="flex flex-col items-start gap-1">
                  <span className="ml-2 h-2 w-px bg-[#34A853]" aria-hidden />
                  <span className="text-[10px] font-semibold tracking-wide text-[#34A853]">
                    WEAK
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="mr-2 h-2 w-px bg-[#34A853]" aria-hidden />
                  <span className="text-[10px] font-semibold tracking-wide text-[#34A853]">
                    STRONG
                  </span>
                </div>
              </div>
            </div>
          )}
        />
        <p className={formFieldHintClass}>Placeholder for more info</p>
      </div>

      <div className="flex w-full flex-col items-stretch gap-1.5">
        <Label className={formFieldLabelClass}>Deadline</Label>
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    formFieldControlClass,
                    "flex items-center justify-start gap-2 text-left",
                    !field.value && "text-muted-foreground",
                    deadlineError && "border-error ring-2 ring-error/20",
                  )}
                >
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                  {field.value ? format(field.value, "PPP") : "Select.."}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {deadlineError ? (
          <p className={formFieldErrorClass} role="alert">
            {deadlineError}
          </p>
        ) : (
          <p className={formFieldHintClass}>Placeholder for more info</p>
        )}
      </div>
    </div>
  );
}
