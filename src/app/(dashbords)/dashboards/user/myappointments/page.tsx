import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAppointmentsByCustomerIdApi } from "@/data/appiontmentapi";

import { inter, playfair } from "./fonts";
import { MyAppointments } from "./my-appointments";

export default async function MyAppointmentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const result = await getAppointmentsByCustomerIdApi(userId);
  const appointments = Array.isArray(result) ? result : [];

  return (
    <div className={`${inter.className} bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
          Customer Dashboard
        </p>

        <h1
          className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
        >
          My Appointments
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
          Keep track of your salon visits, review appointment details and cancel
          requests that are still pending.
        </p>

        <MyAppointments initialAppointments={appointments} />
      </div>
    </div>
  );
}
