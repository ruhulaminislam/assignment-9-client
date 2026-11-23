import { AlertCircle, ShieldCheck } from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { getAdminOverviewStats, type AdminOverviewStats } from "./overview-data";
import { OverviewStats } from "./overview-stats";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default async function AdminOverviewPage() {
  let stats: AdminOverviewStats | null = null;

  try {
    stats = await getAdminOverviewStats();
  } catch (error) {
    console.error('Failed to load admin overview stats:', error);
    stats = null;
  }

  return (
    <div
      className={`${inter.className} min-h-svh bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="relative overflow-hidden rounded-2xl border border-[#D8C5B2]/70 bg-white p-6 shadow-[0_28px_70px_-55px_rgba(41,40,36,0.55)] sm:p-8 lg:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-[#D8C5B2]/25 blur-3xl"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-10 hidden size-14 items-center justify-center rounded-2xl bg-[#F7F3EE] text-[#A58B73] ring-1 ring-[#D8C5B2]/70 xl:inline-flex"
          >
            <ShieldCheck className="size-6" strokeWidth={1.5} />
          </span>

          <div className="relative max-w-2xl">
            <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
              Admin Dashboard
            </p>

            <h1
              className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
            >
              Admin Overview
            </h1>

            <p
              className={`${playfair.className} mt-2 text-lg leading-snug font-medium text-[#7A634D] sm:text-xl`}
            >
              Your salon, at a glance.
            </p>

            <p className="mt-3 text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
              Monitor customers, services, appointments and verified payments
              across the SalonBook platform.
            </p>
          </div>
        </header>

        <section
          aria-labelledby="platform-overview-heading"
          className="mt-8 sm:mt-10"
        >
          <div>
            <h2
              id="platform-overview-heading"
              className={`${playfair.className} text-2xl font-medium text-[#292824]`}
            >
              Platform Overview
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#625D56]">
              A snapshot of activity across the platform right now.
            </p>
          </div>

          {stats === null ? (
            <Alert className="mt-5 border-[#B94343]/30 bg-[#FBE9E7] px-4 py-3 text-[#B94343]">
              <AlertCircle aria-hidden="true" />
              <AlertTitle>Could not load overview statistics</AlertTitle>
              <AlertDescription className="text-[#B94343]/90">
                Platform statistics are temporarily unavailable. Please refresh
                the page to try again.
              </AlertDescription>
            </Alert>
          ) : null}

          <OverviewStats stats={stats} />
        </section>
      </div>
    </div>
  );
}