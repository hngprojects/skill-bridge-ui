"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-100px" } as const;

const stats = [
  {
    value: "85%",
    label: "Average employability score of verified talents",
  },
  {
    value: "3",
    label: "Job ready assessments to be taken by all vetted talents",
  },
  {
    value: "2000+",
    label: "Vetted talents across various professional backgrounds",
  },
] as const;

export function ReadyForHireSection() {
  return (
    <section
      id="contact"
      className="bg-[#05060F] "
      aria-labelledby="ready-for-hire-heading"
    >
      <div className="relative w-full bg-[#05060F] items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="flex w-full max-w-160 flex-col items-center gap-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={viewport}
          >
            <h2
              id="ready-for-hire-heading"
              className="max-w-[18rem] text-center text-[22px] font-bold leading-tight text-white sm:max-w-none sm:text-3xl md:text-4xl"
            >
              Find Talent, Get Hired
            </h2>
            <p className="max-w-xl text-center text-[15px] leading-relaxed text-white/90 sm:text-base">
              Join 2,000+ talents and discover a smarter, faster way to prove
              skills, connect with opportunities, and hire verified talents.
            </p>

            <Button
              asChild
              variant="secondary"
              className="rounded-lg bg-secondary px-6 py-5 text-sm font-semibold text-[#334155]"
            >
              <Link href="/signup">Try it for free</Link>
            </Button>
          </motion.div>

          <motion.div
            className="grid w-full mx-auto max-w-7xl px-6 py-12 md:py-16 grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6  border-b border-white/10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            viewport={viewport}
          >
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col items-center gap-2 text-center text-[#A3A6C2]"
              >
                <p className="text-3xl font-bold md:text-7xl">{stat.value}</p>
                <p className="max-w-56 text-sm leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
