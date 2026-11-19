
"use client";

import { useState } from "react";
import { CalendarCheck2, CalendarX2 } from "lucide-react";

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

import { formatDate } from "./appointment-helpers";
import { inter, playfair } from "./fonts";

import {
  updateAppointmentStatusApi,
  type IAppointment,
  type AppointmentStatus,
} from "@/data/appiontmentapi";
import { toast } from "@/components/ui/toast";

export type AppointmentAction = "confirm" | "cancel";

export interface PendingAppointmentAction {
  action: AppointmentAction;
  appointment: IAppointment;
}

export function AppointmentActionDialog({
  request,
  onClose,
}: {
  request: PendingAppointmentAction | null;
  onClose: () => void;
}) {
  const appointment = request?.appointment;
  const isConfirm = request?.action === "confirm";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Confirm / Cancel Appointment
  const handleAction = async () => {
    if (!appointment || loading) return;

    const status: AppointmentStatus = isConfirm
      ? "confirmed"
      : "cancelled";

    try {
      setLoading(true);
      setError("");

      const result = await updateAppointmentStatusApi(
        appointment._id,
        status
      );
       if(result.modifiedCount > 0) {
         toast.add({
          title: "Success",
          description: "Appointment status updated successfully",
         
         })
       }else{
        toast.add({
          title: "Error",
          description: "Failed to update appointment status",
         
         })
       }
      // Check API response
     

      onClose();
    } catch (error) {
      console.error("Appointment status update error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={Boolean(request)}
      onOpenChange={(open) => {
        if (!open && !loading) {
          setError("");
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
                className={`inline-flex size-11 items-center justify-center rounded-xl ring-1 ${
                  isConfirm
                    ? "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20"
                    : "bg-[#FBE9E7] text-[#B94343] ring-[#B94343]/20"
                }`}
              >
                {isConfirm ? (
                  <CalendarCheck2
                    className="size-5"
                    strokeWidth={1.75}
                  />
                ) : (
                  <CalendarX2
                    className="size-5"
                    strokeWidth={1.75}
                  />
                )}
              </span>

              <DialogTitle
                className={`${playfair.className} mt-1 text-xl leading-snug font-medium text-[#292824]`}
              >
                {isConfirm
                  ? "Confirm Appointment?"
                  : "Cancel Appointment?"}
              </DialogTitle>

              <DialogDescription className="text-sm leading-6 text-[#625D56]">
                {isConfirm
                  ? `Confirm the appointment request from ${appointment.customerName}? The customer will see the appointment as confirmed.`
                  : `Cancel the appointment request from ${appointment.customerName}? The customer will see the appointment as cancelled.`}
              </DialogDescription>
            </DialogHeader>

            <dl className="divide-y divide-[#D8C5B2]/50 rounded-xl bg-[#F7F3EE] px-4 ring-1 ring-[#D8C5B2]/50">
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-xs text-[#625D56]">
                  Customer
                </dt>

                <dd className="min-w-0 text-right">
                  <p className="truncate text-sm font-medium text-[#292824]">
                    {appointment.customerName}
                  </p>

                  <p className="truncate text-xs text-[#625D56]">
                    {appointment.customerEmail}
                  </p>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-xs text-[#625D56]">
                  Service
                </dt>

                <dd className="text-right">
                  <p className="text-sm font-medium text-[#292824]">
                    {appointment.serviceName}
                  </p>

                  <p className="text-xs text-[#625D56] tabular-nums">
                    {formatPrice(appointment.servicePrice)}
                  </p>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-xs text-[#625D56]">
                  Schedule
                </dt>

                <dd className="text-right">
                  <p className="text-sm font-medium text-[#292824]">
                    {formatDate(appointment.appointmentDate)}
                  </p>

                  <p className="text-xs text-[#625D56]">
                    {appointment.timeSlot}
                  </p>
                </dd>
              </div>
            </dl>

            {error ? (
              <p
                role="alert"
                className="text-sm text-[#B94343]"
              >
                {error}
              </p>
            ) : null}

            <DialogFooter className="-mx-5 -mb-5 rounded-b-2xl border-[#D8C5B2]/60 bg-[#F7F3EE] px-5 py-4 sm:-mx-6 sm:-mb-6 sm:px-6">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={loading}
                    className="h-10 w-full rounded-lg border-[#D8C5B2] bg-white px-4 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE] sm:w-auto"
                  >
                    {isConfirm
                      ? "Cancel"
                      : "Keep Appointment"}
                  </Button>
                }
              />

              <Button
                type="button"
                onClick={handleAction}
                disabled={loading}
                className={`h-10 w-full rounded-lg px-4 text-sm font-medium text-white sm:w-auto ${
                  isConfirm
                    ? "bg-[#292824] hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40"
                    : "bg-[#B94343] hover:bg-[#B94343]/90 focus-visible:ring-[#B94343]/40"
                }`}
              >
                {loading
                  ? "Updating..."
                  : isConfirm
                    ? "Confirm Appointment"
                    : "Cancel Appointment"}
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
