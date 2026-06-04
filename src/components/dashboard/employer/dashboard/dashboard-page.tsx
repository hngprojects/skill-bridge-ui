import { DashboardWelcome } from "../../dashboard-welcome";
import { EMPLOYER_DASHBOARD_GOAL } from "@/constants/employer-dashboard";

import { EmployerDashboardActions } from "./employer-dashboard-actions";
import { EmployerDashboardHero } from "./employer-dashboard-hero";
import { EmployerDashboardPipelineBanner } from "./employer-dashboard-pipeline-banner";
import { EmployerDashboardTestimonials } from "./employer-dashboard-testimonials";

const NewEmployerDashboardPage = () => {
  return (
    <div className="flex flex-col gap-10 space-y-6 py-8 max-w-5xl mx-auto">
      <DashboardWelcome goal={EMPLOYER_DASHBOARD_GOAL} profileCompletion={70} />

      <div className="rounded-2xl">
        <EmployerDashboardHero />
        <EmployerDashboardPipelineBanner />
        <EmployerDashboardTestimonials />
      </div>

      <EmployerDashboardActions />
    </div>
  );
};

export default NewEmployerDashboardPage;
