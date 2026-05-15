import CardImage from "./card-image";
import CardShell from "./card-shell";
import { CardCopy } from "./data";

const SkillsCard = ({
  title,
  body,
  className,
}: CardCopy & { className?: string }) => {
  return (
    <CardShell className={className} bg="bg-[#CBB0EB]">
      <h3 className="text-lg font-bold leading-5.75 tracking-[0.016em] text-[#171129]">
        {title}
      </h3>
      <p className="mt-2 text-sm font-normal leading-[160%] tracking-[0.016em] text-[#171129]">
        {body}
      </p>
      <CardImage
        src="/waitlist-hero/verified-talent.svg"
        alt="Verified talent illustration"
      />
    </CardShell>
  );
};

export default SkillsCard;
