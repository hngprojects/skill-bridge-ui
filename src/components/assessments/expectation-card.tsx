import Image from "next/image";

import type { AssessmentExpectation } from "@/constants/assessment-roadmap";
import { cn } from "@/lib/utils";

type ExpectationCardProps = {
  item: AssessmentExpectation;
};

export function ExpectationCard({ item }: ExpectationCardProps) {
  const Icon = item.icon;

  return (
    <article
      className={cn(
        "animate-in fade-in zoom-in-95 flex min-h-[118px] flex-col items-center justify-center",
        "gap-3 rounded-[10px] border border-[#D9D9D9] bg-white px-4 py-5 text-center",
        "duration-300 transition-transform hover:-translate-y-0.5 hover:shadow-sm",
      )}
    >
      {item.iconSrc ? (
        <Image
          src={item.iconSrc}
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="size-6 object-contain"
        />
      ) : Icon ? (
        <Icon className="size-6 text-[#6B7280]" strokeWidth={1.75} />
      ) : null}
      <p className="max-w-[190px] text-sm leading-[1.5] tracking-[0.016em] text-[#151515]">
        {item.title}
      </p>
    </article>
  );
}
