import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  isPending: boolean;
  onCancel: () => void;
};

const WaitlistFormCTA = ({ onCancel, isPending }: Props) => {
  return (
    <div className="flex flex-col gap-4 px-6 sm:px-0">
      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "h-10 w-full rounded-[5.82px] border-[0.44px] border-[#3F7F95]",
          "bg-primary-900 text-base font-normal leading-5 tracking-[0.017em] text-white",
          "hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-60",
          "sm:mx-auto sm:w-70.5 sm:rounded-lg sm:border-[0.6px] sm:font-semibold",
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit"
        )}
      </Button>
      <Button
        type="button"
        onClick={onCancel}
        disabled={isPending}
        className={cn(
          "h-[34.55px] w-full rounded-[5.82px] border-[0.2px] border-[#E35151]",
          "bg-white text-base font-normal leading-5 tracking-[0.017em] text-[#B01E1E]",
          "hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:hidden",
        )}
      >
        Cancel
      </Button>
    </div>
  );
};

export default WaitlistFormCTA;
