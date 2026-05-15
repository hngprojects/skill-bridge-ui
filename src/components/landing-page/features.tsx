"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { featureCards } from "@/constants/landing-page";

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

export function FeaturesSection() {
  return (
    <section id="about" className="bg-background py-12 md:py-24">
      <div className="mx-auto w-full max-w-340 px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={viewport}
          >
            Everything You Need To Prove Your Skills
          </motion.h2>
          <motion.p
            className="mt-4 leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            viewport={viewport}
          >
            Measure your ability, improve faster, and get discovered by
            employers hiring verified talent.
          </motion.p>
        </div>

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
                className={`relative flex h-56 w-full items-center justify-center p-6 ${feature.accent}`}
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
