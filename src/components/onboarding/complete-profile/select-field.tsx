import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SELECT_CLASS =
  "w-full h-11 px-4 border-border rounded-sm bg-background shadow-none focus:ring-1 focus:ring-primary";

interface Props {
  label: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

export const SelectField = ({ label, options, onChange }: Props) => (
  <div className="flex flex-col gap-1.25 w-full">
    <label className="text-base font-medium text-primary">{label}</label>
    <Select onValueChange={onChange}>
      <SelectTrigger className={SELECT_CLASS}>
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
  </div>
);
