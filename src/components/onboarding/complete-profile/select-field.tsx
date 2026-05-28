import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SELECT_CLASS =
  "w-full h-11 px-4 border-border rounded-sm bg-background shadow-none focus:ring-1 focus:ring-primary";

const SELECT_ERROR_CLASS =
  "border-error ring-1 ring-error/20 focus:ring-error/40";

interface Props {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
}

export const SelectField = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
}: Props) => (
  <div className="flex flex-col gap-1.25 w-full">
    <label className="text-base font-medium text-primary">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-invalid={Boolean(error)}
        onBlur={onBlur}
        className={cn(SELECT_CLASS, error && SELECT_ERROR_CLASS)}
      >
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error ? (
      <p role="alert" className="text-sm text-error">
        {error}
      </p>
    ) : null}
  </div>
);
