"use client";

import { motion } from "motion/react";
import Image from "next/image";

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

export function CTAAndLogos() {
  return (
    <section className="py-12 md:py-24 bg-[#EFF7FF]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12">
          {/* Heading */}
          <motion.div
            className="order-2 text-center lg:order-1 lg:w-2/3 lg:text-left"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={viewport}
          >
            <h2 className="mx-auto max-w-sm text-xl font-bold leading-tight text-slate-900 sm:text-2xl lg:mx-0 lg:max-w-none lg:text-4xl">
              SkillBridge&apos;s employability score combines assessments,
              practical tasks, and interviews into one clear measure of job
              readiness. Employers can evaluate candidates based on verified
              ability instead of relying on self-reported CVs or assumptions.
            </h2>
          </motion.div>

          {/* SVG graphic */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:w-1/3"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            viewport={viewport}
          >
            <svg
              className="h-44 w-44 sm:h-52 sm:w-52 lg:h-65 lg:w-65"
              viewBox="0 0 260 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Spinning dashed outer ring */}
              <motion.rect
                x="1"
                y="1"
                width="258"
                height="258"
                rx="129"
                stroke="#151515"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeDasharray="5 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "130px 130px" }}
              />
              <path
                d="M129 42.5C176.773 42.5 215.5 81.2274 215.5 129C215.5 176.773 176.773 215.5 129 215.5C81.2274 215.5 42.5 176.773 42.5 129C42.5 81.2274 81.2274 42.5 129 42.5Z"
                stroke="#151515"
                strokeWidth="3"
              />
              <path
                d="M129 11C194.17 11 247 63.8304 247 129C247 194.17 194.17 247 129 247C63.8304 247 11 194.17 11 129C11 63.8304 63.8304 11 129 11Z"
                stroke="#151515"
                strokeWidth="4"
              />
              {/* Gear/star — slow counter-spin */}
              <motion.path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M127.295 63.6737C127.804 61.6609 130.664 61.6608 131.173 63.6737L135.654 81.4091C146.605 82.8129 156.446 87.7613 163.994 95.0644L180.662 87.5067C182.553 86.6492 184.337 88.8859 183.08 90.539L172.01 105.098C176.594 112.652 179.233 121.519 179.233 131.001C179.233 132.611 179.156 134.203 179.007 135.774L195.304 144.092C197.153 145.036 196.516 147.824 194.44 147.872L176.161 148.294C172.416 158.454 165.464 167.06 156.534 172.892L160.192 190.818C160.607 192.853 158.03 194.094 156.698 192.501L144.97 178.472C140.022 180.111 134.731 181.001 129.233 181.001C123.735 181.001 118.444 180.111 113.496 178.472L101.768 192.501C100.436 194.094 97.8594 192.853 98.2743 190.818L101.932 172.891C93.0026 167.059 86.0508 158.454 82.3055 148.294L64.0262 147.872C61.9504 147.824 61.3144 145.036 63.1639 144.092L79.4588 135.774C79.31 134.203 79.2333 132.611 79.2333 131.001C79.2333 121.519 81.8728 112.653 86.4569 105.099L75.3866 90.539C74.1299 88.886 75.9133 86.6494 77.8045 87.5067L94.4715 95.0644C102.02 87.761 111.861 82.813 122.812 81.4091L127.295 63.6737Z"
                fill="#010515"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "129px 129px" }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Logo marquee */}
        <motion.div
          className="mt-18 overflow-hidden opacity-40 grayscale sm:mt-24"
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
      </div>
    </section>
  );
}
