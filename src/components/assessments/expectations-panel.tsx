import { ExpectationCard } from "@/components/assessments/expectation-card";
import type { AssessmentExpectation } from "@/constants/assessment-roadmap";

type ExpectationsPanelProps = {
  items: AssessmentExpectation[];
};

export function ExpectationsPanel({ items }: ExpectationsPanelProps) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-1 rounded-2xl bg-[#F2F2F2] px-4 py-6 duration-500 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-3xl text-left sm:text-center">
        <h2 className="max-w-70 text-[20px] leading-[1.35] font-medium tracking-[0.016em] text-[#151515] sm:max-w-none sm:text-2xl sm:leading-[1.3] sm:tracking-[-0.01em]">
          Here&apos;s what to expect on your journey
        </h2>
        <p className="mt-3 text-sm leading-6 tracking-[0.016em] text-[#151515]/80">
          Take assessments, improve your profile strength and build credibility
          through verified performance
        </p>
      </div>

      <div className="mt-4 grid gap-2 sm:mt-8 sm:gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <ExpectationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
