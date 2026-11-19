"use client";

import { useState } from "react";

import {
  AppointmentActionDialog,
  type PendingAppointmentAction,
} from "./appointment-action-dialog";
import { AppointmentDetailsDialog } from "./appointment-details-dialog";
import { AppointmentsTable } from "./appointments-table";
import { playfair } from "./fonts";
import { IAppointment } from "@/data/appiontmentapi";

export function AppointmentsSection({
  appointments,
}: {
  appointments: IAppointment[];
}) {
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [pendingAction, setPendingAction] =
    useState<PendingAppointmentAction | null>(null);

  return (
    <>
      <section className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 shadow-[0_22px_50px_-40px_rgba(41,40,36,0.4)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8C5B2]/60 px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <h2
              className={`${playfair.className} text-xl font-medium text-[#292824]`}
            >
              Appointment Requests
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#625D56]">
              Confirm or cancel pending requests and keep the full schedule in
              view.
            </p>
          </div>

          <span className="rounded-full bg-[#F7F3EE] px-3 py-1 text-xs font-medium text-[#625D56] ring-1 ring-[#D8C5B2]/60">
            {appointments.length} appointments
          </span>
        </div>

        <AppointmentsTable
          appointments={appointments}
          onView={setSelectedAppointment}
          onConfirm={(appointment) =>
            setPendingAction({ action: "confirm", appointment })
          }
          onCancel={(appointment) =>
            setPendingAction({ action: "cancel", appointment })
          }
        />
      </section>

      <AppointmentDetailsDialog
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />

      <AppointmentActionDialog
        request={pendingAction}
        onClose={() => setPendingAction(null)}
      />
    </>
  );
}
