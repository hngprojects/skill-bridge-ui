"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type SkillsFieldProps = {
  skills: string[];
  onChange: (skills: string[]) => void;
};

export function SkillsField({ skills, onChange }: SkillsFieldProps) {
  const [skillInput, setSkillInput] = useState("");

  function handleAddSkill() {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setSkillInput("");
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
        Skills
      </p>
      {skills.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex h-10 items-center gap-2.5 rounded-lg bg-[#ebebeb] px-2.5 text-base tracking-[0.017em] text-[#151515]"
            >
              {skill}
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() =>
                  onChange(skills.filter((item) => item !== skill))
                }
                aria-label={`Remove ${skill}`}
                className="size-4 text-[#757575] hover:bg-transparent hover:text-[#151515]"
              >
                <X className="size-4" aria-hidden />
              </Button>
            </span>
          ))}
        </div>
      ) : null}
      <div className="flex h-11 items-center gap-2 rounded-lg border border-[#d9d9d9] bg-white px-4">
        <Search className="size-4.5 shrink-0 text-[#757575]" aria-hidden />
        <input
          value={skillInput}
          onChange={(event) => setSkillInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAddSkill();
              event.currentTarget.blur();
            }
          }}
          onBlur={handleAddSkill}
          placeholder="e.g. React, Typescript"
          className="w-full bg-transparent text-base font-light tracking-[0.017em] text-[#151515] outline-none placeholder:text-[#757575]"
        />
      </div>
    </div>
  );
}
