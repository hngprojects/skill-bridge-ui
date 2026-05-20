import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userReport } from "@/constants/verified-report";
import VerifiedReportProfile from "./verified-report-profile";
import VerifiedReportSkillsPanel from "./verified-report-skills-panel";

const VerifiedReportPage = () => {
  return (
    <div className="flex flex-col gap-y-6 my-8">
      <section className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <h2 className="section-h3 font-bold text-foreground">
            Verified Report
          </h2>
          <p className="body font-light text-foreground">
            Here&apos;s how to know how employers see your profile!
          </p>
        </div>
        <Button variant="ghost" className="underline gap-x-2">
          Download CV
          <Download size={16} />
        </Button>
      </section>

      <section className="flex flex-col gap-y-5">
        <VerifiedReportProfile report={userReport} />
        <VerifiedReportSkillsPanel detailedSkills={userReport.detailedSkills} />
      </section>
    </div>
  );
};

export default VerifiedReportPage;
