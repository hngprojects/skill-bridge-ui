import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-[5px] border border-[#D9D9D9] bg-white px-4 text-base font-semibold leading-5 tracking-[0.017em] text-[#030509] outline-none placeholder:font-semibold placeholder:text-[#030509] focus:border-primary-900 focus:ring-2 focus:ring-primary-900/15",
        props.className,
      )}
    />
  );
};

export default TextInput;
