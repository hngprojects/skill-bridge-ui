"use client";

import { cn } from "@/lib/utils";

export interface ChartBar {
  value: number; // 0–100, controls bar height
  active?: boolean; // amber highlight
  activeLabel?: string; // hexagon badge shown above active bar
}

interface HexBadgeProps {
  label: string;
}

function HexBadge({ label }: HexBadgeProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 36, height: 40 }}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="hexRounded" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0.456,0.015
              C 0.484,0.0   0.516,0.0   0.544,0.015
              L 0.956,0.224
              C 0.984,0.239  1.0,0.268   1.0,0.299
              V 0.701
              C 1.0,0.732   0.984,0.761  0.956,0.776
              L 0.544,0.985
              C 0.516,1.0   0.484,1.0   0.456,0.985
              L 0.044,0.776
              C 0.016,0.761  0.0,0.732   0.0,0.701
              V 0.299
              C 0.0,0.268   0.016,0.239  0.044,0.224
              L 0.456,0.015 Z
            "
            />
          </clipPath>
        </defs>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#ffffffff",
          WebkitClipPath: "url(#hexRounded)",
          clipPath: "url(#hexRounded)",
          transform: "scale(1.08)",
        }}
      />
      {/* Fill layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#009F6A",
          WebkitClipPath: "url(#hexRounded)",
          clipPath: "url(#hexRounded)",
        }}
      />
      <span className="relative text-[11px] font-bold text-white leading-none tracking-tight">
        {label}
      </span>
    </div>
  );
}

interface BarColumnProps {
  bar: ChartBar;
  chartHeight: number;
}

export function BarColumn({ bar, chartHeight }: BarColumnProps) {
  const pct = Math.max(2, Math.min(100, bar.value));
  const barPx = Math.round((pct / 100) * chartHeight);

  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-end"
      style={{ height: chartHeight }}
    >
      {/* Hexagon badge above active bar */}
      {bar.active && bar.activeLabel && (
        <div
          className="absolute"
          style={{
            bottom: barPx - 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <HexBadge label={bar.activeLabel} />
        </div>
      )}

      {/* Bar */}
      <div
        className={cn(
          "w-full rounded-t-sm transition-all duration-700",
          bar.active ? "bg-[#009F6A]" : "bg-gray-200",
        )}
        style={{ height: barPx }}
      />
    </div>
  );
}
