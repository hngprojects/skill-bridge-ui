import Image from "next/image";
import type { ResourceArticle } from "@/types/resources";

const ResourceArticleCard = ({
  title,
  description,
  readTime,
}: ResourceArticle) => {
  return (
    <div className="flex flex-col flex-1 bg-muted border border-border rounded-2xl p-4 gap-y-4 min-w-0">
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
        <p className="body-2 text-muted-foreground">{readTime}</p>
      </div>
    </div>
  );
};

export default ResourceArticleCard;
