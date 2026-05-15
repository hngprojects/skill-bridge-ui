import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectsCard from "./projects-card";
import TalentsCard from "./talents-card";
import { mobileCopy } from "./data";
import SkillsCard from "./skills-card";

type HeroMobileProps = { onJoinClick: () => void };

const HeroMobile = ({ onJoinClick }: HeroMobileProps) => {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] sm:hidden">
      <Image
        aria-hidden
        src="/waitlist-icons/yellow-html.svg"
        alt=""
        width={98}
        height={98}
        className="pointer-events-none absolute top-24 -left-10.75 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/cyan-computer.svg"
        alt=""
        width={161}
        height={161}
        className="pointer-events-none absolute top-99.75 -left-6.25 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/purple-storage.svg"
        alt=""
        width={80}
        height={80}
        className="pointer-events-none absolute top-20.5 right-5 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/light-yellow-upload.svg"
        alt=""
        width={98}
        height={98}
        className="pointer-events-none absolute top-101.5 -right-2.5 z-0"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-6 pt-29.5 text-center">
        <h1 className="text-[28px] font-bold leading-8.75 text-[#0D2025]">
          Your path to getting hired
        </h1>
        <p className="mx-auto mt-5 max-w-101.75 text-base font-light leading-[140%] tracking-[0.017em] text-[#151515]">
          Build the right skills, discover real opportunities, and connect with
          employers ready to hire talent like you.
        </p>
        <Button
          type="button"
          onClick={onJoinClick}
          size="lg"
          className="mt-5 h-10 w-44.75 rounded-lg border-[0.6px] bg-primary-900 px-4 text-base font-semibold leading-5 text-primary-foreground hover:bg-primary-900/70"
        >
          Join the Waitlist
          <ArrowRight className="size-5" />
        </Button>
      </div>

      <div className="relative z-10 mx-auto mt-35 flex flex-col items-center gap-3 px-6">
        <SkillsCard
          title={mobileCopy.skills.title}
          body={mobileCopy.skills.body}
          className="h-76.25 w-75 -rotate-3"
        />
        <ProjectsCard
          title={mobileCopy.projects.title}
          body={mobileCopy.projects.body}
          className="h-76.25 w-75 rotate-2"
        />
        <TalentsCard
          title={mobileCopy.talents.title}
          body={mobileCopy.talents.body}
          className="h-76.25 w-75 -rotate-2"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full">
        <svg
          aria-hidden
          className="block h-12 w-full"
          viewBox="0 0 1440 137"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <ellipse cx="720" cy="720" rx="1275" ry="720" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default HeroMobile;
