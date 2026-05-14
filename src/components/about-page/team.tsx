"use client";

import { motion } from "motion/react";
import Image from "next/image";

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-60px" } as const;

const team = [
  {
    name: "Spencer Fry",
    role: "PO",
    img: "/assets/teams/spencer-fry.png",
  },
  {
    name: "Len Markidan",
    role: "APO",
    img: "/assets/teams/len-markidan.png",
  },
  {
    name: "Jamie Lawrence",
    role: "CTO",
    img: "/assets/teams/jamie-lawrence.png",
  },
  {
    name: "Katherine Pan",
    role: "VP Creator Support",
    img: "/assets/teams/katherine-pan.png",
  },
];

export function AboutTeamSection() {
  return (
    <section className="bg-white py-20 md:pt-20 md:pb-40 relative">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={viewport}
          >
            Powered by People Who Care About Talent Growth
          </motion.h2>
          <motion.p
            className="mt-4 text-[15px] leading-relaxed text-gray-600 md:text-base"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            viewport={viewport}
          >
            We&apos;re a passionate team focused on helping early-career
            professionals grow with clarity, prove their capabilities, and
            access opportunities.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="flex flex-col overflow-hidden rounded-3xl bg-[#f8f9fa]"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease }}
              viewport={viewport}
              whileHover={{ y: -4, transition: { duration: 0.2, ease } }}
            >
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                />
              </div>

              <div className="px-5 py-5">
                <p className="text-[15px] font-bold text-gray-900 md:text-base">
                  {member.name}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full pointer-events-none">
        <svg
          className="w-full h-12 md:h-20"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="720" cy="720" rx="1275" ry="720" fill="#05060F" />
        </svg>
      </div>
    </section>
  );
}
