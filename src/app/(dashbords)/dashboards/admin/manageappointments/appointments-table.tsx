import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/components/shared/HomePage/DynamicSection1/card";

import { AppointmentActions } from "./appointment-actions";
import { formatDate, getInitials } from "./appointment-helpers";
import {
  AppointmentStatusBadge,
  PaymentStatusBadge,
} from "./status-badges";
import { IAppointment } from "@/data/appiontmentapi";

interface AppointmentsTableProps {
  appointments: IAppointment[];
  onView: (appointment: IAppointment) => void;
  onConfirm: (appointment: IAppointment) => void;
  onCancel: (appointment: IAppointment) => void;
}

const headClasses =
  "h-11 px-4 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase";

function CustomerIdentity({ appointment }: { appointment: IAppointment }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F7F3EE] text-[11px] font-medium text-[#A58B73] ring-1 ring-[#D8C5B2]/60"
      >
        {getInitials(appointment.customerName)}
      </span>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-[#292824]">
          {appointment.customerName}
        </p>
        <p className="truncate text-xs text-[#625D56]">
          {appointment.customerEmail}
        </p>
      </div>
    </div>
  );
}

function AppointmentMessage({ message }: { message: string }) {
  if (!message) {
    return <span className="text-xs text-[#89847E]">—</span>;
  }

  return (
    <p
      title={message}
      className="max-w-[10rem] truncate text-xs leading-5 text-[#625D56]"
    >
      {message}
    </p>
  );
}

export function AppointmentsTable({
  appointments,
  onView,
  onConfirm,
  onCancel,
}: AppointmentsTableProps) {
  return (
    <>
      <div className="hidden xl:block">
        <Table className="min-w-[66rem]">
          <TableHeader>
            <TableRow className="border-[#D8C5B2]/60 hover:bg-transparent">
              <TableHead className={headClasses}>Customer</TableHead>
              <TableHead className={headClasses}>Service</TableHead>
              <TableHead className={headClasses}>Appointment Date</TableHead>
              <TableHead className={headClasses}>Time Slot</TableHead>
              <TableHead className={headClasses}>Message</TableHead>
              <TableHead className={headClasses}>Price</TableHead>
              <TableHead className={headClasses}>Appointment Status</TableHead>
              <TableHead className={headClasses}>Payment Status</TableHead>
              <TableHead className={headClasses}>Request Date</TableHead>
              <TableHead
                className={`${headClasses} sticky right-0 z-10 bg-white text-right`}
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
                <TableCell className="px-4 py-4">
                  <CustomerIdentity appointment={appointment} />
                </TableCell>

                <TableCell className="px-4 py-4">
                  <p className="text-sm whitespace-nowrap text-[#292824]">
                    {appointment.serviceName}
                  </p>
                </TableCell>

                <TableCell className="px-4 py-4 text-sm whitespace-nowrap text-[#625D56]">
                  {formatDate(appointment.appointmentDate)}
                </TableCell>

                <TableCell className="px-4 py-4 text-xs whitespace-nowrap text-[#625D56]">
                  {appointment.timeSlot}
                </TableCell>

                <TableCell className="px-4 py-4">
                  <AppointmentMessage message={appointment.message} />
                </TableCell>

                <TableCell className="px-4 py-4 text-sm font-medium whitespace-nowrap text-[#292824] tabular-nums">
                  {formatPrice(appointment.servicePrice)}
                </TableCell>

                <TableCell className="px-4 py-4">
                  <AppointmentStatusBadge
                    status={appointment.status}
                  />
                </TableCell>

                <TableCell className="px-4 py-4">
                  <PaymentStatusBadge status={appointment.paymentStatus} />
                </TableCell>

                <TableCell className="px-4 py-4 text-xs whitespace-nowrap text-[#625D56]">
                  {formatDate(appointment.createdAt)}
                </TableCell>

                <TableCell className="sticky right-0 z-10 border-l border-[#D8C5B2]/40 bg-white px-4 py-4">
                  <div className="flex justify-end">
                    <AppointmentActions
                      appointment={appointment}
                      onView={onView}
                      onConfirm={onConfirm}
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
              <CustomerIdentity appointment={appointment} />
              <AppointmentStatusBadge
                status={appointment.status}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl bg-[#F7F3EE] px-3.5 py-3 ring-1 ring-[#D8C5B2]/50">
              <p className="text-sm font-medium text-[#292824]">
                {appointment.serviceName}
              </p>
              <p className="text-sm font-semibold text-[#292824] tabular-nums">
                {formatPrice(appointment.servicePrice)}
              </p>
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

            {appointment.message ? (
              <div className="mt-4">
                <p className="text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                  Message
                </p>
                <p className="mt-1 text-xs leading-5 text-[#625D56]">
                  {appointment.message}
                </p>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D8C5B2]/50 pt-3">
              <PaymentStatusBadge status={appointment.paymentStatus} />

              <AppointmentActions
                appointment={appointment}
                onView={onView}
                onConfirm={onConfirm}
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
