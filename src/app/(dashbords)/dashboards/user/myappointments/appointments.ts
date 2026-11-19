import type { IAppointment } from "@/data/appiontmentapi";

/**
 * Dummy appointments for the signed-in customer.
 *
 * The shape matches `IAppointment` exactly. Real API data can replace this
 * list later without changing the presentation components.
 */
export const dummyAppointments: IAppointment[] = [
  {
    _id: "apt-2001",
    serviceId: "svc-premium-haircut",
    appointmentDate: "2026-11-24",
    timeSlot: "11:00 AM – 12:00 PM",
    message: "Please trim only the split ends and keep the current length.",
    customerId: "cus-1001",
    servicePrice: 500,
    serviceName: "Premium Haircut",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-19T09:15:00.000Z",
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    _id: "apt-2002",
    serviceId: "svc-head-massage",
    appointmentDate: "2026-11-26",
    timeSlot: "02:00 PM – 03:00 PM",
    message: "",
    customerId: "cus-1001",
    servicePrice: 400,
    serviceName: "Head Massage",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-19T17:40:00.000Z",
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    _id: "apt-2003",
    serviceId: "svc-beard-trimming",
    appointmentDate: "2026-11-28",
    timeSlot: "03:00 PM – 04:00 PM",
    message: "I have sensitive skin, so please use fragrance-free products.",
    customerId: "cus-1001",
    servicePrice: 200,
    serviceName: "Beard Trimming",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-18T11:05:00.000Z",
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    _id: "apt-2004",
    serviceId: "svc-grooming-package",
    appointmentDate: "2026-12-01",
    timeSlot: "10:00 AM – 11:00 AM",
    message: "Booking this before a wedding — please leave extra time for styling.",
    customerId: "cus-1001",
    servicePrice: 1500,
    serviceName: "Complete Grooming Package",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-15T08:30:00.000Z",
    status: "confirmed",
    paymentStatus: "unpaid",
  },
  {
    _id: "apt-2005",
    serviceId: "svc-classic-haircut",
    appointmentDate: "2026-11-22",
    timeSlot: "12:00 PM – 01:00 PM",
    message: "",
    customerId: "cus-1001",
    servicePrice: 300,
    serviceName: "Classic Haircut",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-12T13:20:00.000Z",
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    _id: "apt-2006",
    serviceId: "svc-hair-coloring",
    appointmentDate: "2026-12-04",
    timeSlot: "01:00 PM – 02:00 PM",
    message: "Going one shade darker than last time.",
    customerId: "cus-1001",
    servicePrice: 1200,
    serviceName: "Hair Coloring",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-14T07:55:00.000Z",
    status: "confirmed",
    paymentStatus: "unpaid",
  },
  {
    _id: "apt-2007",
    serviceId: "svc-hot-towel-shave",
    appointmentDate: "2026-11-14",
    timeSlot: "04:00 PM – 05:00 PM",
    message: "",
    customerId: "cus-1001",
    servicePrice: 350,
    serviceName: "Hot Towel Shave",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-08T10:48:00.000Z",
    status: "cancelled",
    paymentStatus: "unpaid",
  },
  {
    _id: "apt-2008",
    serviceId: "svc-classic-haircut",
    appointmentDate: "2026-11-16",
    timeSlot: "11:00 AM – 12:00 PM",
    message: "Need to reschedule — I will book again next month.",
    customerId: "cus-1001",
    servicePrice: 300,
    serviceName: "Classic Haircut",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-10T16:20:00.000Z",
    status: "cancelled",
    paymentStatus: "unpaid",
  },
  {
    _id: "apt-2009",
    serviceId: "svc-hair-styling",
    appointmentDate: "2026-12-06",
    timeSlot: "03:00 PM – 04:00 PM",
    message: "Would love soft waves for an evening event.",
    customerId: "cus-1001",
    servicePrice: 350,
    serviceName: "Hair Styling",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    createdAt: "2026-11-13T15:10:00.000Z",
    status: "confirmed",
    paymentStatus: "paid",
  },
];

/**
 * Display-only service information used by the appointment UI.
 *
 * `IAppointment` intentionally stores only `serviceId`, so the image and
 * category are resolved from this small local catalogue instead of being
 * added to the appointment type.
 */
export const serviceMeta: Record<
  string,
  { category: string; image: string }
> = {
  "svc-premium-haircut": {
    category: "Haircut",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
  },
  "svc-classic-haircut": {
    category: "Haircut",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
  },
  "svc-beard-trimming": {
    category: "Beard",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
  },
  "svc-grooming-package": {
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
  },
  "svc-head-massage": {
    category: "Massage",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
  },
  "svc-hair-coloring": {
    category: "Hair Color",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
  },
  "svc-hot-towel-shave": {
    category: "Shaving",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
  },
  "svc-hair-styling": {
    category: "Hair Styling",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
  },
};
