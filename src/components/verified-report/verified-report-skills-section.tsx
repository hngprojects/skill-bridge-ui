import SkillsDisplay from "@/components/verified-report/skills-display";
import type { VerifiedProfileDetailedSkill } from "@/types/api";

type VerifiedReportSkillsSectionProps = {
  skills: VerifiedProfileDetailedSkill[];
};

export function VerifiedReportSkillsSection({
  skills,
}: VerifiedReportSkillsSectionProps) {
  return (
    <div className="flex flex-col bg-[#FAFAFA] rounded-xl border border-[#DBDBDB] p-3 md:p-6">
      <SkillsDisplay skills={skills} />
    </div>
  );
}
