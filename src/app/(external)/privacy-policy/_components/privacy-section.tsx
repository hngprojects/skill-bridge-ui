type PrivacySectionProps = {
  id: string;
  title: string;
  description?: string;
  items?: string[];
};

export function PrivacySection({
  id,
  title,
  description,
  items,
}: PrivacySectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-[#6B7280]/50 pb-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-[20px] font-bold leading-[25px] text-[#0F0F14] md:text-[28px] md:leading-[35px]">
          {title}
        </h2>

        <div className="flex flex-col gap-6">
          {description && (
            <p className="text-sm font-medium leading-[150%] text-[#334155] md:text-[18px]">
              {description}
            </p>
          )}

          {items && (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium leading-[150%] text-[#091417] md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#091417]" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
