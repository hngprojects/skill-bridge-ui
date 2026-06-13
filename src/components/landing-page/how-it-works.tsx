"use client";

import { motion } from "motion/react";
import { ProcessCard } from "@/components/landing-page/process-card";
import { processSteps } from "@/constants/landing-page";

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-100px" } as const;

export function HowItWorks() {
  const [featuredStep, ...secondarySteps] = processSteps;

  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-340 bg-white px-6 py-12 md:py-20"
    >
      <div className="w-full pb-12 md:pb-20">
        <motion.h2
          className="mx-auto max-w-3xl text-center text-2xl font-bold tracking-tight text-[#151515] sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={viewport}
        >
          Everything You Need To Prove Your Skills
        </motion.h2>

        <div className="mt-10 flex flex-col gap-5 md:mt-12 md:gap-6">
          <ProcessCard step={featuredStep} index={0} />

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {secondarySteps.map((step, index) => (
              <ProcessCard key={step.id} step={step} index={index + 1} />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-screen -translate-x-1/2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
      >
        <svg
          className="h-10 w-full md:h-auto"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <ellipse cx="720" cy="720" rx="1500" ry="720" fill="#EFF7FF" />
        </svg>
      </motion.div>
    </section>
  );
}
