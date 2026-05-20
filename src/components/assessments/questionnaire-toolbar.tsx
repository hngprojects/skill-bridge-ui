"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ASSESSMENT_DEFAULT_DURATION_SECONDS } from "@/constants/question-bank";

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

type QuestionnaireToolbarProps = {
  initialSeconds?: number;
};

export function QuestionnaireToolbar({
  initialSeconds = ASSESSMENT_DEFAULT_DURATION_SECONDS,
}: QuestionnaireToolbarProps) {
  const { name } = useParams<{ name: string }>();
  const showTimer = name !== "personal";
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (!showTimer) return;
    const id = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? 0 : current - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [showTimer]);

  return (
    <div className="flex items-center justify-between gap-4 py-6">
      {showTimer && (
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
              {formatCountdown(secondsLeft)}
            </span>
          </p>
        </div>
      )}

      <Button
        variant="ghost"
        asChild
        className="ml-auto h-auto gap-2 px-2 font-sans text-base font-medium text-foreground hover:bg-transparent hover:text-foreground/80"
      >
        <Link href={`/t/assessments/${name}`}>
          Save and Exit
          <LogOut className="size-5" aria-hidden />
        </Link>
      </Button>
    </div>
  );
}
