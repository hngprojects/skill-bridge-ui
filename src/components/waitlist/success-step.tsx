import { Button } from "@/components/ui/button";
import SocialFooter from "./social-footer";
import SuccessCard from "./success-card";

const SuccessStep = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-1 flex-col px-5.5 pt-14 pb-6 sm:px-7 sm:pb-7 sm:pt-14">
      <header className="flex flex-col items-center gap-2.25">
        <h2 className="text-[22px] font-semibold leading-7 text-[#151515] sm:text-[28px] sm:font-bold sm:leading-8.75">
          Congratulations
        </h2>
        <p className="text-center text-xs font-normal leading-3.75 tracking-[0.017em] text-[#151515] sm:text-sm sm:leading-4.5 sm:tracking-[0.016em]">
          You&apos;ve successfully secured your spot
        </p>
      </header>

      <div className="mt-10 flex justify-center sm:mt-9">
        <SuccessCard />
      </div>

      <div className="mt-10.5 sm:mt-19.5">
        <SocialFooter />
      </div>

      <Button
        type="button"
        onClick={onBack}
        className="mt-4 h-10 w-full rounded-[5.82px] border-[0.44px] border-[#3F7F95] bg-[#2C5F70] text-base font-normal leading-5 tracking-[0.017em] text-white hover:bg-primary-900 sm:hidden"
      >
        Go back to waitlist
      </Button>
    </div>
  );
};

export default SuccessStep;
