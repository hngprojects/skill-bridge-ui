import { DashboardWelcome } from "../../dashboard-welcome";
import { EMPLOYER_DASHBOARD_GOAL } from "@/constants/employer-dashboard";

import { EmployerDashboardHero } from "./employer-dashboard-hero";
import { EmployerDashboardPipelineBanner } from "./employer-dashboard-pipeline-banner";
import { EmployerDashboardTestimonials } from "./employer-dashboard-testimonials";

const NewEmployerDashboardPage = () => {
  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <DashboardWelcome goal={EMPLOYER_DASHBOARD_GOAL} profileCompletion={70} />

      <div className="rounded-2xl">
        <EmployerDashboardHero />
        <EmployerDashboardPipelineBanner />
        <EmployerDashboardTestimonials />
      </div>
    </div>
  );
};

export default NewEmployerDashboardPage;
