import {
  getAllAppointmentsApi,
  type IAppointment,
} from "@/data/appiontmentapi";
import { getAllTransactions, type Payment } from "@/data/transactions";
import { allusers, type IUser } from "@/data/users";

// Older transaction documents stored the Stripe session id as `sessionId`.
type TransactionRecord = Payment & { sessionId?: string };

export interface TransactionRow {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  appointmentDate: string;
  amount: number | null;
  currency: string;
  sessionId: string;
  paymentStatus: Payment["payment_status"];
  transactionDate: string;
}

export async function getTransactionRows(): Promise<TransactionRow[]> {
  const [transactionsResult, appointments, users] = await Promise.all([
    getAllTransactions(),
    getAllAppointmentsApi(),
    allusers(),
    
  ]);
  console.log("Transactions result: admin", transactionsResult);
  console.log("Appointments: admin", appointments);
  console.log("Users: admin", users);
  if (
    !Array.isArray(transactionsResult?.transactions) ||
    !Array.isArray(appointments) ||
    !Array.isArray(users)
  ) {
    console.error("Unexpected response while loading transactions");
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

  return (transactionsResult.transactions as TransactionRecord[]).map(
    (payment) => {
      const appointment = payment.appointmentId
        ? appointmentsById.get(payment.appointmentId)
        : undefined;
      const customer = usersById.get(payment.userId);

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
        // Stripe returns amounts in the smallest currency unit (cents).
        amount:
          payment.amount != null
            ? payment.amount / 100
            : (appointment?.servicePrice ?? null),
        currency: payment.currency,
        sessionId: payment.session_id ?? payment.sessionId ?? "",
        paymentStatus: payment.payment_status,
        transactionDate: new Date(payment.paymentDate).toISOString(),
      };
    },
  );
}
