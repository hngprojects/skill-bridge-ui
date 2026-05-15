import { Home, Phone, Mail } from "lucide-react";

const contactMethods = [
  {
    id: "visit",
    icon: Home,
    title: "Visit Us",
    lines: ["No. 02 Ikeja road, Lagos State, Nigeria"],
  },
  {
    id: "call",
    icon: Phone,
    title: "Call or Chat Us",
    lines: ["Call: +234 - 9000000100", "WhatsApp: +234 - 8000000100"],
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Us",
    lines: ["support@skillbridge.com"],
  },
];

export function ReachOut() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-4 pb-20 sm:pb-24 lg:pb-56">
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="text-center text-sm font-medium text-gray-700 sm:text-base">
          Reach out to us through the following means;
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map(({ id, icon: Icon, title, lines }) => (
            <article
              key={id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <Icon className="size-5" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <div className="mt-2 text-sm leading-6 text-[#334155]">
                  {lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute z-0 bottom-0 w-full pointer-events-none">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="720" cy="720" rx="1275" ry="720" fill="#05060F" />
        </svg>
      </div>
    </section>
  );
}
