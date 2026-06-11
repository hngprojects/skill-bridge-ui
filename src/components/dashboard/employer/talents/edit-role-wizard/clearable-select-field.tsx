"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SELECT_TRIGGER_CLASS } from "./constants";

type ClearableSelectFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

export function ClearableSelectField({
  label,
  placeholder,
  value,
  options,
  onChange,
}: ClearableSelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
        {label}
      </p>
      {value ? (
        <div className="flex h-11 items-center justify-between rounded-lg border border-[#d9d9d9] bg-white px-4">
          <span className="text-base font-medium tracking-[0.017em] text-[#151515]">
            {value}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onChange("")}
            aria-label={`Clear ${label.toLowerCase()}`}
            className="size-5 text-[#757575] hover:bg-transparent hover:text-[#151515]"
          >
            <X className="size-5" aria-hidden />
          </Button>
        </div>
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={SELECT_TRIGGER_CLASS}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
