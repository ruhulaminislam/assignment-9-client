
export interface Payment {
  _id: string;
  session_id: string;
  appointmentId: string;
  status: "complete" | "pending" | "expired";
  customer_email: string;
  userId: string;
  payment_intent: string;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  amount: number;
  currency: string;
  paymentDate: Date;
}

export const transactions = async (session_id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/transactions`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || "Transaction failed")
  }

  return data
}

//all transactions
export const getAllTransactions = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/transactions`)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || "Transaction failed")
  }

  return data
}