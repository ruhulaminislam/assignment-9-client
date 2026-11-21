
 "use server"

import { allauthFetch } from "./core";

//appointment api
export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export type PaymentStatus = "unpaid" | "paid";
export interface IAppointment {
  _id: string;
  serviceId: string;
  appointmentDate: string;
  timeSlot: string;
  message: string;
  customerId: string;
  servicePrice: number;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
}
//create appointment by user  
export const appointmentApi =async (data: any) => {
     const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`;
     const response = await allauthFetch(api, "POST", data);
     return response;

}

//get all appointments api
export const getAllAppointmentsApi = async () => {
     const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`;
     const response = await allauthFetch(api, "GET");
     return response;
}

//get appointment by id
export const getAppointmentByIdApi = async (id: string) => {
     const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/${id}`;
     const response = await allauthFetch(api, "GET");
     return response;
}

//update appointment status api
export const updateAppointmentStatusApi = async (id: string, status: AppointmentStatus) => {
     const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/status/${id}`;
     const response = await allauthFetch(api, "PATCH", { status });
     return response;
     
}

//get all appointment by customer id
export const getAppointmentsByCustomerIdApi = async (customerId: string) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/customer/${customerId}`;
  const response = await allauthFetch(api, "GET");
  return response;
};

//appointment cancel by user
export const cancelAppointmentApi = async (id: string) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/cancel/${id}`;
  const response = await allauthFetch(api, "PATCH");
  return response;
};