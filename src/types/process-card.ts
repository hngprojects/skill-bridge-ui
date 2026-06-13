export type ProcessCardStep = {
  title: string;
  description: string;
  img: string;
  accent: string;
  featured?: boolean;
};

export type ProcessCardProps = {
  step: ProcessCardStep;
  index?: number;
  ctaHref?: string;
  ctaLabel?: string;
  bgColor?: string;
};
