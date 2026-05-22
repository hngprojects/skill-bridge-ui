"use client";

import Image from "next/image";
import Link from "next/link";
import { Dot } from "lucide-react";

import AssessmentContainer from "@/components/assessments/assessment-container";
import { Progress } from "@/components/ui/progress";
import { useMe } from "@/hooks/api";
import { useAssessmentSummaryStore } from "@/stores/assessment-summary-store";

import NextUpCard from "./next-up-card";
import { Button } from "../ui/button";

function formatLevel(level: string | undefined, fallback: string) {
  if (!level) return fallback;

  return level
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const SkillAssessementSummary = () => {
  const { data: user } = useMe({ enabled: true });
  const result = useAssessmentSummaryStore((state) =>
    user?.id ? state.resultsByUser[user.id]?.skill : null,
  );
  const isUserContextReady = Boolean(user?.id);
  const validatedLevel = formatLevel(result?.validated_level, "Junior");
  const claimedLevel = formatLevel(result?.claimed_level, "Mid-Level");
  const progressValue = result?.percentage ?? 57;
  const isDowngraded = result?.downgraded ?? true;
  const feedback =
    result?.personalised_message ??
    result?.guidance_report?.summary ??
    "This does not define your potential. It helps us tailor your assessment accurately.";

  return !isUserContextReady ? (
    <AssessmentContainer>
      <p className="text-base text-muted-foreground">
        Loading your assessment summary...
      </p>
    </AssessmentContainer>
  ) : (
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
          Congratulations, you completed your assessment. Based on your
          evaluation, your validated level is{" "}
          <span className="font-bold capitalize">{validatedLevel}</span>
          {isDowngraded ? (
            <>
              {" "}
              instead of your claim of{" "}
              <span className="font-bold capitalize">{claimedLevel}</span>. You
              can <span className="font-bold">retake</span> after 24 hours.
            </>
          ) : (
            ". You can continue to the next assessment."
          )}
        </p>
      </section>
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <p className="text-[#4FB609] font-bold text-base md:text-2xl flex flex-row items-center">
            Validated
            <Dot size={40} />
            {validatedLevel} Level
          </p>
          <Progress value={progressValue} className="h-1 *:bg-[#4FB609]" />
        </div>
        {isDowngraded && (
          <div className="border mt-6 w-fit border-[#FF7854] bg-[#FFF1EE] flex flex-row gap-x-4 items-center py-2.5 px-3 rounded-lg">
            <Image
              src={"/assets/icons/alert-icon.svg"}
              height={24}
              width={24}
              alt="Alert icon"
            />
            <p className="text-[#757575] text-[14px]">{feedback}</p>
          </div>
        )}
        <div className="flex flex-col gap-y-4 sm:flex-row items-center self-center mt-15.5 gap-x-2">
          {isDowngraded && (
            <Button
              disabled={true}
              className="bg-[#322B2B] text-white disabled:text-white rounded-lg h-10 min-w-fit md:w-52.25 hover:bg-[#322B2B]/70 transition-all disabled:bg-[#0F1724]/50 duration-300 cursor-pointer"
            >
              Retake (valid in 24h)
            </Button>
          )}
          <Button
            asChild
            className="bg-[#322B2B] text-white rounded-lg h-10 w-fit md:min-w-60 hover:bg-[#322B2B]/70 transition-all duration-300 cursor-pointer"
          >
            <Link href="/t/dashboard">Accept &amp; continue</Link>
          </Button>
        </div>
      </div>
      <NextUpCard
        assessement="skill"
        duration="30-45 minutes"
        title="Advanced assessment"
        route="/t/assessments/advanced"
      />
    </AssessmentContainer>
  );
};

export default SkillAssessementSummary;
