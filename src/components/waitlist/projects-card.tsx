import CardImage from "./card-image";
import CardShell from "./card-shell";
import type { CardCopy } from "./data";

const ProjectsCard = ({
  title,
  body,
  className,
}: CardCopy & { className?: string }) => {
  return (
    <CardShell className={className} bg="bg-[#C9D2FB]">
      <h3 className="text-lg font-bold leading-[23px] tracking-[0.016em] text-[#242425]">
        {title}
      </h3>
      <p className="mt-2 text-sm font-normal leading-[18px] tracking-[0.016em] text-[#242425]">
        {body}
      </p>
      <CardImage
        src="/waitlist-hero/better-oppurtunity.svg"
        alt="Better opportunity illustration"
      />
    </CardShell>
  );
};

export default ProjectsCard;
