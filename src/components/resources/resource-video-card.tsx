import Image from "next/image";
import type { ResourceVideo } from "@/types/resources";

const ResourceVideoCard = ({ title, duration, thumbnail }: ResourceVideo) => {
  return (
    <div className="relative flex flex-1 rounded-2xl border border-border overflow-hidden min-h-57.75 min-w-0">
      <Image
        src={thumbnail}
        fill
        alt={title}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-foreground/50 rounded-2xl" />
      <div className="absolute bottom-4 left-4 flex flex-col gap-y-2">
        <Image
          src="/assets/resources/play-video-icon.svg"
          alt="play icon"
          width={56}
          height={56}
        />
        <div className="flex flex-col gap-y-1">
          <p className="label text-background">{title}</p>
          <p className="body-2 text-background">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceVideoCard;
