import { HugeiconsIcon } from "@hugeicons/react";

import type { AssessmentExpectation } from "@/constants/assessment-roadmap";
import { cn } from "@/lib/utils";

type ExpectationCardProps = {
  item: AssessmentExpectation;
};

export function ExpectationCard({ item }: ExpectationCardProps) {
  return (
    <article
      className={cn(
        "animate-in fade-in zoom-in-95 flex min-h-29.5 flex-col items-center justify-center",
        "gap-3 rounded-[10px] border border-[#D9D9D9] bg-white px-4 py-5 text-center",
        "duration-300 transition-transform hover:-translate-y-0.5 hover:shadow-sm",
      )}
    >
      <HugeiconsIcon
        icon={item.icon}
        size={24}
        strokeWidth={1.75}
        className="text-[#6B7280]"
        aria-hidden
      />
      <p className="max-w-47.5 text-sm leading-normal tracking-[0.016em] text-[#151515]">
        {item.title}
      </p>
    </article>
  );
}
