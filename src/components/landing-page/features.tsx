"use client";

import { motion } from "motion/react";
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

export function FeaturesSection() {
  return (
    <section id="about" className="bg-background pb-12 md:pb-24">
      <div className="mx-auto w-full max-w-340 px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          {/* <motion.h2
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={viewport}
          >
            Everything You Need To Prove Your Skills
          </motion.h2> */}
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
        {/* Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-[#f8f9fa]"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              viewport={viewport}
              whileHover={{ y: -4, transition: { duration: 0.2, ease } }}
            >
              <div
                className={`relative flex h-56 w-full items-center justify-center p-6 bg-[${feature.accent}]`}
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  fill
                  className="w-full h-auto"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="mb-3 font-semibold tracking-tight text-slate-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
