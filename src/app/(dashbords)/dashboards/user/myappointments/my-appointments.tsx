"use client";

import { useState, useTransition } from "react";

import type { IAppointment } from "@/data/appiontmentapi";

import { cancelAppointmentAction } from "./actions";
import { AppointmentDetailsDialog } from "./appointment-details-dialog";
import { AppointmentStats } from "./appointment-stats";
import { AppointmentsTable } from "./appointments-table";
import { CancelAppointmentDialog } from "./cancel-appointment-dialog";
import { playfair } from "./fonts";
import { toast } from "@/components/ui/toast";

export function MyAppointments({
  initialAppointments,
}: {
  initialAppointments: IAppointment[];
}) {
  const [appointments, setAppointments] =
    useState<IAppointment[]>(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [appointmentToCancel, setAppointmentToCancel] =
    useState<IAppointment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCancelling, startTransition] = useTransition();

  function cancelAppointment(appointment: IAppointment) {
    setErrorMessage(null);

    startTransition(async () => {
      // 1) Ask the server first.
      const result = await cancelAppointmentAction(appointment._id);

      // 2) Only change the UI if the server succeeded.
      if (result.success) {
        setAppointments((current) =>
          current.map((item) =>
            item._id === appointment._id && item.status === "pending"
              ? { ...item, status: "cancelled" }
              : item,
          ),
        );
        toast.add({
          title: "Appointment Cancelled",
          description: "Your appointment has been cancelled.",
         
        });
      } else {
        toast.add({
          title: "Failed to Cancel",
          description: result.message,
         
        });
      }

      setAppointmentToCancel(null);
    });
  }

  return (
    <>
      <AppointmentStats appointments={appointments} />

      {errorMessage ? (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-[#FBE9E7] px-4 py-3 text-sm text-[#B94343] ring-1 ring-[#B94343]/20"
        >
          {errorMessage}
        </p>
      ) : null}

      <section className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 shadow-[0_22px_50px_-40px_rgba(41,40,36,0.4)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8C5B2]/60 px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <h2
              className={`${playfair.className} text-xl font-medium text-[#292824]`}
            >
              Your Appointments
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#625D56]">
              Review upcoming visits, check payment status and cancel requests
              that are still pending.
            </p>
          </div>

          <span className="rounded-full bg-[#F7F3EE] px-3 py-1 text-xs font-medium text-[#625D56] ring-1 ring-[#D8C5B2]/60">
            {appointments.length} appointments
          </span>
        </div>

        <AppointmentsTable
          appointments={appointments}
          onView={setSelectedAppointment}
          onCancel={setAppointmentToCancel}
        />
      </section>

      <AppointmentDetailsDialog
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />

      <CancelAppointmentDialog
        appointment={appointmentToCancel}
        isCancelling={isCancelling}
        onClose={() => setAppointmentToCancel(null)}
        onConfirm={cancelAppointment}
      />
    </>
  );
}
