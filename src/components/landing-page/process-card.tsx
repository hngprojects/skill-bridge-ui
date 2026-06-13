"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ProcessCardProps } from "@/types/process-card";

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-100px" } as const;

export function ProcessCard({
  step,
  index = 0,
  ctaHref = "/signup",
  ctaLabel = "Learn more",
  bgColor = "#EFEFEF",
}: ProcessCardProps) {
  const featured = step.featured ?? false;

  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-3xl"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      viewport={viewport}
    >
      <div
        className={
          featured
            ? "flex flex-col gap-6 px-6 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:pt-8"
            : "flex flex-col gap-5 px-6 pt-6 pb-5 sm:px-10 sm:pt-10"
        }
      >
        <div className={featured ? "max-w-2xl" : undefined}>
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
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>

      <div
        className={
          featured
            ? "relative flex min-h-[220px] w-full items-center justify-center overflow-hidden p-4 sm:min-h-[280px] md:min-h-[320px] md:px-20 md:pt-10"
            : "relative flex min-h-[200px] w-full items-center justify-center overflow-hidden p-4 sm:min-h-[240px]"
        }
        style={{ backgroundColor: step.accent }}
      >
        <Image
          src={step.img}
          alt={step.title}
          width={featured ? 988 : 520}
          height={featured ? 589 : 360}
          className="h-auto w-full object-contain object-bottom"
        />
      </div>
    </motion.article>
  );
}
