"use client";

import { ChevronDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type JumpToSelectProps = {
  items: { id: string; label: string }[];
  className?: string;
};

const JumpToSelect = ({ items, className }: JumpToSelectProps) => {
  function handleChange(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const firstId = items[0]?.id ?? "";

  return (
    <div className={className}>
      <label
        htmlFor="terms-jump-to"
        className="mb-2 block text-sm font-medium text-[#0F0F14]"
      >
        Jump to:
      </label>
      <Select defaultValue={firstId} onValueChange={handleChange}>
        <SelectTrigger
          id="terms-jump-to"
          className="h-13.75 w-full rounded-2xl border-0 bg-[#F5F5F5] px-4 text-[#2C5F70] data-[size=default]:h-13.75 [&>svg:last-child]:hidden"
        >
          <SelectValue />
          <ChevronDown className="size-5 shrink-0 text-[#2C5F70]" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {items.map((item, i) => (
            <SelectItem
              key={item.id}
              value={item.id}
              className="text-[#2C5F70]"
            >
              • {String(i + 1).padStart(2, "0")}. {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default JumpToSelect;
