import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectInput = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(
          "h-11 w-full appearance-none rounded-[5px] border border-[#D9D9D9] bg-white px-4 pr-10 text-base font-light leading-5 tracking-[0.016em] text-[#030509] outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/15",
          props.className,
        )}
      />
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-6 -translate-y-1/2 text-[#94A3B8]" />
    </div>
  );
};

export default SelectInput;
