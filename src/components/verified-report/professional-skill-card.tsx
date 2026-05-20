import Image from "next/image";

type Props = {
  title: string;
  value: number;
};
const ProfessionalSkillCard = ({ title, value }: Props) => {
  return (
    <div className="border border-[#DBDBDB] rounded-lg bg-white p-4">
      <div className="flex flex-row gap-x-2.5">
        <p className="font-semibold text-[18px]">{title} </p>
        <Image
          src={"/assets/icons/info-icon.svg"}
          height={16}
          width={16}
          alt="info icon"
        />
      </div>
      <div className="mt-6">
        <p>Progress bar {value}</p>
      </div>
      <div className="gap-x-4 mt-6 flex flex-row py-2 px-4 rounded-lg bg-[#ECFDF5]">
        <Image
          src={"/assets/icons/sparkle-icon.svg"}
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
