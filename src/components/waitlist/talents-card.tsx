import CardImage from "./card-image";
import CardShell from "./card-shell";
import type { CardCopy } from "./data";

const TalentsCard = ({
  title,
  body,
  className,
}: CardCopy & { className?: string }) => {
  return (
    <CardShell className={className} bg="bg-[#E6E7A1]">
      <h3 className="text-lg font-bold leading-5.75 tracking-[0.016em] text-[#242425]">
        {title}
      </h3>
      <p className="mt-2 text-sm font-normal leading-[160%] tracking-[0.016em] text-[#242425]">
        {body}
      </p>
      <CardImage
        src="/waitlist-hero/smarter-hiring.svg"
        alt="Smarter hiring illustration"
      />
    </CardShell>
  );
};

export default TalentsCard;
