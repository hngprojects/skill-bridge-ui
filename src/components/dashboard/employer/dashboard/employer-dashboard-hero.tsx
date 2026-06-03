import Link from "next/link";

import { Button } from "@/components/ui/button";

import { EmployerDashboardHeroIllustration } from "./employer-dashboard-hero-illustration";

export function EmployerDashboardHero() {
  return (
    <section className="overflow-hidden rounded-t-2xl bg-[#dfe4e2] px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-semibold leading-normal text-[#081536]">
            Hire with confidence, verify skills before interviews.
          </h2>
          <p className="text-base leading-normal tracking-[0.017em] text-[#081536]">
            CredLane helps you discover pre-assisted talent, create custom
            assessments, and shortlist talents who are ready to contribute from
            day one
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              asChild
              className="h-10 w-[200px] rounded-lg bg-[#05060f] px-2.5 text-base font-semibold tracking-[0.016em] text-white hover:bg-[#05060f]/90"
            >
              <Link href="/e/dashboard">Explore verified talent</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 w-[200px] rounded-lg border-[#05060f] bg-white px-2.5 text-base font-semibold tracking-[0.016em] text-[#151515] hover:bg-white/90"
            >
              <Link href="/e/dashboard">Create a Role</Link>
            </Button>
          </div>
        </div>

        <div className="hidden shrink-0 lg:block">
          <EmployerDashboardHeroIllustration />
        </div>
      </div>
    </section>
  );
}
