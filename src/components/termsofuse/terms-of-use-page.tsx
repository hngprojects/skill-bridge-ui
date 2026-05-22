"use client";

import { motion } from "motion/react";
import { termsOfUseData, termsOfUseNav } from "@/constants/terms-of-use";
import JumpToSelect from "@/components/termsofuse/jump-to-select";

const jumpToItems = termsOfUseData.map((section, index) => ({
  id: `term-${index + 1}`,
  label: section.title,
}));

const TermsOfUsePage = () => {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <div className="bg-[#FAFAFA]">
        <motion.div
          className="w-full relative"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <svg
            className="w-full h-61 md:min-h-100 md:h-auto block pointer-events-none"
            viewBox="0 0 1440 137"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <ellipse cx="720" cy="-583" rx="1275" ry="720" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center px-4 md:px-0">
            <div className="text-left md:text-center">
              <h1 className="text-[#0F0F14] font-extrabold text-3xl md:text-5xl">
                Terms of Use
              </h1>
              <p className="text-[#334155] mt-2 md:mt-4 text-sm md:text-base font-medium">
                Last updated: May 12, 2026
              </p>
            </div>
          </div>
        </motion.div>

        <main className="flex flex-row gap-x-10 md:p-11 mt-16 md:mt-31.75 mb-84 md:mb-50 max-w-7xl mx-auto w-full px-4">
          <aside className="hidden lg:block">
            <ol className="flex list-none flex-col gap-y-4">
              {termsOfUseNav.map((navitem, index) => (
                <li key={index}>
                  <a
                    href={`#term-${index + 1}`}
                    className="bg-[#F5F5F5] w-75 px-3 text-[#2C5F70] h-13.75 flex flex-row items-center rounded-2xl transition-colors hover:bg-[#EBEBEB]"
                  >
                    <span className="rounded-full size-1 mr-2 bg-black"></span>
                    {"   "}
                    {index + 1}. {navitem}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <section className="flex flex-col gap-y-10 md:gap-y-16">
            <JumpToSelect items={jumpToItems} className="lg:hidden" />
            <ul className="flex flex-col gap-y-16">
              {termsOfUseData.map((d, i) => (
                <li
                  key={i}
                  id={`term-${i + 1}`}
                  className="scroll-mt-24 border-b border-b-[#6B7280] pb-6"
                >
                  <h1 className="text-[#0F0F14] font-bold text-lg md:text-3xl">
                    {" "}
                    {i + 1}. {d.title}
                  </h1>
                  <p className="text-[#334155] mt-2 md:mt-4 mb-6 text-[14px] md:text-base font-medium">
                    {d.paragraph}
                  </p>
                  <ul className="flex flex-col gap-y-4 list-disc font-light text-black leading-[160%]">
                    {d.list?.map((item, index) => (
                      <li key={index} className="ml-6">
                        <p className="text-[#334155] font-light text-[14px] md:text-base">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="font-normal text-base text-[#64748B]">
              If you have any questions about these Terms of Use, contact us at{" "}
              <a
                href="mailto:legal@credlane.com"
                className="font-bold text-[#2C5F70]"
              >
                legal@credlane.com
              </a>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
