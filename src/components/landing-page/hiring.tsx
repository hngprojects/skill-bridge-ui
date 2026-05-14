"use client";

import { motion } from "motion/react";
import Image from "next/image";

const talentList = [
  { name: "Anita Mensah", role: "Virtual Assistant" },
  { name: "Joy Kins", role: "Digital Marketer" },
  { name: "Peace John", role: "Product Manager" },
  { name: "Jason Reed", role: "DevOps" },
  { name: "Ruth Chukwu", role: "Product Designer" },
  { name: "Teo Brown", role: "Frontend Dev" },
];

const avatarColors = [
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-teal-500",
];

function Initials({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[index % avatarColors.length]}`}
    >
      {initials}
    </div>
  );
}

const hiringFeatures = [
  {
    title: "Verified Talent Pool",
    description:
      "View candidates who have already been assessed, scored, and verified.",
    isSlider: true,
  },
  {
    title: "Standardized Scoring",
    description: "Compare candidates based on performance description text.",
    img: "/assets/scoring.svg",
  },
  {
    title: "Faster Screening",
    description:
      "Reduce screening time and focus only on qualified job-ready talent.",
    img: "/assets/screening.svg",
  },
  {
    title: "Direct Candidate Access",
    description:
      "Connect directly with job-ready candidates from a single, unified dashboard.",
    img: "/assets/access.svg",
  },
];

const ease = [0.4, 0, 0.2, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

const TalentPill = ({
  person,
  index,
}: {
  person: (typeof talentList)[0];
  index: number;
}) => (
  <div className="flex min-w-55 items-center gap-3 rounded-full border border-white/20 bg-white px-4 py-2 shadow-sm transition-transform hover:scale-105">
    <Initials name={person.name} index={index} />
    <div className="flex flex-col overflow-hidden">
      <p className="truncate text-xs font-bold text-slate-900">{person.name}</p>
      <p className="truncate text-[10px] text-slate-500">{person.role}</p>
    </div>
    <span className="ml-auto whitespace-nowrap rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
      Job Ready
    </span>
  </div>
);

export function HiringGrid() {
  return (
    <section className="bg-[#EFF7FF] py-12 px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-14 text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={viewport}
        >
          Built For Faster, Smarter Hiring
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {hiringFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] bg-[#DFEDFD] p-8 shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              viewport={viewport}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.2, ease },
              }}
            >
              <div className="relative mb-10 min-h-40">
                {feature.isSlider ? (
                  <div className="relative flex flex-col gap-4 py-4">
                    <motion.div
                      className="flex w-max gap-4"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {[...talentList, ...talentList].map((person, i) => (
                        <TalentPill
                          key={`row1-${i}`}
                          person={person}
                          index={i}
                        />
                      ))}
                    </motion.div>
                    <motion.div
                      className="flex w-max gap-4"
                      animate={{ x: ["-50%", "0%"] }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {[...talentList, ...talentList].map((person, i) => (
                        <TalentPill
                          key={`row2-${i}`}
                          person={person}
                          index={i}
                        />
                      ))}
                    </motion.div>
                    <motion.div
                      className="flex w-max gap-4"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {[...talentList, ...talentList].map((person, i) => (
                        <TalentPill
                          key={`row3-${i}`}
                          person={person}
                          index={i}
                        />
                      ))}
                    </motion.div>
                    <div className="pointer-events-none absolute inset-y-0 -left-8 w-20 bg-linear-to-r from-[#DFEDFD] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 -right-8 w-20 bg-linear-to-l from-[#DFEDFD] to-transparent z-10" />
                  </div>
                ) : (
                  <div className="relative h-full w-full aspect-video">
                    <Image
                      src={feature.img || ""}
                      alt={feature.title}
                      fill
                      className="object-contain drop-shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 max-w-[90%]">
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
