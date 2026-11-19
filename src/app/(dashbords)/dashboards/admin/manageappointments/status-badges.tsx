import { AppointmentStatus, PaymentStatus } from "@/data/appiontmentapi";


const badgeClasses =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ring-1";

const appointmentStyles: Record<
  AppointmentStatus,
  { label: string; classes: string }
> = {
  pending: {
    label: "Pending",
    classes: "bg-[#FFF2D8] text-[#956515] ring-[#956515]/20",
  },
  confirmed: {
    label: "Confirmed",
    classes: "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-[#FBE9E7] text-[#B94343] ring-[#B94343]/20",
  },
};

const paymentStyles: Record<PaymentStatus, { label: string; classes: string }> =
  {
    paid: {
      label: "Paid",
      classes: "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20",
    },
    unpaid: {
      label: "Unpaid",
      classes: "bg-[#F7F3EE] text-[#625D56] ring-[#D8C5B2]/70",
    },
  };

export function AppointmentStatusBadge({
  status,
}: {
  status: AppointmentStatus;
}) {
  const { label, classes } = appointmentStyles[status];

  return (
    <span className={`${badgeClasses} ${classes}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, classes } = paymentStyles[status];

  return (
    <span className={`${badgeClasses} ${classes}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
