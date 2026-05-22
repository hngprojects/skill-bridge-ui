"use client";

import Image from "next/image";

import { useMe } from "@/hooks/api";
import { useAssessmentSummaryStore } from "@/stores/assessment-summary-store";

import AssessmentContainer from "./assessment-container";
import NextUpCard from "./next-up-card";

function formatTier(tier?: string) {
  if (!tier) return "being reviewed";
  return tier.replace(/_/g, " ");
}

const AdvancedAssessmentSummary = () => {
  const { data: user } = useMe({ enabled: true });
  const result = useAssessmentSummaryStore((state) =>
    user?.id ? state.resultsByUser[user.id]?.advanced : null,
  );
  const isUserContextReady = Boolean(user?.id);
  const tier = formatTier(result?.tier);
  const scoreSummary =
    result?.score !== undefined && result?.max_score !== undefined
      ? `Your score is ${result.score}/${result.max_score} (${result.percentage}%).`
      : "Your results are currently being reviewed.";

  return !isUserContextReady ? (
    <AssessmentContainer>
      <p className="text-base text-muted-foreground">
        Loading your assessment summary...
      </p>
    </AssessmentContainer>
  ) : (
    <AssessmentContainer>
      <Image
        alt="Assessment icon"
        src={"/assets/icons/portfolio-icon.svg"}
        height={56}
        width={56}
      />
      <section className="flex flex-col gap-y-4 mt-4 mb-7 md:mb-12">
        <h2 className="font-bold text-xl md:text-3xl leading-[150%]">
          Advanced assessment summary
        </h2>
        <div className="text-base md:text-lg font-light">
          <p>
            Congratulations! You have completed the Advanced Skill Assessment.
          </p>
          <p className="mt-2">
            {scoreSummary} Your current result tier is{" "}
            <span className="font-bold capitalize">{tier}</span>. A detailed
            performance report will be sent to your email shortly.
          </p>
        </div>
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
        route="/t/dashboard"
      />
    </AssessmentContainer>
  );
};

export default AdvancedAssessmentSummary;
