"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const ease = [0.4, 0, 0.2, 1] as const;

function AnimatedBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function AboutStorySection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-2xl px-6">
        <AnimatedBlock>
          <h2 className="text-[26px] leading-[1.12] font-medium tracking-tight text-gray-900 sm:text-3xl md:text-[40px] text-center">
            Building a career was never easy. But finding direction, proving
            your skills, and getting discovered shouldn&apos;t be this
            difficult.
          </h2>
        </AnimatedBlock>

        <AnimatedBlock delay={0.1}>
          <p className="mt-10 text-[15px] leading-relaxed text-gray-600 md:text-base">
            And in many ways, traditional platforms helped. They gave people
            access to learning, networking, and opportunities.{" "}
            <br className="hidden sm:block" />
            But over time, the gap became more visible.
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.18}>
          <p className="mt-6 text-[15px] leading-relaxed text-gray-600 md:text-base">
            Students and early-career professionals were forced to juggle
            multiple tools just to grow their careers &mdash; one platform for
            learning, another for portfolios, another for networking, and yet
            another for job applications.
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.26}>
          <p className="mt-6 text-[15px] leading-relaxed text-gray-600 md:text-base">
            For ambitious young professionals trying to build real careers, this
            meant constantly switching between disconnected systems with no
            clear way to track growth, prove real work, or stand out to
            employers.
          </p>
        </AnimatedBlock>
      </div>
    </section>
  );
}
