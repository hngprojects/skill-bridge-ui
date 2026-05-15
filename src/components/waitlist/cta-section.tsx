import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = { onJoinClick: () => void };

const CtaSection = ({ onJoinClick }: Props) => {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden font-sans bg-background text-primary-foreground"
    >
      <div className="pointer-events-none w-full">
        <svg
          aria-hidden
          className="block h-20 w-full sm:h-32"
          viewBox="0 0 1440 137"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <ellipse cx="720" cy="720" rx="1275" ry="720" fill="#05060F" />
        </svg>
      </div>
      <div className="relative bg-[#05060F] max-sm:px-3 pb-16 pt-6 sm:min-h-141.25 sm:pb-24 sm:pt-25.75">
        <Image
          aria-hidden
          src="/waitlist-icons/yellow-html.svg"
          alt=""
          width={98}
          height={98}
          className="pointer-events-none absolute -top-1.25 left-4.25 z-0 hidden sm:block"
        />
        <Image
          aria-hidden
          src="/waitlist-icons/cyan-computer.svg"
          alt=""
          width={161}
          height={161}
          className="pointer-events-none absolute top-29.5 left-68.75 z-0 hidden sm:block"
        />
        <Image
          aria-hidden
          src="/waitlist-icons/green-palette.svg"
          alt=""
          width={80}
          height={80}
          className="pointer-events-none absolute top-105.75 -left-5.5 z-0 hidden sm:block"
        />
        <Image
          aria-hidden
          src="/waitlist-icons/purple-storage.svg"
          alt=""
          width={80}
          height={80}
          className="pointer-events-none absolute -top-17.25 right-82.5 z-0 hidden sm:block"
        />
        <Image
          aria-hidden
          src="/waitlist-icons/blue-picker.svg"
          alt=""
          width={99}
          height={99}
          className="pointer-events-none absolute top-8.75 right-23.75 z-0 hidden sm:block"
        />
        <Image
          aria-hidden
          src="/waitlist-icons/light-yellow-upload.svg"
          alt=""
          width={98}
          height={98}
          className="pointer-events-none absolute top-37.5 right-54 z-0 hidden sm:block"
        />
        <Image
          aria-hidden
          src="/waitlist-icons/dark-blue-tsx.svg"
          alt=""
          width={170}
          height={170}
          className="pointer-events-none absolute top-67.75 -right-5.5 z-0 hidden sm:block"
        />

        <div className="relative z-10 mx-auto max-w-138 text-center">
          <h2 className="text-2xl font-medium leading-tight text-white sm:hidden">
            Your score is waiting!
          </h2>
          <h2 className="hidden text-white text-[40px] font-bold leading-12.5 sm:block">
            Ready for hiring built on
            <br /> proof, not promises
          </h2>

          <p className="mx-auto mt-3 max-w-md text-white/70 sm:hidden">
            Take the assessment, prove your skills, and let the right
            opportunities find you.
          </p>
          <p className="mx-auto mt-12.5 hidden max-w-138 text-white font-semibold text-base leading-5 sm:block">
            Join the SkillBridge waitlist and get early access to a smarter way
            to hire and get hired.
          </p>

          <div className="mt-7 flex justify-center sm:mt-12.5">
            <Button
              type="button"
              onClick={onJoinClick}
              size="lg"
              className="h-12 rounded-md bg-white px-6 text-primary-900 hover:bg-white/90 sm:hidden"
            >
              Join the Waitlist
            </Button>
            <Button
              type="button"
              onClick={onJoinClick}
              size="lg"
              className="hidden h-14 w-60 rounded-lg bg-white text-xl font-bold leading-6.25 text-[#05060F] hover:bg-white/90 sm:inline-flex"
            >
              Reserve My Spot
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
