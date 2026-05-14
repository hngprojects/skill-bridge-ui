import { Lock } from "lucide-react";

interface Props {
  label: string;
  value: string;
}

export const ReadOnlyField = ({ label, value }: Props) => (
  <div className="flex flex-col gap-1.25 w-full">
    <label className="text-base font-medium text-primary">{label}</label>
    <div className="flex justify-between items-center px-4 py-2.5 h-11 bg-background border border-border rounded-sm">
      <span className="text-muted-foreground font-normal">{value}</span>
      <Lock className="w-5 h-5 text-border" />
    </div>
  </div>
);
