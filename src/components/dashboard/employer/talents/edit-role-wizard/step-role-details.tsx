"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  EMPLOYMENT_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/constants/create-role-wizard";

import { ClearableSelectField } from "./clearable-select-field";
import { SkillsField } from "./skills-field";

export type RoleDetailsValues = {
  employmentType: string;
  experience: string;
  location: string;
  skills: string[];
  acceptsRelocation: "yes" | "no";
};

type StepRoleDetailsProps = {
  values: RoleDetailsValues;
  onChange: (values: RoleDetailsValues) => void;
};

export function StepRoleDetails({ values, onChange }: StepRoleDetailsProps) {
  return (
    <div className="flex flex-col gap-5 rounded-lg bg-[#fbfbfb] p-4">
      <ClearableSelectField
        label="Employment type"
        placeholder="Select employment type"
        value={values.employmentType}
        options={EMPLOYMENT_TYPE_OPTIONS}
        onChange={(employmentType) => onChange({ ...values, employmentType })}
      />

      <ClearableSelectField
        label="Experience"
        placeholder="Select experience"
        value={values.experience}
        options={EXPERIENCE_OPTIONS}
        onChange={(experience) => onChange({ ...values, experience })}
      />

      <SkillsField
        skills={values.skills}
        onChange={(skills) => onChange({ ...values, skills })}
      />

      <div className="flex flex-col gap-1.5">
        <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
          Location
        </p>
        <div className="flex h-11 items-center justify-between rounded-lg border border-[#d9d9d9] bg-white px-4">
          <input
            value={values.location}
            onChange={(event) =>
              onChange({ ...values, location: event.target.value })
            }
            className="w-full bg-transparent text-base font-medium tracking-[0.017em] text-[#151515] outline-none"
          />
          {values.location ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => onChange({ ...values, location: "" })}
              aria-label="Clear location"
              className="size-5 shrink-0 text-[#757575] hover:bg-transparent hover:text-[#151515]"
            >
              <X className="size-5" aria-hidden />
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
          Are you accepting candidates that are willing to relocate?
        </p>
        <RadioGroup
          value={values.acceptsRelocation}
          onValueChange={(acceptsRelocation) =>
            onChange({
              ...values,
              acceptsRelocation: acceptsRelocation as "yes" | "no",
            })
          }
          className="flex flex-row items-center gap-6"
        >
          <label className="flex cursor-pointer items-center gap-2">
            <RadioGroupItem value="yes" id="relocate-yes" />
            <span className="text-base font-light tracking-[0.017em] text-[#151515]">
              Yes
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <RadioGroupItem value="no" id="relocate-no" />
            <span className="text-base font-light tracking-[0.017em] text-[#151515]">
              No
            </span>
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}
