"use client";

import Image from "next/image";
import Link from "next/link";

import AssessmentContainer from "./assessment-container";
import NextUpCard from "./next-up-card";
import { Button } from "../ui/button";
import { useMe } from "@/hooks/api";

const PersonalAssessmentSummary = () => {
  const { data: user } = useMe({ enabled: true });
  const userTrack = user?.track ?? "your selected track";

  return (
    <AssessmentContainer>
      <Image
        alt="Assessment icon"
        src={"/assets/icons/assessement-icon.svg"}
        height={56}
        width={56}
      />
      <section className="flex flex-col gap-y-4 mt-4 mb-7 md:mb-12">
        <h2 className="font-bold text-xl md:text-3xl leading-[150%]">
          Personal assessment summary
        </h2>
        <p className="text-base md:text-lg font-light max-w-196.75">
          Based on your background in{" "}
          <span className="font-bold capitalize">{userTrack}</span>. We&apos;ve
          processed your responses to personalize your learning path, job
          matches, and upcoming skill assessments.
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
          Great work! You&apos;ve unlocked your next assessment.
        </p>
        <Button
          asChild
          className="bg-[#322B2B] text-white rounded-lg h-10 w-60 hover:bg-[#322B2B]/70 transition-all duration-300 cursor-pointer"
        >
          <Link href="/t/dashboard">Continue</Link>
        </Button>
      </div>
      <NextUpCard
        assessement="personal"
        duration="30-45 minutes"
        title="Skill/career assessment"
        route="#"
      />
    </AssessmentContainer>
  );
};

export default PersonalAssessmentSummary;
