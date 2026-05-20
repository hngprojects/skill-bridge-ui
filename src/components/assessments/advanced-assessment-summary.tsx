import AssessmentContainer from "./assessment-container";
import Image from "next/image";
import NextUpCard from "./next-up-card";

const AdvancedAssessmentSummary = () => {
  return (
    <AssessmentContainer>
      <Image
        alt="Assessement icon"
        src={"/assets/icons/portfolio-icon.svg"}
        height={56}
        width={56}
      />
      <section className="flex flex-col gap-y-4 mt-4 mb-7 md:mb-12">
        <h2 className="font-bold text-xl md:text-3xl leading-[150%]">
          Advanced assessment summary
        </h2>
        <p className="text-base md:text-lg font-light">
          Congratulations!🎉 You’ve completed the Advanced Skill Assessment.
          <br />{" "}
          <p className="mt-2">
            Your results are currently being reviewed and a detailed performance
            report will be sent to your email shortly. The report will include
            your validated skill level, strengths, and recommended growth areas.
          </p>
        </p>
      </section>
      <div className="flex flex-col items-center">
        <Image
          height={120}
          width={100}
          alt="Achievement illustration"
          src={"/assets/icons/achievement-icon.svg"}
        />
        <p className="md:mt-4 md:mb-10 mt-2 mb-5 text-base font-semibold max-md:text-center md:text-lg">
          Your results will be ready in 5 minutes. Check your mailbox.
        </p>
      </div>
      <NextUpCard
        assessement="advanced"
        duration="30-45 minutes"
        title="AI mock interview"
        route="#"
      />
    </AssessmentContainer>
  );
};

export default AdvancedAssessmentSummary;
