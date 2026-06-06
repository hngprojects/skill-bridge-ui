import Image from "next/image";

type DataEmptyStateProps = {
  icon: string;
  title: string;
  description: string;
};

export function DataEmptyState({
  icon,
  title,
  description,
}: DataEmptyStateProps) {
  return (
    <div className="flex min-h-70 flex-col items-center justify-center gap-3 px-4 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#F2F2F2]">
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          className="opacity-60"
        />
      </div>
      <p className="font-sans text-base font-semibold text-[#151515]">
        {title}
      </p>
      <p className="font-sans text-sm text-[#757575]">{description}</p>
    </div>
  );
}
