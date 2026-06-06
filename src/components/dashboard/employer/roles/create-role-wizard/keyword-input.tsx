"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { KEYWORD_OPTIONS } from "@/constants/create-role-wizard";

type KeywordInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function KeywordInput({ value, onChange }: KeywordInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setSearch("");
  };

  const add = (keyword: string) => {
    const trimmed = keyword.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setSearch("");
  };

  const remove = (keyword: string) => {
    onChange(value.filter((k) => k !== keyword));
  };

  const filtered = KEYWORD_OPTIONS.filter(
    (k) => !value.includes(k) && k.toLowerCase().includes(search.toLowerCase()),
  );

  const showAddOption =
    search.trim().length > 0 && !value.includes(search.trim());

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          aria-controls="keyword-options"
          className="min-h-12 w-full cursor-pointer rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm"
        >
          {value.length === 0 ? (
            <span className="text-[#98A2B3]">Select or type keywords...</span>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {value.map((kw) => (
                <span
                  key={kw}
                  className="flex items-center gap-1 rounded-md bg-[#F2F4F7] px-2 py-0.5 text-xs font-medium text-[#344054]"
                >
                  {kw}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(kw);
                    }}
                    className="text-[#667085] hover:text-[#101828]"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
        sideOffset={4}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search or add..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList id="keyword-options">
            {showAddOption && (
              <CommandGroup>
                <CommandItem
                  value={`__add__${search}`}
                  onSelect={() => add(search)}
                >
                  Add &ldquo;{search.trim()}&rdquo;
                </CommandItem>
              </CommandGroup>
            )}
            {filtered.length > 0 && (
              <CommandGroup>
                {filtered.map((kw) => (
                  <CommandItem key={kw} value={kw} onSelect={() => add(kw)}>
                    {kw}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {!showAddOption && filtered.length === 0 && (
              <CommandEmpty>No keywords found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
