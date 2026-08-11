"use client";

import Image from "next/image";
import Link from "next/link";

import AssessmentContainer from "@/components/assessments/assessment-container";
import { isSkillExhausted } from "@/components/assessments/dashboard-home-state";
import { Progress } from "@/components/ui/progress";
import { useDashboardHome } from "@/hooks/api/use-dashboard";
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
  const { data: dashboardHome } = useDashboardHome();
  const result = useAssessmentSummaryStore((state) =>
    user?.id ? state.resultsByUser[user.id]?.skill : null,
  );
  const storedClaimedLevel = useAssessmentSummaryStore((state) =>
    user?.id ? state.skillClaimedLevelsByUser[user.id] : null,
  );
  const isUserContextReady = Boolean(user?.id);
  const validatedLevel = formatLevel(result?.validated_level, "Junior");
  const claimedLevel = formatLevel(
    result?.claimed_level ?? storedClaimedLevel ?? undefined,
    "your selected level",
  );
  const progressValue = result?.percentage ?? 57;
  const skillPassed =
    result?.passed ?? dashboardHome?.performance?.skill?.passed === true;
  const isDowngraded = result?.downgraded ?? !skillPassed;
  // const feedback =
  //   result?.personalised_message ??
  //   result?.guidance_report?.summary ??
  //   "This does not define your potential. It helps us tailor your assessment accurately.";

  // Attempt counts come from /dashboard/home, not the submit response — the
  // skill submit doesn't carry the user's running attempt tally. Exhaustion
  // goes through the shared helper so partial payloads (e.g. only the
  // top-level skillAttemptsUsed/skillMaxAttempts mirrors) still hide retake.
  const skillPerf = dashboardHome?.performance?.skill;
  const attemptsUsed =
    skillPerf?.attemptsUsed ?? dashboardHome?.skillAttemptsUsed;
  const maxAttempts = dashboardHome?.skillMaxAttempts;
  const hasAttemptsInfo = attemptsUsed != null && maxAttempts != null;
  const noAttemptsLeft = isSkillExhausted(dashboardHome);
  const advancedStatus = dashboardHome?.journeyOverview?.find(
    (item) => item.key === "advanced",
  )?.status;
  const canContinueToAdvanced = advancedStatus === "available";
  // Retake stays available whenever attempts remain, even after a pass —
  // users can try for a higher validated level up to the attempt cap before
  // they're required to move on with the level they were given.
  const showRetakeButton = !noAttemptsLeft;
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
          Skill Level Evaluation summary
        </h2>
        <p className="text-base md:text-lg font-light max-w-208.75">
          {!skillPassed ? (
            <>
              You completed the assessment, but your score didn&apos;t meet the
              50% minimum required to move forward. You&apos;re welcome to
              retake the assessment when you&apos;re ready.
            </>
          ) : (
            <>
              Congratulations, you completed your assessment. Based on your
              evaluation, your validated level is{" "}
              <span className="font-bold capitalize">{validatedLevel}</span>
              {isDowngraded ? (
                <>
                  {" "}
                  instead of your claim of{" "}
                  <span className="font-bold capitalize">{claimedLevel}</span>.
                  You can continue to the next assessment.
                </>
              ) : (
                ". You can continue to the next assessment."
              )}
            </>
          )}
        </p>
      </section>
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          {/* <p className="text-[#4FB609] font-bold text-base md:text-2xl flex flex-row items-center">
            Validated
            <Dot size={40} />
            {validatedLevel} Level
          </p> */}
          <Progress value={progressValue} className="h-1 *:bg-[#4FB609]" />
          {hasAttemptsInfo ? (
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              You have used{" "}
              <span className="font-semibold text-foreground">
                {attemptsUsed}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {maxAttempts}
              </span>{" "}
              skill attempts.
              {noAttemptsLeft ? " No retakes remaining." : null}
            </p>
          ) : null}
        </div>
        {/* {isDowngraded && (
          <div className="border mt-6 w-fit border-[#FF7854] bg-[#FFF1EE] flex flex-row gap-x-4 items-center py-2.5 px-3 rounded-lg">
            <Image
              src={"/assets/icons/alert-icon.svg"}
              height={24}
              width={24}
              alt="Alert icon"
            />
            <p className="text-[#757575] text-[14px]">{feedback}</p>
          </div>
        )} */}
        <div className="flex flex-col gap-y-4 sm:flex-row items-center self-center mt-15.5 gap-x-2">
          {showRetakeButton && (
            <Button
              asChild
              className="bg-[#322B2B] text-white disabled:text-white rounded-lg h-10 min-w-fit md:w-52.25 hover:bg-[#322B2B]/70 transition-all disabled:bg-[#0F1724]/50 duration-300 cursor-pointer"
            >
              <Link href="/t/assessments/skill">Retake </Link>
            </Button>
          )}
          <Button
            asChild
            className={
              skillPassed && canContinueToAdvanced
                ? "bg-primary text-primary-foreground rounded-lg h-10 w-fit md:min-w-60 hover:bg-primary/90 transition-all duration-300 cursor-pointer"
                : "bg-muted text-foreground rounded-lg h-10 w-fit md:min-w-60 hover:bg-muted/70 transition-all duration-300 cursor-pointer"
            }
          >
            <Link
              href={
                canContinueToAdvanced
                  ? "/t/assessments/advanced"
                  : "/t/dashboard"
              }
            >
              {canContinueToAdvanced
                ? "Accept & continue"
                : "Return to dashboard"}
            </Link>
          </Button>
        </div>
      </div>
      <NextUpCard
        assessement="skill"
        duration="30 minutes"
        title="Job Readiness Evaluation"
      />
    </AssessmentContainer>
  );
};

export default SkillAssessementSummary;
