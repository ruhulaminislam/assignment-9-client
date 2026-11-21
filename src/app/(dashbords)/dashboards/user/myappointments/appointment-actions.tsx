import { Eye, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { IAppointment } from "@/data/appiontmentapi";
import PaymentCard from "@/app/paymentCard/paymentCard";

interface AppointmentActionsProps {
  appointment: IAppointment;
  onView: (appointment: IAppointment) => void;
  onCancel: (appointment: IAppointment) => void;
  withLabels?: boolean;
}

export function AppointmentActions({
  appointment,
  onView,
  onCancel,
  withLabels = false,
}: AppointmentActionsProps) {
  const canCancel = appointment.status === "pending";
  const canPay =
    appointment.status === "confirmed" &&
    appointment.paymentStatus === "unpaid";

  const wrapperClasses = withLabels
    ? "flex flex-wrap items-center gap-1.5"
    : "flex items-center overflow-hidden rounded-lg border border-[#D8C5B2]/70 bg-white";

  const buttonClasses = withLabels
    ? "h-9 gap-1.5 rounded-lg border border-[#D8C5B2]/70 bg-white px-2.5 text-xs font-medium"
    : "size-9 rounded-none border-l border-[#D8C5B2]/60 px-0 first:border-l-0";

  const focusClasses =
    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#292824]/40";

  const sharedClasses = `${buttonClasses} ${focusClasses}`;

  return (
    <div className={wrapperClasses}>
      <Button
        type="button"
        variant="ghost"
        aria-label={`View details for ${appointment.serviceName}`}
        title="View appointment details"
        onClick={() => onView(appointment)}
        className={`${sharedClasses} text-[#625D56] hover:bg-[#F7F3EE] hover:text-[#292824]`}
      >
        <Eye aria-hidden="true" strokeWidth={1.75} />
        {withLabels ? "Details" : null}
      </Button>

      {canCancel ? (
        <Button
          type="button"
          variant="ghost"
          aria-label={`Cancel ${appointment.serviceName} appointment`}
          title="Cancel appointment"
          onClick={() => onCancel(appointment)}
          className={`${sharedClasses} text-[#B94343] hover:bg-[#FBE9E7] hover:text-[#B94343]`}
        >
          <X aria-hidden="true" strokeWidth={1.75} />
          {withLabels ? "Cancel" : null}
        </Button>
      ) : null}

      {canPay ? (
        <PaymentCard withLabels={withLabels} appointment={appointment} />
      ) : null}
    </div>
  );
}
