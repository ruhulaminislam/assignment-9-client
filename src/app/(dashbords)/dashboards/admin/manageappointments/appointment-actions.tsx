import { Check, Eye, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IAppointment } from "@/data/appiontmentapi";


interface AppointmentActionsProps {
  appointment: IAppointment;
  onView: (appointment: IAppointment) => void;
  onConfirm: (appointment: IAppointment) => void;
  onCancel: (appointment: IAppointment) => void;
  withLabels?: boolean;
}

export function AppointmentActions({
  appointment,
  onView,
  onConfirm,
  onCancel,
  withLabels = false,
}: AppointmentActionsProps) {
  const isPending = appointment.status === "pending";
  const isConfirmed = appointment.status === "confirmed";
  const canCancel = isPending || isConfirmed;

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
        aria-label={`View appointment for ${appointment.customerName}`}
        title="View appointment details"
        onClick={() => onView(appointment)}
        className={`${sharedClasses} text-[#625D56] hover:bg-[#F7F3EE] hover:text-[#292824]`}
      >
        <Eye aria-hidden="true" strokeWidth={1.75} />
        {withLabels ? "View" : null}
      </Button>

      {isPending ? (
        <Button
          type="button"
          variant="ghost"
          aria-label={`Confirm appointment for ${appointment.customerName}`}
          title="Confirm appointment"
          onClick={() => onConfirm(appointment)}
          className={`${sharedClasses} text-[#287A55] hover:bg-[#E6F3EA] hover:text-[#287A55]`}
        >
          <Check aria-hidden="true" strokeWidth={1.75} />
          {withLabels ? "Confirm" : null}
        </Button>
      ) : null}

      {canCancel ? (
        <Button
          type="button"
          variant="ghost"
          aria-label={`Cancel appointment for ${appointment.customerName}`}
          title="Cancel appointment"
          onClick={() => onCancel(appointment)}
          className={`${sharedClasses} text-[#B94343] hover:bg-[#FBE9E7] hover:text-[#B94343]`}
        >
          <X aria-hidden="true" strokeWidth={1.75} />
          {withLabels ? "Cancel" : null}
        </Button>
      ) : null}
    </div>
  );
}
