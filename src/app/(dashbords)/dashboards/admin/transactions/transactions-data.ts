import {
  getAllAppointmentsApi,
  type IAppointment,
} from "@/data/appiontmentapi";
import { getAllTransactions } from "@/data/transactions";
import { allusers, type IUser } from "@/data/users";

export type PaymentStatus = "paid" | "pending" | "failed";

// Database-এ transaction document আসলে যে shape-এ আছে (console.log থেকে দেখা)।
interface TransactionRecord {
  _id: string;
  stripeSessionId?: string;
  appointmentId?: string;
  customerId?: string;
  status?: string;
  amount?: number | null;
  currency?: string;
  createdAt?: string;
  customer_email?: string;
  payment_intent?: string;
}

export interface TransactionRow {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  appointmentDate: string;
  amount: number | null;
  currency: string;
  sessionId: string;
  paymentStatus: PaymentStatus;
  transactionDate: string;
}

function normalizeStatus(status: string | undefined): PaymentStatus {
  if (status === "paid") return "paid";
  if (status === "pending") return "pending";
  return "failed";
}

function toIsoDate(value: string | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

// API কখনো সরাসরি array দেয়, কখনো { transactions: [...] } দেয়, দুটোই সামলানো হলো।
function extractTransactions(result: unknown): TransactionRecord[] | null {
  if (Array.isArray(result)) return result as TransactionRecord[];

  const nested = (result as { transactions?: unknown } | null)?.transactions;
  if (Array.isArray(nested)) return nested as TransactionRecord[];

  return null;
}

export async function getTransactionRows(): Promise<TransactionRow[]> {
  const [transactionsResult, appointments, users] = await Promise.all([
    getAllTransactions(),
    getAllAppointmentsApi(),
    allusers(),
  ]);

  const transactions = extractTransactions(transactionsResult);

  if (!transactions || !Array.isArray(appointments) || !Array.isArray(users)) {
    console.error("Unexpected response while loading transactions", {
      transactionsOk: Boolean(transactions),
      appointmentsOk: Array.isArray(appointments),
      usersOk: Array.isArray(users),
    });
    throw new Error("Unexpected response while loading transactions");
  }

  const appointmentsById = new Map(
    (appointments as IAppointment[]).map((appointment) => [
      appointment._id,
      appointment,
    ]),
  );
  const usersById = new Map(
    (users as IUser[]).map((user) => [user._id, user]),
  );

  return transactions
    .map((payment): TransactionRow => {
      const appointment = payment.appointmentId
        ? appointmentsById.get(payment.appointmentId)
        : undefined;
      const customer = payment.customerId
        ? usersById.get(payment.customerId)
        : undefined;

      return {
        id: payment._id,
        customerName:
          customer?.name ?? appointment?.customerName ?? "Unknown customer",
        customerEmail:
          payment.customer_email ||
          customer?.email ||
          appointment?.customerEmail ||
          "",
        serviceName: appointment?.serviceName ?? "",
        appointmentDate: appointment?.appointmentDate ?? "",
        // Stripe amount cents-এ রাখে, তাই ১০০ দিয়ে ভাগ।
        amount:
          payment.amount != null
            ? payment.amount / 100
            : (appointment?.servicePrice ?? null),
        currency: payment.currency ?? "usd",
        sessionId: payment.stripeSessionId ?? "",
        paymentStatus: normalizeStatus(payment.status),
        transactionDate: toIsoDate(payment.createdAt),
      };
    })
    // নতুন transaction সবার উপরে
    .sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime(),
    );
}