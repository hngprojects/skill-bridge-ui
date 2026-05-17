import { EmployerLogoMarquee } from "@/components/employer/employer-logo-marquee";
import { EmployerOnboardingForm } from "@/components/employer/employer-onboarding-form";

export default function EmployerOnboardingPage() {
  return (
    <div className="mx-auto flex w-full max-w-360 flex-col px-4 pt-8 pb-20 lg:min-h-[72vh] lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:pt-16 lg:pb-16 xl:px-16">
      <section className="w-full space-y-6 lg:max-w-140">
        <header className="space-y-3">
          <h1 className="text-[24px] font-bold leading-[110%] tracking-[-0.03em] text-foreground lg:text-[32px]">
            Complete your profile
          </h1>
          <p className="text-[18px] font-medium leading-[160%] text-foreground lg:text-[22px]">
            Complete your profile to start hiring verified talent
          </p>
        </header>

        <EmployerOnboardingForm />
      </section>

      <aside className="hidden w-full max-w-135 shrink-0 flex-col items-center justify-center gap-8 text-center lg:flex">
        <div className="space-y-4">
          <p className="section-h2 !font-bold text-primary">
            &ldquo;Focus your time on qualified candidates instead of sorting
            through endless applications.&rdquo;
          </p>
          <p className="section-h4 text-muted-foreground">- Sam Johnson</p>
        </div>

        <EmployerLogoMarquee />
      </aside>
    </div>
  );
}
