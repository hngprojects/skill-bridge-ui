import Image from "next/image";
import type { ResourceArticle } from "@/types/resources";

const ResourceArticleCard = ({
  url,
  title,
  description,
  duration,
}: ResourceArticle) => {
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      className="flex flex-col flex-1 bg-muted border border-border rounded-2xl p-4 gap-y-4 min-w-0 hover:border-primary/50 transition-colors"
    >
      <Image
        src="/assets/resources/resources-article-icon.svg"
        alt="article icon"
        width={64}
        height={64}
      />
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <p className="label text-foreground">{title}</p>
          <p className="body font-light text-foreground">{description}</p>
        </div>
        <p className="body-2 text-muted-foreground">{duration}</p>
      </div>
    </a>
  );
};

export default ResourceArticleCard;
