
import type { Service } from "@/data/services";

import EditServiceButton from "./EditServiceButton";
import ToggleServiceStatusButton from "./ToggleServiceStatusButton";
import DeleteServiceButton from "./DeleteServiceButton";

interface ServiceActionsProps {
  service: Service;
  withLabels?: boolean;
}

export default function ServiceActions({
  service,
  withLabels = false,
}: ServiceActionsProps) {
  const isActive = service.status === "active";

  const wrapperClasses = withLabels
    ? "flex flex-wrap items-center gap-1"
    : "flex items-center overflow-hidden rounded-lg border border-[#D8C5B2]/70 bg-white";

  const buttonClasses = withLabels
    ? "h-8 gap-1.5 rounded-lg border border-[#D8C5B2]/70 bg-white px-2 text-xs"
    : "size-8 rounded-none border-l-[#D8C5B2]/60 px-0 first:border-l-transparent";

  const focusClasses =
    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#292824]/40";

  const sharedClasses = `${buttonClasses} ${focusClasses}`;

  return (
    <div className={wrapperClasses}>
      <EditServiceButton
        service={service}
        className={sharedClasses}
        withLabels={withLabels}
      />

      <ToggleServiceStatusButton
        service={service}
        isActive={isActive}
        className={sharedClasses}
        withLabels={withLabels}
      />

      <DeleteServiceButton
        service={service}
        className={sharedClasses}
        withLabels={withLabels}
      />
    </div>
  );
}


