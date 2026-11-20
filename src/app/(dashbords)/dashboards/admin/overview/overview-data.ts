import {
  getAllAppointmentsApi,
  type IAppointment,
} from "@/data/appiontmentapi";
import { getServices, type Service } from "@/data/services";
import { getAllTransactions, type Payment } from "@/data/transactions";
import { allusers, type IUser } from "@/data/users";

export interface AdminOverviewStats {
  totalCustomers: number;
  activeServices: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  successfulPayments: number;
}

export async function getAdminOverviewStats(): Promise<AdminOverviewStats> {
  const [users, services, appointments, transactionsResult] =
    await Promise.all([
      allusers(),
      getServices(),
      getAllAppointmentsApi(),
      getAllTransactions(),
    ]);

  if (
    !Array.isArray(users) ||
    !Array.isArray(services) ||
    !Array.isArray(appointments) ||
    !Array.isArray(transactionsResult?.transactions)
  ) {
    throw new Error("Unexpected response while loading admin overview data");
  }

  const customers = (users as IUser[]).filter((user) => user.role === "user");
  const serviceList = services as Service[];
  const appointmentList = appointments as IAppointment[];
  const successfulPayments = (
    transactionsResult.transactions as Payment[]
  ).filter((payment) => payment.payment_status === "paid").length;

  return {
    totalCustomers: customers.length,
    activeServices: serviceList.filter((service) => service.status === "active")
      .length,
    totalAppointments: appointmentList.length,
    pendingAppointments: appointmentList.filter(
      (appointment) => appointment.status === "pending",
    ).length,
    confirmedAppointments: appointmentList.filter(
      (appointment) => appointment.status === "confirmed",
    ).length,
    successfulPayments,
  };
}
