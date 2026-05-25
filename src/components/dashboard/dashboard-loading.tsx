import Image from "next/image";

function DashboardLoading() {
  return (
    <div
      role="status"
      aria-label="Preparing your dashboard..."
      className="flex min-h-[60vh] flex-col items-center justify-center p-6"
    >
      <div className="animate-in fade-in flex flex-col items-center justify-center space-y-8 duration-500">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg
            aria-hidden="true"
            className="text-primary-500 absolute inset-0 h-full w-full animate-spin"
            viewBox="0 0 100 100"
            style={{ animationDuration: "1.5s" }}
          >
            <circle
              className="opacity-20"
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <circle
              className="opacity-100"
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray="144"
              strokeDashoffset="72"
              strokeLinecap="round"
            />
          </svg>

          <div className="bg-background absolute inset-2 flex items-center justify-center rounded-full shadow-lg">
            <Image
              src="/assets/logo/logo.svg"
              alt="CredLane logo"
              width={48}
              height={48}
              className="h-12 w-12"
              priority
            />
          </div>
        </div>

        <h3 className="text-foreground animate-pulse text-xl font-medium tracking-tight">
          Preparing your dashboard...
        </h3>
      </div>
    </div>
  );
}

export { DashboardLoading };
