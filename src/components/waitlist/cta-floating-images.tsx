import Image from "next/image";

const CTAFloatingImages = () => {
  return (
    <>
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
    </>
  );
};

export default CTAFloatingImages;
