type ResourceArticle = {
  id: number;
  title: string;
  description: string;
  readTime: string;
};

type ResourceVideo = {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
};

type ResourceArticleSection = {
  title: string;
  type: "article";
  items: ResourceArticle[];
};

type ResourceVideoSection = {
  title: string;
  type: "video";
  items: ResourceVideo[];
};

type ResourceSection = ResourceArticleSection | ResourceVideoSection;

export type { ResourceSection, ResourceArticle, ResourceVideo };
