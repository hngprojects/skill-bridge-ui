import Image from "next/image";

const HeroDesktopFloatingImages = () => {
  return (
    <>
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
    </>
  );
};

export default HeroDesktopFloatingImages;
