 "use server";

import { allauthFetch } from "./core";

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
//transaction post request
export const transactions = async (session_id: string) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/transactions`
  const response = await allauthFetch(api, "POST", { session_id })
  return response
  
}

//all transactions
export const getAllTransactions = async () => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/transactions`
  const response = await allauthFetch(api, "GET")
  console.log("All transactions:", response);
  return response 
}