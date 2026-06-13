"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/constants/landing-page";

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-100px" } as const;

type ProcessStep = (typeof processSteps)[number];

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-3xl bg-[#EFEFEF]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      viewport={viewport}
    >
      <div
        className={
          step.featured
            ? "flex flex-col gap-6 px-6 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:pt-8"
            : "flex flex-col gap-5 px-6 pt-6 pb-5 sm:px-10 sm:pt-10"
        }
      >
        <div className={step.featured ? "max-w-2xl" : undefined}>
          <h3 className="text-xl font-bold tracking-tight text-[#151515] sm:text-2xl">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#151515]/70 sm:text-base">
            {step.description}
          </p>
        </div>

        <Button
          className="w-fit shrink-0 rounded-lg bg-[#151515] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#151515]/90"
          asChild
        >
          <Link href="/signup">Learn more</Link>
        </Button>
      </div>

      <div
        className={
          step.featured
            ? "relative flex min-h-[220px] w-full items-center justify-center overflow-hidden sm:min-h-[280px] md:min-h-[320px] p-4 md:px-20 md:pt-10"
            : "relative flex min-h-[200px] w-full items-center justify-center overflow-hidden sm:min-h-[240px] p-4"
        }
        style={{ backgroundColor: step.accent }}
      >
        <Image
          src={step.img}
          alt={step.title}
          width={step.featured ? 988 : 520}
          height={step.featured ? 589 : 360}
          className="h-auto w-full object-contain object-bottom"
        />
      </div>
    </motion.article>
  );
}

export function HowItWorks() {
  const [featuredStep, ...secondarySteps] = processSteps;

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-340 bg-white px-6 py-12 md:py-20"
    >
      <div className="w-full">
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
    </section>
  );
}
