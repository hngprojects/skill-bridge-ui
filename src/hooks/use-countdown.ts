"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight 1Hz countdown. State is captured at mount; pass a `key` on the
 * caller to remount if you need a fresh start when `initialSeconds` changes.
 */
export function useCountdown(initialSeconds: number, enabled: boolean): number {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? 0 : current - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [enabled]);

  return secondsLeft;
}
