import type { IAppointment } from "@/data/appiontmentapi";

export function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    // Appointment dates are stored as date-only strings, so format them in UTC
    // to avoid the date shifting between server and browser time zones.
    timeZone: "UTC",
  }).format(date);
}

type ServiceMeta = {
  image?: string;
  category?: string;
};

// Image/category now come from the appointment document itself
// (serviceImage / serviceCategory). If they are missing, the UI falls back
// to the Scissors icon and "Salon service".
export function getServiceMeta(appointment: IAppointment): ServiceMeta {
  const extended = appointment as IAppointment & {
    serviceImage?: string;
    serviceCategory?: string;
  };

  return {
    image: extended.serviceImage,
    category: extended.serviceCategory,
  };
}
