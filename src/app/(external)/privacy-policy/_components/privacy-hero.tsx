"use client";

export function PrivacyHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA]">
      {/* Desktop curve */}
      <div
        className="absolute left-1/2 hidden -translate-x-1/2 bg-white md:block"
        style={{
          width: "2550px",
          height: "1440px",
          top: "-1000px",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* Mobile curve */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-white md:hidden"
        style={{
          width: "1196px",
          height: "675px",
          top: "-420px",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-[320px] max-w-[1440px] items-center justify-center px-4 md:h-[530px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-[32px] font-bold leading-[150%] text-[#091417] md:text-[48px]">
            Privacy Policy
          </h1>

          <p className="text-sm text-[#64748B] md:text-base">
            Last updated: May 12, 2026
          </p>
        </div>
      </div>
    </section>
  );
}