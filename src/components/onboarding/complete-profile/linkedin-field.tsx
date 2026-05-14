import { UseFormRegister } from "react-hook-form";

const LINKEDIN_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path d="M7.5 9.5H5V19H7.5V9.5Z" fill="white" />
    <circle cx="6.25" cy="6.75" r="1.5" fill="white" />
    <path
      d="M19 19H16.5V14C16.5 12.9 15.9 12 14.75 12C13.6 12 13 12.9 13 14V19H10.5V9.5H13V10.8C13.5 9.9 14.6 9.2 16 9.2C17.9 9.2 19 10.5 19 13V19Z"
      fill="white"
    />
  </svg>
);

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

export const LinkedInField = ({ register }: Props) => (
  <div className="flex flex-col gap-1.25 w-full">
    <label className="text-base font-medium text-primary leading-5 tracking-tight">
      Connect your LinkedIn profile
    </label>
    <div className="relative flex items-center border border-border rounded-sm focus-within:border-primary transition-colors">
      <input
        {...register("linkedin")}
        type="text"
        className="w-full bg-background outline-none text-sm text-primary placeholder:text-muted-foreground/30 px-4 py-2.5 h-11 rounded-sm pr-10"
      />
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 pointer-events-none">
        {LINKEDIN_ICON}
      </div>
    </div>
  </div>
);
