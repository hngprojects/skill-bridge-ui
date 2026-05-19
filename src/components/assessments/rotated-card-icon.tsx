import Image from "next/image";

interface RotatedCardIconProps {
  icon: "level-adjusted" | "congratulations";
}

const RotatedCardIcon = ({ icon }: RotatedCardIconProps) => {
  const src =
    icon === "level-adjusted"
      ? "/assets/icons/level-adjusted-icon.svg"
      : "/assets/icons/congratulations-icon.svg";

  return (
    <Image
      src={src}
      width={92}
      height={110}
      alt={
        icon === "level-adjusted"
          ? "Level adjusted icon"
          : "Congratulations icon"
      }
    />
  );
};

export default RotatedCardIcon;
