"use client";

import { Timer } from "lucide-react";

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

type QuestionnaireToolbarProps = {
  /** Owned by the parent. Undefined hides the timer (e.g. personal assessment). */
  secondsLeft?: number;
};

export function QuestionnaireToolbar({
  secondsLeft,
}: QuestionnaireToolbarProps) {
  const showTimer = secondsLeft != null;

  return (
    <div className="flex items-center gap-4 py-6">
      {showTimer ? (
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-success"
            aria-hidden
          >
            <Timer className="size-5 text-foreground" strokeWidth={2} />
          </div>
          <p className="font-sans text-base text-foreground">
            Time left:{" "}
            <span className="font-semibold text-success tabular-nums">
              {formatCountdown(secondsLeft ?? 0)}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
