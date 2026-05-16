"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type TocItem = {
  id: string;
  label: string;
};

type PrivacyTocProps = {
  items: TocItem[];
};

const tocLinkClass = (isFirst: boolean) =>
  isFirst
    ? "bg-[#F2F8FB] font-semibold text-[#1A3F4A]"
    : "bg-[#F5F5F5] font-normal text-[#1A3F4A]";

export function PrivacyToc({ items }: PrivacyTocProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Desktop */}
      <aside className="sticky top-24 hidden h-fit w-[299px] flex-col gap-4 lg:flex">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`
              rounded-2xl px-3 py-4 text-[18px] transition-all
              hover:scale-[1.01]
              ${tocLinkClass(index === 0)}
            `}
          >
            {index + 1}. {item.label}
          </a>
        ))}
      </aside>

      {/* Mobile */}
      <div className="relative z-20 flex flex-col gap-2 lg:hidden">
        <span className="text-xs font-semibold text-[#091417]">Jump to:</span>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between rounded-2xl bg-[#F5F5F5] px-3 py-4"
        >
          <span className="text-[18px] text-[#1A3F4A]">Table of Contents</span>

          <ChevronDown
            className={`h-5 w-5 text-[#757575] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen ? (
          <div
            ref={dropdownRef}
            className="relative z-50 flex flex-col gap-2 rounded-2xl bg-[#F5F5F5] p-2 shadow-md"
          >
            {items.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-[#1A3F4A] transition-colors hover:bg-white"
              >
                {index + 1}. {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
