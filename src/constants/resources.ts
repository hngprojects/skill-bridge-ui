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

const resourceSections: ResourceSection[] = [
  {
    title: "New to Skillbridge",
    type: "article",
    items: [
      {
        id: 1,
        title: "Frontend development Foundations",
        description:
          "Master the fundamentals of Frontend development to build a solid foundation in development principles.",
        readTime: "5 min read.",
      },
      {
        id: 2,
        title: "Frontend development Foundations",
        description:
          "Master the fundamentals of Frontend development to build a solid foundation in development principles.",
        readTime: "5 min read.",
      },
      {
        id: 3,
        title: "Frontend development Foundations",
        description:
          "Master the fundamentals of Frontend development to build a solid foundation in development principles.",
        readTime: "5 min read.",
      },
    ],
  },
  {
    title: "Recommended videos",
    type: "video",
    items: [
      {
        id: 1,
        title: "Frontend development Foundations",
        duration: "30 mins",
        thumbnail: "/assets/resources/resources-video-1.png",
      },
      {
        id: 2,
        title: "Frontend development Foundations",
        duration: "30 mins",
        thumbnail: "/assets/resources/resources-video-2.png",
      },
      {
        id: 3,
        title: "Frontend development Foundations",
        duration: "30 mins",
        thumbnail: "/assets/resources/resources-video-3.png",
      },
    ],
  },
  {
    title: "Top 10 resources for you",
    type: "article",
    items: [
      {
        id: 1,
        title: "Frontend development Foundations",
        description:
          "Master the fundamentals of Frontend development to build a solid foundation in development principles.",
        readTime: "5 min read.",
      },
      {
        id: 2,
        title: "Frontend development Foundations",
        description:
          "Master the fundamentals of Frontend development to build a solid foundation in development principles.",
        readTime: "5 min read.",
      },
      {
        id: 3,
        title: "Frontend development Foundations",
        description:
          "Master the fundamentals of Frontend development to build a solid foundation in development principles.",
        readTime: "5 min read.",
      },
    ],
  },
];

export type { ResourceSection, ResourceArticle, ResourceVideo };
export { resourceSections };
