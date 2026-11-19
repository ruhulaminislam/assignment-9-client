import {
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  Clock3,
  type LucideIcon,
} from "lucide-react";

import type { IAppointment } from "@/data/appiontmentapi";

export function AppointmentStats({
  appointments,
}: {
  appointments: IAppointment[];
}) {
  const stats: {
    id: string;
    label: string;
    caption: string;
    value: number;
    icon: LucideIcon;
    iconClasses: string;
  }[] = [
    {
      id: "total",
      label: "Total Appointments",
      caption: "All booking requests",
      value: appointments.length,
      icon: CalendarClock,
      iconClasses: "bg-[#F7F3EE] text-[#A58B73] ring-[#D8C5B2]/60",
    },
    {
      id: "pending",
      label: "Pending",
      caption: "Awaiting confirmation",
      value: appointments.filter(
        (appointment) => appointment.status === "pending",
      ).length,
      icon: Clock3,
      iconClasses: "bg-[#FFF2D8] text-[#956515] ring-[#956515]/20",
    },
    {
      id: "confirmed",
      label: "Confirmed",
      caption: "Ready for the salon",
      value: appointments.filter(
        (appointment) => appointment.status === "confirmed",
      ).length,
      icon: CalendarCheck2,
      iconClasses: "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      caption: "No longer scheduled",
      value: appointments.filter(
        (appointment) => appointment.status === "cancelled",
      ).length,
      icon: CalendarX2,
      iconClasses: "bg-[#FBE9E7] text-[#B94343] ring-[#B94343]/20",
    },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm leading-6 font-medium text-[#625D56]">
                {stat.label}
              </p>

              <span
                aria-hidden="true"
                className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${stat.iconClasses}`}
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
            </div>

            <p className="mt-4 text-3xl font-semibold tracking-tight text-[#292824] tabular-nums">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-[#625D56]">{stat.caption}</p>
          </div>
        );
      })}
    </div>
  );
}
