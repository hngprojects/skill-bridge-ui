import React from "react";
import { DashboardWelcome } from "../../dashboard-welcome";

const NewEmployerDashboardPage = () => {
  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <DashboardWelcome
        firstName="John Doe"
        goal="Browse through job ready talents who have completed their assessments"
        profileCompletion={70}
      />
    </div>
  );
};

export default NewEmployerDashboardPage;
