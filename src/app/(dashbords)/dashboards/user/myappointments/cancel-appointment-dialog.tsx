"use client";

import Image from "next/image";
import { CalendarX2, Scissors } from "lucide-react";

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

export function CancelAppointmentDialog({
  appointment,
  onClose,
  onConfirm,
}: {
  appointment: IAppointment | null;
  onClose: () => void;
  onConfirm: (appointment: IAppointment) => void;
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
              <span
                aria-hidden="true"
                className="inline-flex size-11 items-center justify-center rounded-xl bg-[#FBE9E7] text-[#B94343] ring-1 ring-[#B94343]/20"
              >
                <CalendarX2 className="size-5" strokeWidth={1.75} />
              </span>

              <DialogTitle
                className={`${playfair.className} mt-1 text-xl leading-snug font-medium text-[#292824]`}
              >
                Cancel Appointment?
              </DialogTitle>

              <DialogDescription className="text-sm leading-6 text-[#625D56]">
                This will cancel your {appointment.serviceName} appointment on{" "}
                {formatDate(appointment.appointmentDate)}. You can book a new
                appointment at any time.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl bg-[#F7F3EE] p-3.5 ring-1 ring-[#D8C5B2]/50">
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

              <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-[#D8C5B2]/50 pt-3 text-xs">
                <div>
                  <dt className="text-[#625D56]">Date</dt>
                  <dd className="mt-0.5 font-medium text-[#292824]">
                    {formatDate(appointment.appointmentDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#625D56]">Time Slot</dt>
                  <dd className="mt-0.5 font-medium text-[#292824]">
                    {appointment.timeSlot}
                  </dd>
                </div>
              </dl>
            </div>

            <DialogFooter className="-mx-5 -mb-5 rounded-b-2xl border-[#D8C5B2]/60 bg-[#F7F3EE] px-5 py-4 sm:-mx-6 sm:-mb-6 sm:px-6">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full rounded-lg border-[#D8C5B2] bg-white px-4 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE] sm:w-auto"
                  >
                    Keep Appointment
                  </Button>
                }
              />

              <Button
                type="button"
                onClick={() => onConfirm(appointment)}
                className="h-10 w-full rounded-lg bg-[#B94343] px-4 text-sm font-medium text-white hover:bg-[#B94343]/90 focus-visible:ring-[#B94343]/40 sm:w-auto"
              >
                Cancel Appointment
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
