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
export const appointmentApi =async (data: any) => {
     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
     });
     return response.json();
}

//get all appointments api
export const getAllAppointmentsApi = async () => {
     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`);
     return response.json();
}


//update appointment status api
export const updateAppointmentStatusApi = async (id: string, status: AppointmentStatus) => {
     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/status/${id}`, {
          method: 'PATCH',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
     });
     return response.json();
}

//get all appointment by customer id
export const getAppointmentsByCustomerIdApi = async (customerId: string) => {
     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/customer/${customerId}`);
     return response.json();
}

//appointment cancel by user
export const cancelAppointmentApi = async (id: string) => {
     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/cancel/${id}`, {
          method: 'PATCH',
          headers: {
               'Content-Type': 'application/json',
          },
     });
     return response.json();
}