import { Input } from "@/components/ui/input";

const LINKEDIN_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
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

interface SettingsLinkedInFieldProps {
  value: string;
  onChange: (v: string) => void;
}

export function SettingsLinkedInField({
  value,
  onChange,
}: SettingsLinkedInFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        Connect LinkedIn
      </label>
      <div className="relative flex items-center">
        <Input
          type="url"
          value={value}
          placeholder="Enter LinkedIn URL"
          onChange={(e) => onChange(e.target.value)}
          className="pr-12"
        />
        <span className="absolute right-3 pointer-events-none">
          {LINKEDIN_ICON}
        </span>
      </div>
    </div>
  );
}
