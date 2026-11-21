import { getAllAppointmentsApi, getAppointmentsByCustomerIdApi, IAppointment } from "@/data/appiontmentapi";
import {
  AlertCircle,
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  Clock3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

interface StatCardProps {
  label: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  iconClasses: string;
  accentClasses: string;
}

function getStats(appointments: IAppointment[]): StatCardProps[] {
  const countByStatus = (status: IAppointment["status"]) =>
    appointments.filter((appointment) => appointment.status === status).length;

  return [
    {
      label: "Total Appointments",
      value: appointments.length,
      description: "All appointment requests you have submitted.",
      icon: CalendarClock,
      iconClasses: "bg-[#F7F3EE] text-[#A58B73] ring-[#D8C5B2]/60",
      accentClasses: "bg-[#A58B73]/70",
    },
    {
      label: "Pending",
      value: countByStatus("pending"),
      description: "Waiting for confirmation from the salon.",
      icon: Clock3,
      iconClasses: "bg-[#FFF2D8] text-[#956515] ring-[#956515]/20",
      accentClasses: "bg-[#956515]/60",
    },
    {
      label: "Confirmed",
      value: countByStatus("confirmed"),
      description: "Approved and ready for your visit.",
      icon: CalendarCheck2,
      iconClasses: "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20",
      accentClasses: "bg-[#287A55]/60",
    },
    {
      label: "Cancelled",
      value: countByStatus("cancelled"),
      description: "Appointments that are no longer scheduled.",
      icon: CalendarX2,
      iconClasses: "bg-[#FBE9E7] text-[#B94343] ring-[#B94343]/20",
      accentClasses: "bg-[#B94343]/60",
    },
  ];
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  iconClasses,
  accentClasses,
}: StatCardProps) {
  return (
    <li className="relative overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6">
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 ${accentClasses}`}
      />

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm leading-6 font-medium text-[#625D56]">
          {label}
        </h3>

        <span
          aria-hidden="true"
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ${iconClasses}`}
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
      </div>

      <p className="mt-5 text-4xl leading-none font-semibold tracking-tight text-[#292824] tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-[#625D56]">{description}</p>
    </li>
  );
}

export default async function OverviewPage() {
  const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
  })
    const userId = session?.user?.id;
  let appointments: IAppointment[] = [];
  let hasError = false;

  try {
    const data = await getAppointmentsByCustomerIdApi(userId as string);

    if (Array.isArray(data)) {
      appointments = data as IAppointment[];
    } else {
      hasError = true;
    }
  } catch {
    hasError = true;
  }

  const stats = getStats(appointments).map((stat) => ({
    ...stat,
    // Show a neutral placeholder instead of a misleading zero when the
    // appointment data could not be loaded.
    value: hasError ? "—" : stat.value,
  }));

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
            <Sparkles className="size-6" strokeWidth={1.5} />
          </span>

          <div className="relative max-w-2xl">
            <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
              Customer Dashboard
            </p>

            <h1
              className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
            >
              Welcome Back!
            </h1>

            <p
              className={`${playfair.className} mt-2 text-lg leading-snug font-medium text-[#7A634D] sm:text-xl`}
            >
              Your beauty journey, all in one place.
            </p>

            <p className="mt-3 text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
              Keep track of your appointments and stay updated on your salon
              experience.
            </p>
          </div>
        </header>

        <section
          aria-labelledby="appointment-overview-heading"
          className="mt-8 sm:mt-10"
        >
          <div>
            <h2
              id="appointment-overview-heading"
              className={`${playfair.className} text-2xl font-medium text-[#292824]`}
            >
              Appointment Overview
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#625D56]">
              A quick look at your salon journey so far.
            </p>
          </div>

          {hasError ? (
            <Alert className="mt-5 border-[#B94343]/30 bg-[#FBE9E7] px-4 py-3 text-[#B94343]">
              <AlertCircle aria-hidden="true" />
              <AlertTitle>Could not load your appointments</AlertTitle>
              <AlertDescription className="text-[#B94343]/90">
                Your statistics are temporarily unavailable. Please refresh the
                page to try again.
              </AlertDescription>
            </Alert>
          ) : null}

          <ul className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
