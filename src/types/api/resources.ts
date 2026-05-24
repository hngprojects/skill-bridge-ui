export type ResourceApiItem = {
  url: string;
  type: "course" | "video";
  title: string;
  duration: string;
  description: string;
};

export type ResourcesResponseData = {
  id: string;
  track: string;
  threshold_group: string;
  banner_title: string;
  banner_description: string;
  resources: ResourceApiItem[];
  videos: ResourceApiItem[];
  created_at: string;
  updated_at: string;
};
