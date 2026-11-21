"use server";

import { headers } from "next/headers";
import { unstable_rethrow } from "next/navigation";

import { auth } from "@/lib/auth";
import { cancelAppointmentApi } from "@/data/appiontmentapi";

export type CancelResult = {
  success: boolean;
  message: string;
};

export async function cancelAppointmentAction(
  appointmentId: string,
): Promise<CancelResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Please log in again to continue." };
  }

  try {
    // allauthFetch already returns parsed JSON: { success, message }
    const result = await cancelAppointmentApi(appointmentId);

    if (result?.success !== true) {
      return {
        success: false,
        message: result?.message ?? "Could not cancel this appointment.",
      };
    }

    return { success: true, message: "Appointment cancelled." };
  } catch (error) {
    // allauthFetch calls redirect("/unauthorized") on 401/403.
    // redirect() works by throwing, so we must let Next.js handle it.
    unstable_rethrow(error);

    console.error("cancelAppointmentAction failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
