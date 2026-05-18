"use client";

import { Button } from "@/components/ui/button";
import { DashboardSkillBar, type SkillBarProps } from "./dashboard-skill-bar";

const SKILL_DATA: SkillBarProps[] = [
  {
    title: "Strength breakdown",
    percentage: 70,
    insight: "Placeholder text for AI Insights",
    insightVariant: "success",
  },
  {
    title: "Professional Skills",
    percentage: 40,
    insight: "Advance Assessment Engine 3",
    insightVariant: "warning",
  },
  {
    title: "Soft Skills",
    percentage: 30,
    insight: "Advance Assessment Engine 3",
    insightVariant: "warning",
  },
];

export function DashboardSkillBreakdown() {
  return (
    <section aria-labelledby="skill-breakdown-heading">
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="skill-breakdown-heading"
          className="text-[18px] font-bold tracking-tight text-foreground"
        >
          Skill Breakdown
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-lg border-border px-4 text-xs font-medium text-foreground hover:bg-muted"
        >
          Learn more
        </Button>
      </div>

      {/* Skill cards */}
      <div className="flex flex-col gap-4">
        {SKILL_DATA.map((skill) => (
          <DashboardSkillBar key={skill.title} {...skill} />
        ))}
      </div>
    </section>
  );
}
