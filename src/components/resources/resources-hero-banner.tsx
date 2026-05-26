import Image from "next/image";

type ResourcesHeroBannerProps = {
  title: string;
  description: string;
};

const ResourcesHeroBanner = ({
  title,
  description,
}: ResourcesHeroBannerProps) => {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden min-h-40 md:min-h-57.75 flex items-center"
      style={{
        background:
          "linear-gradient(90deg, #0E0A2B -6.52%, #3728AA 45.36%, #8886DD 82.82%, #F5EEFE 129.87%, #FFFFFD 174.5%)",
      }}
    >
      <div className="flex flex-col gap-y-2 px-6 py-6 md:px-10 md:py-8 max-w-2xl">
        <h1 className="section-h2 font-bold text-background">{title}</h1>
        <p className="body text-background">{description}</p>
      </div>
      <Image
        src="/assets/resources/resources-hero-illustration.svg"
        alt="Hero illustration"
        width={302}
        height={160}
        loading="eager"
        style={{ width: "auto" }}
        className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default ResourcesHeroBanner;
