import {
  getAllAppointmentsApi,
  type IAppointment,
} from "@/data/appiontmentapi";
import { getServices, type Service } from "@/data/services";
import { getAllTransactions } from "@/data/transactions";
import { allusers, type IUser } from "@/data/users";

export interface AdminOverviewStats {
  totalCustomers: number;
  activeServices: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  successfulPayments: number;
}

// Database-এ transaction-এর আসল shape (শুধু যেটুকু লাগে)।
interface TransactionRecord {
  status?: string;
}

// API কখনো সরাসরি array দেয়, কখনো { key: [...] } দেয়, দুটোই সামলানো হলো।
function extractList<T>(result: unknown, key: string): T[] | null {
  if (Array.isArray(result)) return result as T[];

  const nested = (result as Record<string, unknown> | null)?.[key];
  if (Array.isArray(nested)) return nested as T[];

  return null;
}

export async function getAdminOverviewStats(): Promise<AdminOverviewStats> {
  const [usersResult, servicesResult, appointmentsResult, transactionsResult] =
    await Promise.all([
      allusers(),
      getServices(),
      getAllAppointmentsApi(),
      getAllTransactions(),
    ]);

  const users = extractList<IUser>(usersResult, "users");
  const services = extractList<Service>(servicesResult, "services");
  const appointments = extractList<IAppointment>(
    appointmentsResult,
    "appointments",
  );
  const transactions = extractList<TransactionRecord>(
    transactionsResult,
    "transactions",
  );

  if (!users || !services || !appointments || !transactions) {
    console.error("Unexpected response while loading admin overview data", {
      usersOk: Boolean(users),
      servicesOk: Boolean(services),
      appointmentsOk: Boolean(appointments),
      transactionsOk: Boolean(transactions),
    });
    throw new Error("Unexpected response while loading admin overview data");
  }

  const customers = users.filter((user) => user.role === "user");

  // status field না থাকলে service-কে active ধরা হয়েছে, থাকলে "active" হতে হবে।
  const activeServices = services.filter((service) => {
    const status = (service as { status?: string }).status;
    return status === undefined || status === "active";
  });

  return {
    totalCustomers: customers.length,
    activeServices: activeServices.length,
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(
      (appointment) => appointment.status === "pending",
    ).length,
    confirmedAppointments: appointments.filter(
      (appointment) => appointment.status === "confirmed",
    ).length,
    successfulPayments: transactions.filter(
      (payment) => payment.status === "paid",
    ).length,
  };
}