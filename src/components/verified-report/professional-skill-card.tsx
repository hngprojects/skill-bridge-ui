import Image from "next/image";

import { getQualitativeLevel } from "./verified-report-utils";

type Props = {
  title: string;
  value: number;
  insight?: string;
  levelLabel?: string;
};

const ProfessionalSkillCard = ({
  title,
  value,
  insight,
  levelLabel,
}: Props) => {
  const clamped = Math.max(0, Math.min(100, value));
  const label = levelLabel ?? getQualitativeLevel(clamped);

  return (
    <div className="border border-[#DBDBDB] rounded-lg bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-lg">{title}</p>
        <span className="bg-verified/10 text-verified-strong rounded-full px-2.5 py-0.5 text-sm font-bold">
          {label}
        </span>
      </div>

      {/* Thin, unlabeled bar — a supporting visual, not the headline. The
          qualitative label above and the insight below carry the meaning;
          a bare percentage slider on its own doesn't tell anyone anything. */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-[#E5E7EB]">
          <div
            className="bg-verified h-full rounded-full"
            style={{ width: `${clamped}%` }}
          />
        </div>
        <span className="text-xs text-[#A1A1AA]">{clamped}%</span>
      </div>

      <div className="mt-3 gap-x-4 flex flex-row py-2 px-4 rounded-lg bg-[#ECFDF5]">
        <Image
          src={"/assets/icons/stars-sparkle.svg"}
          height={24}
          width={24}
          alt="Sparkle icon"
        />
        <p className="text-[#535862] text-sm">
          {insight ?? "No insight available for this area yet."}
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSkillCard;
