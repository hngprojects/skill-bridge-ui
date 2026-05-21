import type { ResourceSection } from "@/types/resources";

const resourceSections: ResourceSection[] = [
  {
    id: "new-to-skillbridge",
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
    id: "recommended-videos",
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
    id: "top-10-resources",
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

export { resourceSections };
