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
