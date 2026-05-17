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

export function EmployerLogoMarquee() {
  return (
    <motion.div
      className="w-full overflow-hidden opacity-40 grayscale"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.4 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div
        className="flex min-w-max items-center gap-x-5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <Image
            key={`${logo}-${index}`}
            src={logo}
            alt=""
            width={72}
            height={28}
            className="h-auto w-14"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
