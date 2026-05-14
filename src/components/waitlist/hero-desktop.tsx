import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectsCard from "./projects-card";
import TalentsCard from "./talents-card";
import { desktopCopy } from "./data";
import SkillsCard from "./skills-card";

type HeroDesktopProps = { onJoinClick: () => void };

const HeroDesktop = ({ onJoinClick }: HeroDesktopProps) => {
  return (
    <section className="relative hidden overflow-hidden bg-[#f5f5f5] pt-16 sm:block">
      <Image
        aria-hidden
        src="/waitlist-icons/yellow-html.svg"
        alt=""
        width={98}
        height={98}
        className="pointer-events-none absolute top-16 left-4.25 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/cyan-computer.svg"
        alt=""
        width={161}
        height={161}
        className="pointer-events-none absolute top-46.75 left-68.75 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/green-palette.svg"
        alt=""
        width={80}
        height={80}
        className="pointer-events-none absolute top-123 -left-5.5 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/purple-storage.svg"
        alt=""
        width={80}
        height={80}
        className="pointer-events-none absolute top-0 right-82.5 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/blue-picker.svg"
        alt=""
        width={99}
        height={99}
        className="pointer-events-none absolute top-26 right-23.75 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/light-yellow-upload.svg"
        alt=""
        width={98}
        height={98}
        className="pointer-events-none absolute top-54.75 right-54 z-0"
      />
      <Image
        aria-hidden
        src="/waitlist-icons/dark-blue-tsx.svg"
        alt=""
        width={170}
        height={170}
        className="pointer-events-none absolute top-85 -right-5.5 z-0"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <h1 className="font-extrabold text-5xl leading-15 text-primary-900">
          Find talent. Get hired
        </h1>
        <p className="mx-auto mt-6 max-w-123.25 text-[#151515] text-base leading-[160%]">
          SkillBridge helps candidate prove their skills and connects them with
          employers who needs them.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            onClick={onJoinClick}
            size="lg"
            className="h-14 rounded-lg bg-primary-900 px-4 text-[22px] font-semibold leading-7 text-primary-foreground border hover:bg-primary-900/90"
          >
            Join the Waitlist
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-20 w-full max-w-230.5 px-6">
        <div className="flex items-start justify-center gap-1.5">
          <SkillsCard
            title={desktopCopy.skills.title}
            body={desktopCopy.skills.body}
            className="z-10 h-76.25 w-75 -rotate-3"
          />
          <ProjectsCard
            title={desktopCopy.projects.title}
            body={desktopCopy.projects.body}
            className="z-20 h-76.25 w-75 translate-y-[2.5px] rotate-2"
          />
          <TalentsCard
            title={desktopCopy.talents.title}
            body={desktopCopy.talents.body}
            className="z-10 h-76.25 w-75 translate-y-[2.5px] -rotate-2"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full">
        <svg
          aria-hidden
          className="block h-24 w-full"
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

export default HeroDesktop;
