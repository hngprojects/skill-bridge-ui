import { ASSESSMENT_EXPECTATIONS } from "@/constants/assessment-previews";

function AssessmentPreviewExpectations() {
  return (
    <div className="mt-5 border-t border-[#D9D9D9] pt-6 2xl:mt-8 2xl:pt-8">
      <h2 className="font-sans text-base font-bold text-foreground 2xl:text-2xl">
        What to Expect
      </h2>

      <ul className="mt-4 flex flex-col gap-2.5 font-sans text-xs leading-4 text-muted-foreground 2xl:mt-6 2xl:gap-3 2xl:text-base 2xl:leading-7">
        {ASSESSMENT_EXPECTATIONS.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground 2xl:mt-3" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { AssessmentPreviewExpectations };
