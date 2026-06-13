"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";
import { featureCards } from "@/constants/landing-page";

const logos = [
  "/assets/company/hotjar.svg",
  "/assets/company/asana.svg",
  "/assets/company/framer.svg",
  "/assets/company/pendo.svg",
  "/assets/company/attentive.svg",
  "/assets/company/github.svg",
  "/assets/company/hellosign.svg",
];

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        aria-label={`${rating} out of 5 stars`}
        role="img"
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const fillAmount = Math.min(Math.max(rating - index, 0), 1);

          return (
            <span key={index} className="relative inline-block size-4">
              <Star className="size-4 fill-gray-200 text-gray-200" />
              {fillAmount > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillAmount * 100}%` }}
                >
                  <Star className="size-4 fill-[#FFD100] text-[#FFD100]" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-sm font-medium text-[#151515]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="about" className="bg-background">
      <div className="mx-auto w-full max-w-340 px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="mt-4 leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            viewport={viewport}
          >
            Trusted and used by companies and professionals worldwide
          </motion.p>
        </div>
        {/* Logo marquee */}

        <motion.div
          className="mt-10 overflow-hidden opacity-40 grayscale"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          viewport={viewport}
        >
          <motion.div
            className="flex min-w-max items-center gap-x-9 sm:gap-x-12 lg:gap-x-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <Image
                key={`${logo}-${index}`}
                src={logo}
                alt="Company Logo"
                width={130}
                height={50}
                className="h-auto w-18.5 sm:w-24 md:w-28 lg:w-32.5"
              />
            ))}
          </motion.div>
        </motion.div>
        <div className="my-20">
          <div className="flex justify-center items-center flex-col mb-10.5 gap-7">
            <div className="flex items-center gap-2 ">
              <Image
                src="/assets/employer-dashboard/checkmark-circle.svg"
                alt="checkmark"
                width={24}
                height={24}
              />
              2000+ Verified Talents <span className="px-6">|</span> 200+
              employers reviews
            </div>
            <h1 className="text-2xl font-bold">What our users say about us</h1>
          </div>
          {/* Cards Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature, i) => (
              <motion.article
                key={feature.name}
                className="flex flex-col overflow-hidden rounded-3xl bg-[#EFEFEF]"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                viewport={viewport}
                whileHover={{ y: -4, transition: { duration: 0.2, ease } }}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={feature.img}
                    alt={feature.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 px-5 py-6 sm:px-6 sm:py-7">
                  <StarRating rating={feature.rating} />
                  <p className="text-base text-[#151515]">
                    <span className="font-bold">{feature.name}</span>
                    {", "}
                    <span className="font-normal italic">{feature.role}</span>
                  </p>
                  <p className="text-sm leading-relaxed text-[#151515]/80">
                    &ldquo;{feature.description}&rdquo;
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
