"use client";

import Link from "next/link";
import Image from "next/image";

export function TalentsHeroBanner() {
  return (
    <div
      className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#DFE4E2] px-6 py-6 md:px-8"
      style={{ minHeight: "231px" }}
    >
      <div className="relative z-10 flex flex-col gap-6 max-w-[55%]">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-semibold text-[#081536]">
            Verified candidate discovery
          </h2>
          <p className="text-base font-normal tracking-[0.017em] text-[#081536]">
            Succeed faster with these frontend developer career resources.
          </p>
        </div>

        <Link
          href="/e/shortlist"
          className="flex w-50 items-center justify-center rounded-lg bg-[#05060F] px-4 py-2 text-base font-semibold text-white"
        >
          View Shortlist
        </Link>
      </div>

      <div className="absolute right-0 top-0 h-full w-[45%] max-w-105 sm:w-[40%]">
        <Image
          src="/assets/images/employer-talent-hero.svg"
          alt="Hero Preview Illustration"
          fill
          className="object-contain object-right"
          priority
        />
      </div>
    </div>
  );
}
