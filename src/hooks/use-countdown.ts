"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight 1Hz countdown. State re-syncs whenever `initialSeconds` changes,
 * so callers can pass `undefined → number` once data lands without remounting.
 * Ticking is gated by `enabled`.
 */
export function useCountdown(initialSeconds: number, enabled: boolean): number {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [prevInitial, setPrevInitial] = useState(initialSeconds);

  // React "store info from previous renders" pattern — setState during render
  // (not inside an effect) is the recommended way to reset on prop change.
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders
  if (prevInitial !== initialSeconds) {
    setPrevInitial(initialSeconds);
    setSecondsLeft(initialSeconds);
  }

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? 0 : current - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [enabled]);

  return secondsLeft;
}
