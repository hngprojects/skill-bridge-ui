import type { ChartBar } from "@/components/emerging-user-skill-bar-column";

export interface ChartZone {
  id: string;
  label: string;
  bars: ChartBar[];
}

export interface InsightCard {
  title: string;
  description: string;
}

export interface SkillItem {
  text: string;
}