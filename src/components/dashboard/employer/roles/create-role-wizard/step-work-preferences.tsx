"use client";

import { useEffect, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  CURRENCY_OPTIONS,
  EDUCATION_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
  KEYWORD_OPTIONS,
} from "@/constants/create-role-wizard";
import {
  workPreferencesSchema,
  type WorkPreferencesValues,
} from "@/types/create-role-schema";

export const INITIAL_WORK_PREFERENCES: WorkPreferencesValues = {
  employmentType: "",
  experience: "",
  education: "",
  keyword: "",
  salaryMin: "",
  salaryMax: "",
  currency: "",
};

type StepWorkPreferencesProps = {
  values: WorkPreferencesValues;
  onChange: (values: WorkPreferencesValues) => void;
};

const TRIGGER_CLASS =
  "!h-12 w-full rounded-lg border-[#D0D5DD] bg-white text-sm text-[#101828] data-placeholder:text-[#98A2B3]";

export function StepWorkPreferences({
  values,
  onChange,
}: StepWorkPreferencesProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<WorkPreferencesValues>({
    resolver: zodResolver(workPreferencesSchema),
    defaultValues: values,
    mode: "onChange",
  });

  const formValues = useWatch({ control });
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    onChangeRef.current(formValues as WorkPreferencesValues);
  }, [formValues]);

  return (
    <div className="flex flex-col gap-5">
      {/* Employment type */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#101828]">Employment type</p>
        <Controller
          name="employmentType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={TRIGGER_CLASS}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.employmentType && (
          <p className="mt-0.5 text-xs text-error">
            {errors.employmentType.message}
          </p>
        )}
      </div>

      {/* Experience */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#101828]">Experience</p>
        <Controller
          name="experience"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={TRIGGER_CLASS}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.experience && (
          <p className="mt-0.5 text-xs text-error">
            {errors.experience.message}
          </p>
        )}
      </div>

      {/* Education */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#101828]">Education</p>
        <Controller
          name="education"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={TRIGGER_CLASS}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.education && (
          <p className="mt-0.5 text-xs text-error">
            {errors.education.message}
          </p>
        )}
      </div>

      {/* Keyword */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#101828]">Keyword</p>
        <Controller
          name="keyword"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={TRIGGER_CLASS}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {KEYWORD_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Salary range + Currency */}
      <div className="flex items-end gap-3">
        <div className="flex flex-3 flex-col gap-1.5">
          <p className="text-sm font-medium text-[#101828]">Salary range</p>
          <div className="flex items-center gap-2">
            <Input
              {...register("salaryMin")}
              type="number"
              min={0}
              className="h-12 rounded-lg border-[#D0D5DD] bg-white text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="shrink-0 text-sm text-[#667085]">to</span>
            <Input
              {...register("salaryMax")}
              type="number"
              min={0}
              className="h-12 rounded-lg border-[#D0D5DD] bg-white text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
    </div>
  );
}
