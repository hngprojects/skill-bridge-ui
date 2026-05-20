"use client";

import { useState } from "react";
import { SkillCategory } from "@/constants/verified-report";
import VerifiedReportProgressBar from "./verified-report-progress-bar";

interface VerifiedReportSkillsPanelProps {
  detailedSkills: SkillCategory[];
}

const VerifiedReportSkillsPanel = ({
  detailedSkills,
}: VerifiedReportSkillsPanelProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeSkills = detailedSkills[activeTab];

  return (
    <div className="flex flex-col gap-y-6 bg-muted rounded-xl border border-border p-3 md:p-6">
      {/* Tabs */}
      <div className="flex flex-row flex-wrap gap-2">
        {detailedSkills.map((category, index) => (
          <button
            key={category.title}
            onClick={() => setActiveTab(index)}
            className={`px-3 py-2 rounded-lg body transition-colors ${
              activeTab === index
                ? "bg-border text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-y-8">
        {activeSkills.skillInfo.map((skill) => (
          <VerifiedReportProgressBar
            key={skill.label}
            label={skill.label}
            value={skill.value}
          />
        ))}
      </div>
    </div>
  );
};

export default VerifiedReportSkillsPanel;
