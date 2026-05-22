import Image from "next/image";

const ResourcesHeroBanner = () => {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden min-h-40 md:min-h-57.75 flex items-center"
      style={{
        background:
          "linear-gradient(90deg, #0E0A2B -6.52%, #3728AA 45.36%, #8886DD 82.82%, #F5EEFE 129.87%, #FFFFFD 174.5%)",
      }}
    >
      <div className="flex flex-col gap-y-2 px-6 py-6 md:px-10 md:py-8 max-w-2xl">
        <h1 className="section-h2 font-bold text-background">
          Life as a Frontend Developer
        </h1>
        <p className="body text-background">
          Succeed faster with these frontend developer career resources.
        </p>
        <div className="flex flex-row gap-x-2.5 mt-4">
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`w-2.5 h-2.5 rounded-full ${dot === 0 ? "bg-background/40" : "bg-background/25"}`}
            />
          ))}
        </div>
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
