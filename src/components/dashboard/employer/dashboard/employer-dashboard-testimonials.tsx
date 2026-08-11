import { EMPLOYER_TESTIMONIALS } from "@/constants/employer-dashboard";
import { StarRating } from "@/components/ui/star-rating";

export function EmployerDashboardTestimonials() {
  return (
    <section className="rounded-b-2xl border border-[#dbdbdb] bg-[#fafafa] px-6 py-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {EMPLOYER_TESTIMONIALS.map((testimonial, index) => (
          <article key={`${testimonial.name}-${index}`} className="space-y-2">
            <p className="text-base font-semibold leading-normal tracking-[0.017em] text-[#151515]">
              {testimonial.name}
            </p>
            <StarRating value={testimonial.rating} size={18} />
            <p className="text-base leading-normal text-[#151515]">
              {testimonial.quote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
