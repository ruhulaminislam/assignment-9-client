import Image from "next/image";
import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import { ArrowRight } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export function Banner() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="overflow-hidden bg-[#F7F3EE]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className={`${inter.className} max-w-xl`}>
          <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
            Beauty &amp; Wellness
          </p>

          <h1
            id="hero-heading"
            className={`${playfair.className} mt-5 text-4xl leading-[1.1] font-medium tracking-tight text-balance text-[#292824] sm:text-5xl lg:text-[3.5rem]`}
          >
            Where beauty feels effortless.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#625D56] sm:text-lg sm:leading-8">
            Discover handpicked salons, expert stylists, and thoughtful services
            — all in one calm, beautifully simple place.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#292824] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#292824]/90 focus-visible:ring-2 focus-visible:ring-[#292824]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EE] focus-visible:outline-none"
            >
              Explore Salon Services
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#EFE7DD] ring-1 ring-[#D8C5B2]/70 sm:aspect-[3/2] lg:aspect-auto lg:h-[34rem]">
          <Image
            src="/images/salon-banner.jpg"
            alt="Warm, elegant salon interior with a chandelier, styling chairs, and a large mirror"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[center_55%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#292824]/20 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
