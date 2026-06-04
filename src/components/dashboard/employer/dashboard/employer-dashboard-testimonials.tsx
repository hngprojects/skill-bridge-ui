import Image from "next/image";

import { EMPLOYER_TESTIMONIALS } from "@/constants/employer-dashboard";

const STAR = "/assets/employer-dashboard/star.svg";

function StarRating() {
  return (
    <div
      className="flex items-center gap-2"
      aria-label="5 out of 5 stars"
      role="img"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Image
          key={index}
          src={STAR}
          alt=""
          width={18}
          height={18}
          className="size-[18px]"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function EmployerDashboardTestimonials() {
  return (
    <section className="rounded-b-2xl border border-[#dbdbdb] bg-[#fafafa] px-6 py-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {EMPLOYER_TESTIMONIALS.map((testimonial, index) => (
          <article key={`${testimonial.name}-${index}`} className="space-y-2">
            <p className="text-base font-semibold leading-normal tracking-[0.017em] text-[#151515]">
              {testimonial.name}
            </p>
            <StarRating />
            <p className="text-base leading-normal text-[#151515]">
              {testimonial.quote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
