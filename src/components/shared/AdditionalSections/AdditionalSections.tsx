import { Inter, Playfair_Display } from "next/font/google";
import {
  BadgeCheck,
  CalendarPlus,
  Compass,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Explore Services",
    description:
      "Browse different salon services and categories to discover what you need.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Choose Your Service",
    description:
      "Explore service details, pricing, and duration before making your choice.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Request Appointment",
    description:
      "Select your preferred service and submit an appointment request.",
    icon: CalendarPlus,
  },
  {
    number: "04",
    title: "Get Confirmation",
    description:
      "Receive confirmation once the salon reviews and accepts your appointment request.",
    icon: BadgeCheck,
  },
];

export const AdditionalSections = () => {
  return (
    <section
      aria-labelledby="how-salonbook-works-heading"
      className={`${inter.className} border-t border-[#D8C5B2]/60 bg-[#F7F3EE]`}
    >
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
            Simple Booking Process
          </p>

          <h2
            id="how-salonbook-works-heading"
            className={`${playfair.className} mt-4 text-3xl leading-[1.15] font-medium tracking-tight text-balance text-[#292824] sm:text-4xl lg:text-[2.75rem]`}
          >
            How SalonBook Works
          </h2>

          <p className="mt-4 text-base leading-7 text-[#625D56] sm:text-lg sm:leading-8">
            Discover your favorite salon services and request your appointment
            in just a few simple steps.
          </p>
        </div>

        <ol className="mt-12 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <li key={step.number} className="flex">
                <article className="flex h-full w-full flex-col rounded-2xl bg-white p-6 shadow-[0_18px_40px_-32px_rgba(41,40,36,0.38)] ring-1 ring-[#D8C5B2]/70">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`${playfair.className} text-[2rem] leading-none font-medium text-[#A58B73]`}
                    >
                      {step.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-[#D8C5B2]/70"
                    />

                    <span
                      aria-hidden="true"
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#F7F3EE] text-[#292824] ring-1 ring-[#D8C5B2]/60"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                  </div>

                  <h3
                    className={`${playfair.className} mt-6 text-xl leading-snug font-medium text-balance text-[#292824] sm:text-[1.375rem] lg:text-2xl`}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
                    {step.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
