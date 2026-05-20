import Image from "next/image";
import InfoDisplay from "@/components/verified-report/info-display";
import { Button } from "@/components/ui/button";
import { Dot, Download } from "lucide-react";
import { userReport } from "@/constants/verified-report";
import HexagonPercentageItem from "@/components/verified-report/hexagon-percentage-item";

const VerifiedReportPage = () => {
  return (
    <div className="flex flex-col gap-y-6 my-8.5">
      <section className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-2">
          <h2 className="font-bold text-2xl text-black">Verified Report</h2>
          <p className="font-light text-base">
            Here&apos;s how to know how employers see your profile!
          </p>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <Button className="underline" variant={"ghost"}>
            Download CV
            <Download size={16} />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-5 md:flex-row md:justify-between gap-x-10 rounded-xl border border-[#DBDBDB] p-3 md:p-6 bg-[#FAFAFA]">
          <div className="flex flex-1 flex-col gap-y-6 min-w-0">
            <div className="flex flex-col gap-y-2 sm:flex-row gap-x-6 sm:items-center">
              <Image
                src={"/assets/placeholder-avatar.svg"}
                height={124}
                width={124}
                alt="User avatar"
              />
              <div className="flex flex-col gap-y-1">
                <p className="font-bold text-2xl">{userReport.name}</p>
                <p className="text-lg font-light flex flex-row gap-x-2 items-center flex-wrap">
                  {userReport.role}
                  <Dot size={30} className="hidden lg:block" />
                  <p>Goal: {userReport.goal}</p>
                </p>
              </div>
            </div>

            <InfoDisplay title="About" info={userReport.about} />
            <InfoDisplay title="Skills" info={userReport.skills} />
            <InfoDisplay title="AI Report" info={userReport.aiReport} />
          </div>
          <div className="max-md:self-center">
            <HexagonPercentageItem value={85} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifiedReportPage;
