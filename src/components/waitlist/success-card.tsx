import { CheckCircle } from "lucide-react";

const SuccessCard = () => {
  return (
    <div className="h-[198.52px] w-[164.89px] rotate-[-5.34deg] rounded-2xl bg-[#042F21] p-[14.6px] sm:h-60.5 sm:w-50.25 sm:rotate-[-5.68deg] sm:p-[14.6px]">
      <div className="flex h-full flex-col items-center gap-[13.13px] sm:gap-4">
        <div className="flex h-[130.44px] w-full items-center justify-center rounded-[6.56px] bg-[#D0FBED] sm:h-39.75 sm:rounded-lg">
          <CheckCircle
            className="size-[65.63px] text-[#042F21] sm:size-20"
            strokeWidth={1.5}
          />
        </div>
        <p className="text-[9.84px] font-bold leading-3 tracking-[0.016em] text-[#D0FBED] sm:text-xs sm:leading-3.75">
          You&apos;re In!
        </p>
      </div>
    </div>
  );
};
export default SuccessCard;
