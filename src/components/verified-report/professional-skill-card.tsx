import Image from "next/image";
import VerifiedReportProgressIndicator from "./verified-reports-progress-indicator";

type Props = {
  title: string;
  value: number;
};
const ProfessionalSkillCard = ({ title, value }: Props) => {
  return (
    <div className="border border-[#DBDBDB] rounded-lg bg-white p-4">
      <div className="flex flex-row gap-x-2.5">
        <p className="font-semibold text-lg">{title} </p>
        <Image
          src={"/assets/icons/info-icon.svg"}
          height={16}
          width={16}
          alt="info icon"
        />
      </div>
      <VerifiedReportProgressIndicator value={value} />
      <div className="gap-x-4 flex flex-row py-2 px-4 rounded-lg bg-[#ECFDF5]">
        <Image
          src={"/assets/icons/stars-sparkle.svg"}
          height={24}
          width={24}
          alt="Sparkle icon"
        />
        <p className="text-[#535862] text-sm">Placeholder for AI insight</p>
      </div>
    </div>
  );
};

export default ProfessionalSkillCard;
