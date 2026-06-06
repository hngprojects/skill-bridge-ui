"use client";

import { Controller } from "react-hook-form";
import type { Control, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY_OPTIONS } from "@/constants/create-role-wizard";
import type { WorkPreferencesValues } from "@/types/create-role-schema";

const INPUT_CLASS =
  "h-12 rounded-lg border-[#D0D5DD] bg-white text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const TRIGGER_CLASS =
  "!h-12 w-full rounded-lg border-[#D0D5DD] bg-white text-sm text-[#101828] data-placeholder:text-[#98A2B3]";

type SalaryRangeFieldProps = {
  register: UseFormRegister<WorkPreferencesValues>;
  control: Control<WorkPreferencesValues>;
};

export function SalaryRangeField({ register, control }: SalaryRangeFieldProps) {
  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-3 flex-col gap-1.5">
        <p className="text-sm font-medium text-[#101828]">Salary range</p>
        <div className="flex items-center gap-2">
          <Input
            {...register("salaryMin")}
            type="number"
            min={0}
            className={INPUT_CLASS}
          />
          <span className="shrink-0 text-sm text-[#667085]">to</span>
          <Input
            {...register("salaryMax")}
            type="number"
            min={0}
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="flex flex-2 flex-col gap-1.5">
        <p className="text-sm font-medium text-[#101828]">Currency</p>
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={TRIGGER_CLASS}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
