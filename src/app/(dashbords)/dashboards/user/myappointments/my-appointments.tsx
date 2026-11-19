"use client";

import { useState } from "react";

import type { IAppointment } from "@/data/appiontmentapi";

import { AppointmentDetailsDialog } from "./appointment-details-dialog";
import { AppointmentStats } from "./appointment-stats";
import { AppointmentsTable } from "./appointments-table";
import { CancelAppointmentDialog } from "./cancel-appointment-dialog";
import { playfair } from "./fonts";

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

  function cancelAppointment(appointment: IAppointment) {
    setAppointments((current) =>
      current.map((item) =>
        item._id === appointment._id && item.status === "pending"
          ? { ...item, status: "cancelled" }
          : item,
      ),
    );
    setAppointmentToCancel(null);
  }

  return (
    <>
      <AppointmentStats appointments={appointments} />

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
        onClose={() => setAppointmentToCancel(null)}
        onConfirm={cancelAppointment}
      />
    </>
  );
}
