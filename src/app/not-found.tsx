import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import { ArrowRight, Compass } from "lucide-react";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  return (
    <div className={`${inter.className} flex min-h-svh flex-col bg-[#F7F3EE]`}>
      <Navbar />

      <section
        aria-labelledby="not-found-heading"
        className="relative flex flex-1 items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-24 size-80 rounded-full bg-[#D8C5B2]/30 blur-3xl"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-28 size-80 rounded-full bg-[#A58B73]/15 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="overflow-hidden rounded-3xl bg-white px-6 py-12 text-center shadow-[0_32px_80px_-48px_rgba(41,40,36,0.35)] ring-1 ring-[#D8C5B2]/70 sm:px-10 sm:py-14">
            <span
              aria-hidden="true"
              className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-[#F7F3EE] text-[#A58B73] ring-1 ring-[#D8C5B2]/70"
            >
              <Compass className="size-6" strokeWidth={1.5} />
            </span>

            <p
              aria-hidden="true"
              className={`${playfair.className} mt-6 text-6xl leading-none font-medium tracking-tight text-[#A58B73] sm:text-7xl`}
            >
              404
            </p>

            <h1
              id="not-found-heading"
              className={`${playfair.className} mt-4 text-3xl leading-tight font-medium tracking-tight text-balance text-[#292824] sm:text-4xl`}
            >
              This page has stepped out.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
              The page you are looking for may have been moved, renamed, or is
              no longer available. Let us guide you back to something beautiful.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                render={<Link href="/" />}
                className="h-11 rounded-lg bg-[#292824] px-5 text-sm font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40"
              >
                Back to Home
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/button:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none"
                />
              </Button>

              <Button
                render={<Link href="/services" />}
                variant="outline"
                className="h-11 rounded-lg border-[#D8C5B2] bg-white px-5 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE] hover:text-[#292824] focus-visible:border-[#A58B73] focus-visible:ring-[#292824]/30"
              >
                Browse Services
              </Button>
            </div>

            <p className="mt-8 text-xs leading-5 text-[#625D56]">
              Already signed in?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-[#292824] underline decoration-[#A58B73] underline-offset-4 transition-colors duration-200 hover:text-[#A58B73] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292824]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              >
                Sign in to your dashboard
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
