type ResourceArticle = {
  url: string;
  title: string;
  description: string;
  duration: string;
};

type ResourceVideo = {
  url: string;
  title: string;
  duration: string;
};

type ResourceArticleSection = {
  id: string;
  title: string;
  type: "article";
  items: ResourceArticle[];
};

type ResourceVideoSection = {
  id: string;
  title: string;
  type: "video";
  items: ResourceVideo[];
};

type ResourceSection = ResourceArticleSection | ResourceVideoSection;

export type { ResourceSection, ResourceArticle, ResourceVideo };
