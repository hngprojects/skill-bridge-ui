"use client";

import { useState } from "react";
import SkillTitleCard from "@/components/verified-report/skill-title-card";
import ProfessionalSkillCard from "@/components/verified-report/professional-skill-card";
import { cn } from "@/lib/utils";
import type { VerifiedProfileDetailedSkill } from "@/types/api";

type SkillDisplayProps = {
  skills: VerifiedProfileDetailedSkill[];
};

const SkillsDisplay = ({ skills }: SkillDisplayProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = skills?.[activeTab];

  if (!skills?.length) return null;

  return (
    <div className="flex flex-col gap-y-6">
      <ul
        className={cn(
          "flex flex-row gap-x-6 overflow-x-auto",
          "scrollbar-thin [scrollbar-color:#DBDBDB_transparent]",
          "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-[#DBDBDB] [&::-webkit-scrollbar-thumb]:rounded-full",
        )}
      >
        {skills.map((skill, i) => (
          <SkillTitleCard
            key={skill.title + i}
            title={skill.title}
            isActive={i === activeTab}
            onClick={() => setActiveTab(i)}
          />
        ))}
      </ul>
      <ul className="flex flex-col gap-y-6">
        {activeItem?.skill_info?.map((item, i) => (
          <ProfessionalSkillCard
            key={item.label + i}
            value={item.value}
            title={item.label}
          />
        ))}
      </ul>
    </div>
  );
};

export default SkillsDisplay;
