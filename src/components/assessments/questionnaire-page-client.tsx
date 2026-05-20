"use client";

import { useParams } from "next/navigation";

import { AdvancedAssessmentFlow } from "@/components/assessments/advanced-assessment-flow";
import { PersonalAssessmentFlow } from "@/components/assessments/personal-assessment-flow";
import { SkillAssessmentFlow } from "@/components/assessments/skill-assessment-flow";

export function QuestionnairePageClient() {
  const { name } = useParams<{ name: string }>();

  if (name === "skill") return <SkillAssessmentFlow />;
  if (name === "advanced") return <AdvancedAssessmentFlow />;
  return <PersonalAssessmentFlow />;
}
