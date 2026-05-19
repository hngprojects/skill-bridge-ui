import Image from "next/image";
import NextUpCard from "./next-up-card";
import { Button } from "../ui/button";
import AssessmentContainer from "@/components/assessments/assessment-container";
import { Dot } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillAssessementSummary = () => {
  return (
    <AssessmentContainer>
      <Image
        src={"/assets/icons/computer-setup-icon.svg"}
        height={56}
        width={56}
        alt="Computer desktop icon"
      />
      <section className="flex flex-col gap-y-2 mt-4 mb-7 md:mb-12">
        <h2 className="font-bold text-xl md:text-3xl leading-[150%]">
          Skill assessment summary
        </h2>
        <p className="text-base md:text-lg font-light max-w-208.75">
          Congratulations 🎉 you completed you r assessement. Based on your
          evaluation, your validated level is{" "}
          <span className="font-bold capitalize">Junior.</span> instead of your
          claim of <span className="font-bold">Mid-Level.</span> You can{" "}
          <span className="font-bold">retake</span> after 24 hours.
        </p>
      </section>
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <p className="text-[#4FB609] font-bold text-base md:text-2xl flex flex-row items-center">
            Validated
            <Dot size={40} />
            Junior Level
          </p>
          <Progress value={57} className="h-1 *:bg-[#4FB609]" />
        </div>
        <div className="border mt-6 w-fit border-[#FF7854] bg-[#FFF1EE] flex flex-row gap-x-4 items-center py-2.5 px-3 rounded-lg">
          <Image
            src={"/assets/icons/alert-icon.svg"}
            height={24}
            width={24}
            alt="Alert icon"
          />
          <p className="text-[#757575] text-[14px]">
            This doesn&apos;t define your potential -- it helps us tailor your
            assessment accurately.
          </p>
        </div>
        <div className="flex flex-col gap-y-4 sm:flex-row items-center self-center mt-15.5 gap-x-2">
          <Button
            disabled={true}
            className="bg-[#322B2B] text-white disabled:text-white rounded-lg h-10 min-w-fit md:w-52.25 hover:bg-[#322B2B]/70 transition-all disabled:bg-[#0F1724]/50 duration-300 cursor-pointer"
          >
            Retake (valid in 24h)
          </Button>
          <Button className="bg-[#322B2B] text-white rounded-lg h-10 w-fit md:min-w-60 hover:bg-[#322B2B]/70 transition-all duration-300 cursor-pointer">
            Accept & continue
          </Button>
        </div>
      </div>
      <NextUpCard
        assessement="skill"
        duration="30-45 minutes"
        title="Advanced assessment"
        route="#"
      />
    </AssessmentContainer>
  );
};

export default SkillAssessementSummary;
