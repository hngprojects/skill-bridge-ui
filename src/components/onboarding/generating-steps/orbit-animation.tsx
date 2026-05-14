import * as React from "react";
import Image from "next/image";

const CENTER_ICON_SIZE = 69;
const ORBIT_RADIUS = 130;
const ORBIT_SPEED = 8;
const DEFAULT_ICON_SIZE = 46;

const ORBIT_ICONS: { src: string; startAngle: number; size?: number }[] = [
  { src: "/assets/images/yellow-asset.svg", startAngle: 0 },
  { src: "/assets/images/purple-asset.svg", startAngle: 60 },
  { src: "/assets/images/blue-asset.svg", startAngle: 120 },
  { src: "/assets/images/navy-blue-asset.svg", startAngle: 180, size: 56 },
  { src: "/assets/images/green-asset.svg", startAngle: 240 },
  { src: "/assets/images/light-yellow-asset.svg", startAngle: 300 },
];

const ORBIT_STYLES = `
  @keyframes orbit {
    from { transform: rotate(var(--start-angle)) translateX(var(--radius)) rotate(calc(-1 * var(--start-angle))); }
    to   { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--start-angle) + 360deg))); }
  }
  .orbit-icon {
    position: absolute; top: 50%; left: 50%;
    margin-top: calc(var(--size) / -2);
    margin-left: calc(var(--size) / -2);
    animation: orbit var(--speed) linear infinite;
  }
`;

export const OrbitAnimation = () => (
  <div className="relative flex h-72 w-72 items-center justify-center">
    <style>{ORBIT_STYLES}</style>

    <div className="z-10 drop-shadow-lg">
      <Image
        src="/assets/images/light-blue-asset.svg"
        alt=""
        width={CENTER_ICON_SIZE}
        height={CENTER_ICON_SIZE}
      />
    </div>

    {ORBIT_ICONS.map(({ src, startAngle, size = DEFAULT_ICON_SIZE }) => (
      <div
        key={src}
        className="orbit-icon"
        style={
          {
            "--start-angle": `${startAngle}deg`,
            "--radius": `${ORBIT_RADIUS}px`,
            "--speed": `${ORBIT_SPEED}s`,
            "--size": `${size}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          className="drop-shadow-sm"
        />
      </div>
    ))}
  </div>
);
