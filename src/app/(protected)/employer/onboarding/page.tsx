import { EmployerLogoMarquee } from "@/components/employer/employer-logo-marquee";
import { EmployerOnboardingForm } from "@/components/employer/employer-onboarding-form";
import { cn } from "@/lib/utils";

export default function EmployerOnboardingPage() {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-360 grid-cols-1 gap-10 px-8 pt-8 pb-20",
        "lg:min-h-[72vh] lg:grid-cols-2 lg:items-center lg:justify-between lg:gap-12",
        "lg:px-14 lg:pt-16 lg:pb-16 xl:gap-12 xl:px-16",
      )}
    >
      <section className="min-w-0 w-full space-y-6">
        <header className="space-y-3">
          <h1 className="text-[24px] font-bold leading-[110%] tracking-[-0.03em] text-foreground lg:text-[28px] xl:text-[32px]">
            Complete your profile
          </h1>
          <p className="text-[18px] font-medium leading-[160%] text-foreground lg:text-[20px] xl:text-[22px]">
            Complete your profile to start hiring verified talent
          </p>
        </header>

        <EmployerOnboardingForm />
      </section>

      <aside className="hidden min-w-0 w-full flex-col items-center justify-center gap-6 text-center lg:flex xl:gap-8">
        <div className="w-full max-w-full space-y-3 xl:space-y-4">
          <p className="font-sans text-xl font-bold leading-snug tracking-[-0.01em] text-primary lg:text-2xl xl:text-[28px] xl:leading-tight">
            &ldquo;Focus your time on qualified candidates instead of sorting
            through endless applications.&rdquo;
          </p>
          <p className="font-sans text-base text-muted-foreground lg:text-lg xl:text-[18px]">
            - Sam Johnson
          </p>
        </div>

        <EmployerLogoMarquee />
      </aside>
    </div>
  );
}
