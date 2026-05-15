import { cn } from "@/lib/utils";

const CardShell = ({
  className,
  bg,
  children,
}: {
  className?: string;
  bg: string;
  children: React.ReactNode;
}) => {
  return (
    <article
      className={cn(
        "rounded-2xl p-5 shadow-[0_20px_40px_-20px_rgba(13,32,37,0.25)]",
        bg,
        className,
      )}
    >
      {children}
    </article>
  );
};

export default CardShell;
