import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import { AssessmentSlug } from "@/constants/assessment-previews";

type Props = {
  duration: string;
  title: string;
  assessement: AssessmentSlug;
  route: string;
};

const NextUpCard = ({ assessement, title, duration, route }: Props) => {
  const isUnlockAssessmentDisabled = true;
  return (
    <section className="mt-7 md:mt-12.5">
      <h3 className="font-semibold">
        {assessement === "advanced"
          ? "Boost your profile and unlock more oppurtunities by taking additional assessments."
          : "Next up in your assessement roadmap"}
      </h3>
      <div className="flex border items-start rounded-3xl mt-2 border-[#DBDBDB] md:flex-row flex-col p-3 gap-6">
        <Image
          alt="Computer setup icon"
          height={56}
          width={56}
          src={
            assessement === "personal"
              ? "/assets/icons/computer-setup-icon.svg"
              : assessement === "skill"
                ? "/assets/icons/portfolio-icon.svg"
                : "/assets/icons/tv-play-icon.svg"
          }
        />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-y-2 mb-1 sm:flex-row justify-between sm:items-center">
            <h4 className="font-semibold text-lg">{title}</h4>
            {assessement === "advanced" && (
              <Button
                disabled={isUnlockAssessmentDisabled}
                className="disabled:bg-[#EBEBEB] text-xs disabled:hover:bg-[#EBEBEB]/70 cursor-pointer rounded-lg border border-[#DBDBDB] disabled:text-black"
              >
                Unlock Assessment
                <LockKeyhole />
              </Button>
            )}
          </div>
          <p className="text-light text-lg mt-1 mb-4">
            To get verified score and become discoverable to top employers.
          </p>
          <p className="text-[#757575] text-base flex flex-col max-sm:gap-y-2 md:flex-row gap-x-4 ">
            <Link
              className="text-[#34A853] underline font-semibold"
              href={route}
            >
              Continue to next
            </Link>
            <p>Estimated time: {duration}</p>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NextUpCard;
