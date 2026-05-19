import Image from "next/image";

const HeroMobileFloatingImages = () => {
  return (
    <>
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
    </>
  );
};

export default HeroMobileFloatingImages;
