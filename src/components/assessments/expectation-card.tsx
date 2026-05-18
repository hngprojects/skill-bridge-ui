import type { AssessmentExpectation } from "@/constants/assessment-roadmap";

type ExpectationCardProps = {
  item: AssessmentExpectation;
};

export function ExpectationCard({ item }: ExpectationCardProps) {
  const Icon = item.icon;

  return (
    <article className="flex min-h-[118px] flex-col items-center justify-center gap-3 rounded-[10px] border border-[#D9D9D9] bg-white px-4 py-5 text-center">
      <Icon className="size-6 text-[#6B7280]" strokeWidth={1.75} />
      <p className="max-w-[190px] text-sm leading-[1.5] tracking-[0.016em] text-[#151515]">
        {item.title}
      </p>
    </article>
  );
}
