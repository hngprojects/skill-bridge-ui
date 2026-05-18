import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const userTrack = "Frontend Development";

const PersonalAssessementSummary = () => {
  return (
    <div className="border border-[#DBDBDB] max-w-238 mx-auto my-20 rounded-4xl text-[#151515] bg-white flex flex-col p-6 max-lg:mx-5">
      <Image
        alt="Assessement icon"
        src={"./assets/icons/assessement-icon.svg"}
        height={56}
        width={56}
      />
      <section className="flex flex-col gap-y-2 mt-4 mb-7 md:mb-12">
        <h2 className="font-bold text-xl md:text-3xl leading-[150%]">
          Personal assessement summary
        </h2>
        <p className="text-base md:text-lg font-light max-w-196.75">
          Based on your background in{" "}
          <span className="font-bold capitalize">{userTrack}</span>. We&apos;ve
          processed your responses to personalize your learning path, job
          mathches, and upcoming skill assessements.
        </p>
      </section>
      <div className="flex flex-col items-center">
        <Image
          height={120}
          width={100}
          alt="Achievement illustration"
          src={"./assets/icons/achievement-icon.svg"}
        />
        <p className="md:mt-4 md:mb-10 mt-2 mb-5 text-base font-semibold max-md:text-center md:text-lg">
          Great work! You&apos;ve unlocked your next assessment.
        </p>
        <Button className="bg-[#322B2B] text-white rounded-lg h-10 w-60 hover:bg-[#322B2B]/70 transition-all duration-300 cursor-pointer">
          Continue
        </Button>
      </div>

      <section className="mt-7 md:mt-12.5">
        <h3 className="font-semibold">Next up in your assessement roadmap</h3>
        <div className="flex border items-start rounded-3xl mt-2 border-[#DBDBDB] md:flex-row flex-col p-3 gap-6">
          <Image
            alt="Computer setup icon"
            height={56}
            width={56}
            src={"./assets/icons/computer-setup-icon.svg"}
          />
          <div className="flex flex-col">
            <h4 className="font-semibold text-lg">Skill/career assessment</h4>
            <p className="text-light text-lg mt-1 mb-4">
              To get verified score and become discoverable to top employers.
            </p>
            <p className="text-[#757575] text-base flex flex-col max-sm:gap-y-2 md:flex-row gap-x-4 ">
              <Link
                className="text-[#34A853] underline font-semibold"
                href={"*"}
              >
                Continue to next
              </Link>
              <p>Estimated time: 30-45 minutes</p>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalAssessementSummary;
