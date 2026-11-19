"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { toggleServiceStatus, type Service, type ServiceStatus } from "@/data/services";

interface ToggleServiceStatusButtonProps {
  service: Service; // ✅ serviceName নয়, পুরো service
  className?: string;
  withLabels?: boolean;
}

export default function ToggleServiceStatusButton({
  service,
  className = "",
  withLabels = false,
}: ToggleServiceStatusButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false); // ✅ pending

  const isActive = service.status === "active"; // ✅ prop নয়, service থেকেই

  const handleToggle = async () => {
    const nextStatus: ServiceStatus = isActive ? "inactive" : "active"; // ✅ নতুন মান আগে হিসাব

    setIsPending(true);
    try {
      const toggle = await toggleServiceStatus(service._id, nextStatus); // ✅ সঠিক মান যাচ্ছে

      if (toggle?.matchedCount > 0) {
        router.refresh();
        toast.add({
          title: "Service status updated",
          description: "Service status has been updated successfully",
        });
      } else {
        toast.add({
          title: "Service status update failed",
          description: "Service status update failed",
        });
      }
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.add({
        title: "Service status update failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsPending(false); // ✅ সফল বা ব্যর্থ, দুই ক্ষেত্রেই pending বন্ধ
    }
  };

  const label = isActive ? "Deactivate" : "Activate";

  return (
    <Button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      variant="ghost"
      aria-label={`${label} ${service.serviceName}`}
      title={`${label} service`}
      className={`${className} text-[#625D56] ${
        isActive
          ? "hover:bg-[#FBE9E7] hover:text-[#B94343]"
          : "hover:bg-[#E6F3EA] hover:text-[#287A55]"
      }`}
    >
      {isPending ? (
        <Loader2 aria-hidden="true" className="animate-spin" />
      ) : isActive ? (
        <Ban aria-hidden="true" strokeWidth={1.75} />
      ) : (
        <ShieldCheck aria-hidden="true" strokeWidth={1.75} />
      )}

      {withLabels ? (isPending ? "Updating..." : label) : null}
    </Button>
  );
}