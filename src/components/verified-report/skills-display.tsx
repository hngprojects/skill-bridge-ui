"use client";

import { useState } from "react";
import SkillTitleCard from "@/components/verified-report/skill-title-card";
import ProfessionalSkillCard from "@/components/verified-report/professional-skill-card";

type SkillDisplayProps = {
  skills: { title: string; skillInfo: { label: string; value: number }[] }[];
};
const SkillsDisplay = ({ skills }: SkillDisplayProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = skills[activeTab];
  return (
    <div className="flex flex-col gap-y-6">
      <ul className="flex flex-row gap-x-6">
        {skills.map((skill, i) => (
          <SkillTitleCard
            key={skill.title}
            title={skill.title}
            isActive={i === activeTab}
            onClick={() => setActiveTab(i)}
          />
        ))}
      </ul>
      <ul className="flex flex-col gap-y-6">
        {activeItem.skillInfo.map((item) => (
          <ProfessionalSkillCard
            key={item.label}
            value={item.value}
            title={item.label}
          />
        ))}
      </ul>
    </div>
  );
};

export default SkillsDisplay;
