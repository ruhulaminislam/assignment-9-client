"use client";

import Image from "next/image";
import {
  CalendarClock,
  CalendarDays,
  Clock3,
  MessageSquare,
  Scissors,
} from "lucide-react";

import { formatPrice } from "@/components/shared/HomePage/DynamicSection1/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IAppointment } from "@/data/appiontmentapi";

import { formatDate } from "./appointment-helpers";
import { serviceMeta } from "./appointments";
import { inter, playfair } from "./fonts";
import {
  AppointmentStatusBadge,
  PaymentStatusBadge,
} from "./status-badges";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
      <dt className="text-xs text-[#625D56]">{label}</dt>
      <dd className="text-right text-sm font-medium text-[#292824]">
        {value}
      </dd>
    </div>
  );
}

export function AppointmentDetailsDialog({
  appointment,
  onClose,
}: {
  appointment: IAppointment | null;
  onClose: () => void;
}) {
  const meta = appointment ? serviceMeta[appointment.serviceId] : undefined;

  return (
    <Dialog
      open={Boolean(appointment)}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className={`${inter.className} max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D8C5B2]/70 bg-white p-5 text-[#292824] ring-0 shadow-[0_32px_80px_-40px_rgba(41,40,36,0.45)] sm:max-w-md sm:p-6`}
      >
        {appointment ? (
          <>
            <DialogHeader>
              <DialogTitle
                className={`${playfair.className} text-xl leading-snug font-medium text-[#292824]`}
              >
                Appointment Details
              </DialogTitle>
              <DialogDescription className="text-sm text-[#625D56]">
                Review the details of your appointment request.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl bg-[#F7F3EE] p-3.5 ring-1 ring-[#D8C5B2]/50">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#EFE7DD] text-[#A58B73] ring-1 ring-[#D8C5B2]/60">
                  {meta?.image ? (
                    <Image
                      src={meta.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <Scissors
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.5}
                    />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#292824]">
                    {appointment.serviceName}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#625D56]">
                    {meta?.category ?? "Salon service"}
                  </p>
                </div>

                <p className="text-sm font-semibold text-[#292824] tabular-nums">
                  {formatPrice(appointment.servicePrice)}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <AppointmentStatusBadge status={appointment.status} />
                <PaymentStatusBadge status={appointment.paymentStatus} />
              </div>
            </div>

            <div className="rounded-xl border border-[#D8C5B2]/50 px-4">
              <dl className="divide-y divide-[#D8C5B2]/50">
                <DetailRow
                  label="Appointment Date"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays
                        aria-hidden="true"
                        className="size-3.5 text-[#A58B73]"
                        strokeWidth={1.75}
                      />
                      {formatDate(appointment.appointmentDate)}
                    </span>
                  }
                />
                <DetailRow
                  label="Time Slot"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3
                        aria-hidden="true"
                        className="size-3.5 text-[#A58B73]"
                        strokeWidth={1.75}
                      />
                      {appointment.timeSlot}
                    </span>
                  }
                />
                <DetailRow
                  label="Requested On"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock
                        aria-hidden="true"
                        className="size-3.5 text-[#A58B73]"
                        strokeWidth={1.75}
                      />
                      {formatDate(appointment.createdAt)}
                    </span>
                  }
                />
              </dl>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                <MessageSquare
                  aria-hidden="true"
                  className="size-3.5 text-[#A58B73]"
                  strokeWidth={1.75}
                />
                Additional Message
              </p>
              <p className="mt-2 rounded-xl bg-[#F7F3EE] px-4 py-3 text-sm leading-6 break-words text-[#625D56] ring-1 ring-[#D8C5B2]/50">
                {appointment.message || "No additional message provided."}
              </p>
            </div>

            <DialogFooter className="-mx-5 -mb-5 rounded-b-2xl border-[#D8C5B2]/60 bg-[#F7F3EE] px-5 py-4 sm:-mx-6 sm:-mb-6 sm:px-6">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full rounded-lg border-[#D8C5B2] bg-white px-5 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE] sm:w-auto"
                  >
                    Close
                  </Button>
                }
              />
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
