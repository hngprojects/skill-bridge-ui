import AdvancedAssessmentSummary from "@/components/assessments/advanced-assessment-summary";
import PersonalAssessmentSummary from "@/components/assessments/personal-assessment-summary";
import SkillAssessementSummary from "@/components/assessments/skill-assessment-summary";
import {
  AssessmentSlug,
  isAssessmentSlug,
} from "@/constants/assessment-previews";
import { notFound } from "next/navigation";

const renderAssessment = (name: AssessmentSlug) => {
  switch (name) {
    case "personal":
      return <PersonalAssessmentSummary />;
    case "advanced":
      return <AdvancedAssessmentSummary />;
    case "skill":
      return <SkillAssessementSummary />;
  }
};

const AssessmentSummaryPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  const transformedName = name.toLowerCase();

  if (!isAssessmentSlug(transformedName)) notFound();

  return renderAssessment(transformedName);
};

export default AssessmentSummaryPage;
