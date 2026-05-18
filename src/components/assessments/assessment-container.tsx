import { ReactNode } from "react";

const AssessmentContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border border-[#DBDBDB] max-w-238 mx-auto my-20 rounded-4xl text-[#151515] bg-white flex flex-col p-6 max-lg:mx-5">
      {children}
    </div>
  );
};

export default AssessmentContainer;
