import {
  CalendarCheck2,
  CalendarClock,
  Clock3,
  CreditCard,
  Scissors,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { AdminOverviewStats } from "./overview-data";

interface StatCardProps {
  label: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  iconClasses: string;
  accentClasses: string;
}

export function OverviewStats({ stats }: { stats: AdminOverviewStats | null }) {
  const cards: StatCardProps[] = [
    {
      label: "Total Customers",
      value: stats?.totalCustomers ?? "—",
      description: "Registered customer accounts.",
      icon: UsersRound,
      iconClasses: "bg-[#F7F3EE] text-[#A58B73] ring-[#D8C5B2]/60",
      accentClasses: "bg-[#A58B73]/70",
    },
    {
      label: "Active Services",
      value: stats?.activeServices ?? "—",
      description: "Services currently available to book.",
      icon: Scissors,
      iconClasses: "bg-[#EFE7DD] text-[#7A634D] ring-[#D8C5B2]/70",
      accentClasses: "bg-[#7A634D]/60",
    },
    {
      label: "Total Appointments",
      value: stats?.totalAppointments ?? "—",
      description: "Booking requests across every status.",
      icon: CalendarClock,
      iconClasses: "bg-[#EAE6E1] text-[#625D56] ring-[#89847E]/25",
      accentClasses: "bg-[#625D56]/60",
    },
    {
      label: "Pending Appointments",
      value: stats?.pendingAppointments ?? "—",
      description: "Appointments awaiting confirmation.",
      icon: Clock3,
      iconClasses: "bg-[#FFF2D8] text-[#956515] ring-[#956515]/20",
      accentClasses: "bg-[#956515]/60",
    },
    {
      label: "Confirmed Appointments",
      value: stats?.confirmedAppointments ?? "—",
      description: "Appointments approved by the salon.",
      icon: CalendarCheck2,
      iconClasses: "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20",
      accentClasses: "bg-[#287A55]/60",
    },
    {
      label: "Successful Payments",
      value: stats?.successfulPayments ?? "—",
      description: "Verified Stripe payments recorded.",
      icon: CreditCard,
      iconClasses: "bg-[#F1E9DF] text-[#7A634D] ring-[#A58B73]/30",
      accentClasses: "bg-[#A58B73]/70",
    },
  ];

  return (
    <ul className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </ul>
  );
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
