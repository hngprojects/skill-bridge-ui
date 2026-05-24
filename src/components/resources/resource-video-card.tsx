import Image from "next/image";
import type { ResourceVideo } from "@/types/resources";

function getYoutubeThumbnail(url: string): string | null {
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    // not a valid URL
  }
  return null;
}

const ResourceVideoCard = ({ url, title, duration }: ResourceVideo) => {
  const thumbnail = getYoutubeThumbnail(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-1 rounded-2xl border border-border overflow-hidden min-h-57.75 min-w-0"
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          fill
          alt={title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-foreground/10" />
      )}
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
    </a>
  );
};

export default ResourceVideoCard;
