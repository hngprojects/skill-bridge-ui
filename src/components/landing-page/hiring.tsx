"use client";

import { motion } from "motion/react";
import { ProcessCard } from "@/components/landing-page/process-card";
import { hiringSteps } from "@/constants/landing-page";

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-100px" } as const;

export function HiringGrid() {
  const secondarySteps = hiringSteps.filter((step) => !step.featured);
  const featuredStep = hiringSteps.find((step) => step.featured);

  return (
    <section className="bg-[#EFF7FF] px-6 py-12 md:py-20">
      <div className="mx-auto max-w-340">
        <motion.h2
          className="mx-auto max-w-3xl text-center text-2xl font-bold tracking-tight text-[#151515] sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={viewport}
        >
          A Faster and Smarter Way to Hire Talent
        </motion.h2>

        <div className="mt-10 flex flex-col gap-5 md:mt-12 md:gap-6">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {secondarySteps.map((step, index) => (
              <ProcessCard
                key={step.id}
                step={step}
                index={index}
                // ctaHref="/signup?user=employer"
                bgColor="#DFEDFD"
              />
            ))}
          </div>

          {featuredStep && (
            <ProcessCard
              step={featuredStep}
              index={secondarySteps.length}
              ctaHref="/signup?user=employer"
              bgColor="#DFEDFD"
            />
          )}
        </div>
      </div>
    </section>
  );
}
