import Image from "next/image";
import { socials } from "./data";

const SocialFooter = () => {
  return (
    <div className="mt-6 flex flex-col items-center gap-4 sm:mt-12 sm:gap-3">
      <div className="flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-[#D9D9D9]" />
        <span className="text-xs font-normal leading-3.75 tracking-[0.017em] text-[#94A3B8] sm:text-sm sm:leading-4.5 sm:tracking-[0.016em]">
          Find more on our socials
        </span>
        <span className="h-px flex-1 bg-[#D9D9D9]" />
      </div>
      <ul className="flex items-center gap-6">
        {socials.map((s) => (
          <li key={s.alt}>
            <a
              href={s.href}
              aria-label={s.alt}
              target="_blank"
              rel="noreferrer"
              className="block transition-transform hover:scale-110"
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={32}
                height={32}
                className="size-8"
              />
            </a>
          </li>
        ))}
      </ul>
      <p className="text-center text-xs font-normal leading-3.75 tracking-[0.017em] text-[#757575] sm:text-sm sm:leading-4.5 sm:tracking-[0.016em]">
        Check out our{" "}
        <a href="#" className="font-semibold underline">
          Help center,
        </a>{" "}
        if you have more questions
      </p>
    </div>
  );
};

export default SocialFooter;
