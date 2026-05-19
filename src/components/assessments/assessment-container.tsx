import { ReactNode } from "react";

const AssessmentContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border border-[#DBDBDB] max-w-238 lg:w-full mx-auto my-10 rounded-4xl text-[#151515] bg-white flex flex-col md:p-6 px-2.5 py-6 max-lg:mx-3">
      {children}
    </div>
  );
};

export default AssessmentContainer;
