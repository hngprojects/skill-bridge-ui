"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GoogleButtonProps = {
  className?: string;
  onClick?: () => void;
};

function GoogleButton({ className, onClick }: GoogleButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        type="button"
        onClick={onClick}
        className={cn(
          "group flex h-11 w-[240px] items-center justify-between rounded-md bg-google p-1 pr-1 pl-4 text-sm font-semibold text-white transition-colors hover:bg-google-hover",
          className,
        )}
      >
        <span className="flex-1 text-center">Continue with Google</span>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background">
          <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden>
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              fill="var(--color-google)"
            />
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              fill="var(--color-google-green)"
            />
            <path
              d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              fill="var(--color-google-yellow)"
            />
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
              fill="var(--color-google-red)"
            />
          </svg>
        </div>
      </Button>
    </div>
  );
}

export { GoogleButton };
export type { GoogleButtonProps };
