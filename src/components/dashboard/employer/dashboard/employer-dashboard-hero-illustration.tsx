import Image from "next/image";

const HERO_ILLUSTRATION = "/assets/employer-dashboard-hero.png";

export function EmployerDashboardHeroIllustration() {
  return (
    <Image
      src={HERO_ILLUSTRATION}
      alt="Verified talent profile with employability score and skill verification checklist"
      width={1000}
      height={219}
      className="h-auto w-full max-w-[407px]"
      priority
    />
  );
}
