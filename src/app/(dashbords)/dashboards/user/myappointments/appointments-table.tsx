import Image from "next/image";
import { Scissors } from "lucide-react";

import { formatPrice } from "@/components/shared/HomePage/DynamicSection1/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IAppointment } from "@/data/appiontmentapi";

import { AppointmentActions } from "./appointment-actions";
import { formatDate } from "./appointment-helpers";
import { serviceMeta } from "./appointments";
import {
  AppointmentStatusBadge,
  PaymentStatusBadge,
} from "./status-badges";

interface AppointmentsTableProps {
  appointments: IAppointment[];
  onView: (appointment: IAppointment) => void;
  onCancel: (appointment: IAppointment) => void;
}

const headClasses =
  "h-11 px-3 text-[11px] leading-tight font-medium tracking-[0.14em] text-[#625D56] uppercase";

function ServiceIdentity({ appointment }: { appointment: IAppointment }) {
  const meta = serviceMeta[appointment.serviceId];

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="relative inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#EFE7DD] text-[#A58B73] ring-1 ring-[#D8C5B2]/60">
        {meta?.image ? (
          <Image
            src={meta.image}
            alt=""
            fill
            sizes="44px"
            className="object-cover"
          />
        ) : (
          <Scissors aria-hidden="true" className="size-5" strokeWidth={1.5} />
        )}
      </span>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-[#292824]">
          {appointment.serviceName}
        </p>
        <p className="mt-0.5 truncate text-xs text-[#625D56]">
          {meta?.category ?? "Salon service"}
        </p>
      </div>
    </div>
  );
}

export function AppointmentsTable({
  appointments,
  onView,
  onCancel,
}: AppointmentsTableProps) {
  return (
    <>
      <div className="hidden xl:block">
        <Table className="min-w-[62rem]">
          <TableHeader>
            <TableRow className="border-[#D8C5B2]/60 hover:bg-transparent">
              <TableHead className={headClasses}>Service</TableHead>
              <TableHead className={headClasses}>
                <span className="block">Appointment</span>
                <span className="block">Date</span>
              </TableHead>
              <TableHead className={headClasses}>Time Slot</TableHead>
              <TableHead className={headClasses}>Price</TableHead>
              <TableHead className={headClasses}>
                <span className="block">Appointment</span>
                <span className="block">Status</span>
              </TableHead>
              <TableHead className={headClasses}>
                <span className="block">Payment</span>
                <span className="block">Status</span>
              </TableHead>
              <TableHead className={headClasses}>
                <span className="block">Request</span>
                <span className="block">Date</span>
              </TableHead>
              <TableHead
                className={`${headClasses} sticky right-0 z-10 bg-white text-right shadow-[-12px_0_16px_-18px_rgba(41,40,36,0.5)]`}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment._id}
                className="border-[#D8C5B2]/40 hover:bg-[#F7F3EE]/60"
              >
                <TableCell className="px-3 py-4">
                  <ServiceIdentity appointment={appointment} />
                </TableCell>

                <TableCell className="px-3 py-4 text-sm whitespace-nowrap text-[#625D56]">
                  {formatDate(appointment.appointmentDate)}
                </TableCell>

                <TableCell className="px-3 py-4 text-xs whitespace-nowrap text-[#625D56]">
                  {appointment.timeSlot}
                </TableCell>

                <TableCell className="px-3 py-4 text-sm font-medium whitespace-nowrap text-[#292824] tabular-nums">
                  {formatPrice(appointment.servicePrice)}
                </TableCell>

                <TableCell className="px-3 py-4">
                  <AppointmentStatusBadge status={appointment.status} />
                </TableCell>

                <TableCell className="px-3 py-4">
                  <PaymentStatusBadge status={appointment.paymentStatus} />
                </TableCell>

                <TableCell className="px-3 py-4 text-xs whitespace-nowrap text-[#625D56]">
                  {formatDate(appointment.createdAt)}
                </TableCell>

                <TableCell className="sticky right-0 z-10 border-l border-[#D8C5B2]/40 bg-white px-3 py-4 shadow-[-12px_0_16px_-18px_rgba(41,40,36,0.5)]">
                  <div className="flex justify-end">
                    <AppointmentActions
                      appointment={appointment}
                      onView={onView}
                      onCancel={onCancel}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="divide-y divide-[#D8C5B2]/50 xl:hidden">
        {appointments.map((appointment) => (
          <li key={appointment._id} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <ServiceIdentity appointment={appointment} />
              <AppointmentStatusBadge status={appointment.status} />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                  Appointment Date
                </dt>
                <dd className="mt-1 text-[#292824]">
                  {formatDate(appointment.appointmentDate)}
                </dd>
              </div>

              <div>
                <dt className="text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                  Time Slot
                </dt>
                <dd className="mt-1 text-[#292824]">
                  {appointment.timeSlot}
                </dd>
              </div>

              <div>
                <dt className="text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                  Request Date
                </dt>
                <dd className="mt-1 text-[#292824]">
                  {formatDate(appointment.createdAt)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D8C5B2]/50 pt-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[#292824] tabular-nums">
                  {formatPrice(appointment.servicePrice)}
                </span>
                <PaymentStatusBadge status={appointment.paymentStatus} />
              </div>

              <AppointmentActions
                appointment={appointment}
                onView={onView}
                onCancel={onCancel}
                withLabels
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
