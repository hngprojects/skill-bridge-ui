import Image from "next/image";

interface VerifiedReportProgressBarProps {
  label: string;
  value: number;
}

const VerifiedReportProgressBar = ({
  label,
  value,
}: VerifiedReportProgressBarProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row items-center gap-x-1">
        <p className="body font-semibold text-foreground">{label}</p>
        <Image
          src="/assets/icons/information-circle.svg"
          height={16}
          width={16}
          alt="Info"
        />
      </div>
      <div className="mt-2 pb-7">
        <div className="relative">
          <div className="relative h-3 w-full rounded-full bg-border">
            <div
              className="h-full rounded-full bg-success"
              style={{ width: `${value}%` }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-success border-2 border-background shadow-sm"
              style={{ left: `${value}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between">
            {[0, 25, 50, 75, 100].map((tick) => (
              <span
                key={tick}
                className="h-1.5 w-px bg-success"
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between caption text-foreground">
            <span>WEAK</span>
            <span>STRONG</span>
          </div>
          <div
            className="absolute top-7 -translate-x-1/2 rounded-md border border-border bg-card px-2 py-0.5 caption text-foreground shadow-sm"
            style={{ left: `${value}%` }}
          >
            {value}%
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-2 px-4 py-2 rounded-lg bg-success/10">
        <Image
          src="/assets/icons/stars-sparkle.svg"
          height={16}
          width={16}
          alt="AI insight"
        />
        <p className="body-3 text-muted-foreground">
          Placeholder for AI Insight
        </p>
      </div>
    </div>
  );
};

export default VerifiedReportProgressBar;
