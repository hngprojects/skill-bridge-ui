"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type StatCard = {
  label: string;
  value: string | number;
  description: string;
  linkLabel: string;
  linkHref: string;
  iconBg: string;
  icon: string;
};

const STAT_CARDS: StatCard[] = [
  {
    label: "Verified Talent",
    value: "2,184",
    description:
      "Candidates across engineering, design, product, and cloud roles.",
    linkLabel: "Browse talents",
    linkHref: "/e/talents",
    iconBg: "#D3E6DF",
    icon: "/assets/icons/icon-verified-talent.svg",
  },
  {
    label: "Assessments Shared",
    value: "24",
    description:
      "Track candidate submissions and review performance in one place.",
    linkLabel: "View assessment",
    linkHref: "/e/assessments",
    iconBg: "#F9E796",
    icon: "/assets/icons/icon-assessments-shared.svg",
  },
  {
    label: "Shortlisted Candidates",
    value: "12",
    description: "Candidates saved for interviews or next review.",
    linkLabel: "View shortlist",
    linkHref: "/e/shortlist",
    iconBg: "#CBB0EB",
    icon: "/assets/icons/icon-shortlisted-candidates.svg",
  },
  {
    label: "My Roles",
    value: "3",
    description: "Top candidates aligned with your hiring requirements.",
    linkLabel: "View roles",
    linkHref: "/e/roles",
    iconBg: "#EDEEF2",
    icon: "/assets/icons/icon-my-roles.svg",
  },
];

export function EmployerStatCards() {
  return (
    <div className="rounded-2xl bg-[#F2F2F2] p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="flex flex-col gap-6 rounded-[10px] border border-[#D9D9D9] bg-white p-4"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: card.iconBg }}
              >
                <Image
                  src={card.icon}
                  alt={card.label}
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-sans text-base font-semibold leading-[150%] tracking-[0.017em] text-[#151515]">
                  {card.label}
                </p>
                <p className="font-sans text-[32px] font-semibold leading-[150%] text-[#151515]">
                  {card.value}
                </p>
                <p className="font-sans text-base font-normal leading-[150%] text-[#151515]">
                  {card.description}
                </p>
              </div>
            </div>
            <Link
              href={card.linkHref}
              className="flex items-center gap-0.5 font-sans text-base font-semibold leading-[150%] tracking-[0.016em] text-[#05060F] underline"
            >
              {card.linkLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
