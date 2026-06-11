import Image from "next/image";

import { AssessmentHeroBanner } from "./assessment-hero-banner";

export function EmployerAssessmentsPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-274 flex-col py-6 sm:min-h-[calc(100dvh-4.5rem)] sm:py-8">
      <AssessmentHeroBanner />

      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 pb-8 text-center">
        <Image
          src="/assets/assessments/no-assessments.svg"
          alt=""
          width={56}
          height={56}
          aria-hidden
        />
        <p className="font-sans text-base font-semibold text-[#151515]">
          No Assessments
        </p>
        <p className="font-sans text-sm text-[#757575]">
          Once you start creating assessments, your talent activity and report
          will appear here.
        </p>
      </div>
    </div>
  );
}
