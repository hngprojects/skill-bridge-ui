import { useEffect, useRef, useState } from "react";

type UseAntiCheatOptions = {
  enabled?: boolean;
  limit?: number;
  onLimitReached?: () => void;
  onViolation?: (count: number) => void;
};

const COALESCE_MS = 100;

function isScreenshotShortcut(e: KeyboardEvent): boolean {
  if (e.key === "PrintScreen") return true;

  const key = e.key.toLowerCase();
  if (e.metaKey && e.shiftKey && ["3", "4", "5", "6"].includes(e.key)) {
    return true;
  }
  if (e.metaKey && e.shiftKey && key === "s") return true;
  if (e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey && key === "g") {
    return true;
  }
  return false;
}

const useAntiCheat = ({
  enabled = true,
  limit = 3,
  onLimitReached,
  onViolation,
}: UseAntiCheatOptions = {}) => {
  const [count, setCount] = useState(0);
  const limitFiredRef = useRef(false);
  const onLimitReachedRef = useRef(onLimitReached);
  const onViolationRef = useRef(onViolation);

  useEffect(() => {
    onLimitReachedRef.current = onLimitReached;
  }, [onLimitReached]);

  useEffect(() => {
    onViolationRef.current = onViolation;
  }, [onViolation]);

  useEffect(() => {
    if (count === 0) return;
    onViolationRef.current?.(count);
  }, [count]);

  useEffect(() => {
    if (count >= limit && !limitFiredRef.current) {
      limitFiredRef.current = true;
      onLimitReachedRef.current?.();
    }
  }, [count, limit]);

  useEffect(() => {
    if (!enabled) return;

    let timer: number | null = null;
    const propose = () => {
      if (timer != null) return;
      timer = window.setTimeout(() => {
        timer = null;
        setCount((c) => c + 1);
      }, COALESCE_MS);
    };

    const onVisibilityChange = () => {
      if (document.hidden) propose();
    };
    const onWindowBlur = () => propose();
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isScreenshotShortcut(e)) return;
      e.preventDefault();
      propose();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("keydown", onKeyDown, true);
      if (timer != null) window.clearTimeout(timer);
    };
  }, [enabled]);

  const reset = () => {
    limitFiredRef.current = false;
    setCount(0);
  };

  return { count, reset };
};

export default useAntiCheat;
