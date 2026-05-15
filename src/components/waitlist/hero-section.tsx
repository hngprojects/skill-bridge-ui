import HeroDesktop from "./hero-desktop";
import HeroMobile from "./hero-mobile";

type HeroProps = { onJoinClick: () => void };

const HeroSection = ({ onJoinClick }: HeroProps) => {
  return (
    <>
      <HeroMobile onJoinClick={onJoinClick} />
      <HeroDesktop onJoinClick={onJoinClick} />
    </>
  );
};

export default HeroSection;
