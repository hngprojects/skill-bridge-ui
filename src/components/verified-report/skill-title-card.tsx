import { Button } from "../ui/button";

type TitleCardProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const SkillTitleCard = ({ onClick, isActive, title }: TitleCardProps) => {
  return (
    <Button
      onClick={onClick}
      className={`rounded-md transition-all duration-300 cursor-pointer ${isActive ? "bg-[#EBEBEB] hover:bg-[#EBEBEB]/70 text-black" : "bg-transparent text-[#757575] hover:bg-[#EBEBEB]"}`}
    >
      {title}
    </Button>
  );
};

export default SkillTitleCard;
