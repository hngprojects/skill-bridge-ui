import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  LaptopMinimal,
  MonitorPlay,
  MonitorCog,
  TestTubeDiagonal,
} from "lucide-react";

export type AssessmentRoadmapTab = "in-progress" | "completed";
export type AssessmentRoadmapStepStatus = "available" | "locked" | "completed";
export type AssessmentCatalogCategory =
  | "all"
  | "job-assessment"
  | "data-type-assessment"
  | "system-design"
  | "miscellaneous";

export type AssessmentExpectation = {
  id: string;
  title: string;
  icon?: LucideIcon;
  iconSrc?: string;
};

export type AssessmentRoadmapStep = {
  id: string;
  slug: string;
  order: number;
  title: string;
  description: string;
  ctaLabel: string;
  estimatedTime: string;
  panelTitle: string;
  panelIcon: LucideIcon;
  panelClassName: string;
  panelIconClassName: string;
  state: AssessmentRoadmapStepStatus;
  tab: AssessmentRoadmapTab;
};

export type AssessmentCatalogTab = {
  id: AssessmentCatalogCategory;
  label: string;
  aliases?: string[];
};

export type AssessmentCatalogStep = {
  id: string;
  order: number;
  title: string;
  description: string;
  panelTitle: string;
  panelIcon: LucideIcon;
  panelClassName: string;
  panelIconClassName: string;
  state: AssessmentRoadmapStepStatus;
  category: AssessmentCatalogCategory;
  ctaLabel: string;
  cooldownLabel?: string;
  estimatedTime?: string;
  lockLabel?: string;
};

export const ASSESSMENT_PROFILE_COMPLETION = 70;

export const ASSESSMENT_EXPECTATIONS: AssessmentExpectation[] = [
  {
    id: "personal",
    title: "Personal Assessment to find your level",
    iconSrc: "/assets/assessments/personal-assessment-icon.svg",
  },
  {
    id: "career",
    title: "Skill/Career assessment to determine your level",
    iconSrc: "/assets/assessments/skill-assessment-icon.svg",
  },
  {
    id: "advanced",
    title: "Advanced Assessment to evaluate your core knowledge",
    iconSrc: "/assets/assessments/advanced-assessment-icon.svg",
  },
  {
    id: "score",
    title: "Get your score and be job-ready",
    iconSrc: "/file.svg",
  },
];

export const ASSESSMENT_ROADMAP_STEPS: AssessmentRoadmapStep[] = [
  {
    id: "personal-assessment",
    slug: "personal",
    order: 1,
    title: "Personal assessment",
    description:
      "Tell us about your specialization, tools, experience level, and work preferences.",
    ctaLabel: "Start",
    estimatedTime: "30-45 minutes",
    panelTitle: "Find your level!",
    panelIcon: MonitorCog,
    panelClassName: "bg-[#FE9667] text-[#1B0904]",
    panelIconClassName: "text-[#2D150D]",
    state: "available",
    tab: "in-progress",
  },
  {
    id: "skill-career-assessment",
    slug: "skill",
    order: 2,
    title: "Skill/career assessment",
    description:
      "This assessment is designed to evaluate your current skill level in your selected track.",
    ctaLabel: "Start",
    estimatedTime: "30-45 minutes",
    panelTitle: "Choose a stack",
    panelIcon: LaptopMinimal,
    panelClassName: "bg-[#F9E796] text-[#401D09]",
    panelIconClassName: "text-[#49330A]",
    state: "locked",
    tab: "in-progress",
  },
  {
    id: "advanced-assessment",
    slug: "advanced",
    order: 3,
    title: "Advanced assessment",
    description:
      "To get verified score and become discoverable to top employers.",
    ctaLabel: "Start",
    estimatedTime: "30-45 minutes",
    panelTitle: "Get Job Ready!",
    panelIcon: BriefcaseBusiness,
    panelClassName: "bg-[#CBB0EB] text-[#231F29]",
    panelIconClassName: "text-[#2D2742]",
    state: "locked",
    tab: "in-progress",
  },
];

export const ASSESSMENT_CATALOG_TABS: AssessmentCatalogTab[] = [
  { id: "all", label: "All" },
  {
    id: "job-assessment",
    label: "Job assessment",
    aliases: [
      "personal-assessment",
      "skill-career-assessment",
      "advanced-assessment",
      "job-assessment",
    ],
  },
  {
    id: "data-type-assessment",
    label: "Data type assessment",
    aliases: ["data-type-assessment"],
  },
  {
    id: "system-design",
    label: "System design",
    aliases: ["system-design"],
  },
  {
    id: "miscellaneous",
    label: "Miscellaneous",
    aliases: ["miscellaneous"],
  },
];

export const ASSESSMENT_CATALOG_STEPS: AssessmentCatalogStep[] = [
  {
    id: "personal-assessment",
    order: 1,
    title: "Personal assessment",
    description:
      "Tell us about your specialization, tools, experience level, and work preferences.",
    panelTitle: "Find your level!",
    panelIcon: MonitorCog,
    panelClassName: "bg-[#FE9667] text-[#1B0904]",
    panelIconClassName: "text-[#2D150D]",
    state: "completed",
    category: "job-assessment",
    ctaLabel: "Completed",
  },
  {
    id: "skill-career-assessment",
    order: 2,
    title: "Skill/career assessment",
    description:
      "This assessment is designed to evaluate your current skill level in your selected track.",
    panelTitle: "Choose a stack",
    panelIcon: LaptopMinimal,
    panelClassName: "bg-[#F9E796] text-[#401D09]",
    panelIconClassName: "text-[#49330A]",
    state: "available",
    category: "job-assessment",
    ctaLabel: "Start",
    cooldownLabel: "Retake in 24 hours",
  },
  {
    id: "advanced-assessment",
    order: 3,
    title: "Advanced assessment",
    description:
      "To get verified score and become discoverable to top employers.",
    panelTitle: "Get Job Ready!",
    panelIcon: BriefcaseBusiness,
    panelClassName: "bg-[#CBB0EB] text-[#231F29]",
    panelIconClassName: "text-[#2D2742]",
    state: "locked",
    category: "job-assessment",
    ctaLabel: "Start",
    cooldownLabel: "Retake in 14 days",
  },
  {
    id: "ai-mock-interview",
    order: 4,
    title: "AI mock Interview",
    description:
      "To get verified score and become discoverable to top employers.",
    panelTitle: "Interview Ready!",
    panelIcon: MonitorPlay,
    panelClassName: "bg-[#7EFF3C] text-[#102B04]",
    panelIconClassName: "text-[#16390A]",
    state: "locked",
    category: "job-assessment",
    ctaLabel: "Start",
    estimatedTime: "30-45 minutes",
    lockLabel: "Unlock Assessment",
  },
  {
    id: "practical-assessment",
    order: 5,
    title: "Practical assessment",
    description:
      "To get verified score and become discoverable to top employers.",
    panelTitle: "Get tested",
    panelIcon: TestTubeDiagonal,
    panelClassName: "bg-[#10242F] text-[#7BAFCC]",
    panelIconClassName: "text-[#3F8CC5]",
    state: "locked",
    category: "job-assessment",
    ctaLabel: "Start",
    estimatedTime: "30-45 minutes",
    lockLabel: "Unlock Assessment",
  },
];

export const COMPLETED_ASSESSMENT_ICON = CheckCircle2;
