import Link from "next/link";

import { cn } from "@/lib/utils";

type OverviewHeaderProps = {
  profileCompletion: number;
};

export function OverviewHeader({ profileCompletion }: OverviewHeaderProps) {
  return (
    <section className="flex flex-col gap-8 py-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:py-10">
      <div className="space-y-2">
        <h1 className="text-[22px] leading-[1.5] font-bold text-[#091417] sm:text-[28px] sm:leading-[1.25] sm:tracking-[-0.01em]">
          Welcome, Alex!
        </h1>
        <p className="max-w-2xl text-sm leading-6 tracking-[0.016em] text-[#151515]/80">
          Here&apos;s how to get started with your assessment engine, It&apos;s
          time to get Job-Ready!
        </p>
      </div>

      <div className="w-full self-start lg:max-w-[220px] lg:text-right">
        <Link
          href="/t/profile"
          className="block w-full text-sm leading-5 font-semibold text-[#05060F] underline underline-offset-2"
        >
          Complete your profile
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1 flex-1 rounded-full bg-[#D6FFBE]">
            <div
              className={cn("h-1 rounded-full bg-[#4C9924]")}
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <span className="text-xs leading-4 font-semibold text-[#757575]">
            {profileCompletion}%
          </span>
        </div>
      </div>
    </section>
  );
}
