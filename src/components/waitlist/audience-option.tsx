import { cn } from "@/lib/utils";

const AudienceOption = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={cn(
        "flex h-11 flex-1 items-center justify-between rounded-[5px] border border-[#D9D9D9] px-4 transition-colors",
        checked ? "text-[#030509]" : "text-[#64748B]",
      )}
    >
      <span className="text-base font-semibold leading-5 tracking-[0.017em]">
        {label}
      </span>
      <span
        className={cn(
          "size-6 rounded-full border-2 border-black/30",
          checked && "bg-[#344054]",
        )}
      />
    </button>
  );
};

export default AudienceOption;
