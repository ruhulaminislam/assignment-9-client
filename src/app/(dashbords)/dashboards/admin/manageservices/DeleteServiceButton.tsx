"use client";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteService, type Service } from "@/data/services";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

interface DeleteServiceButtonProps {
  service: Service;
  className?: string;
  withLabels?: boolean;
}

export default  function DeleteServiceButton({
  service,
  className,
  withLabels = false,
}: DeleteServiceButtonProps) {
   
    const router = useRouter();
    const handleDelete = async () => {
    const response = await deleteService(service?._id);
   
    router.refresh();
    if(response.deletedCount > 0) {
      toast.add({
        title: "Service deleted",
        description: "The service has been deleted successfully",
      });
    } else {
      toast.add({
        title: "Service delete failed",
        description: "The service could not be deleted",
      });
    }
    };
  return (
    <Button
      type="button"
      onClick={handleDelete}
      variant="ghost"
      aria-label={`Delete ${service?.serviceName}`}
      title="Delete service"
      className={`${className} text-[#625D56] hover:bg-[#FBE9E7] hover:text-[#B94343]`}
    >
      <Trash2 aria-hidden="true" strokeWidth={1.75} />
      {withLabels ? "Delete" : null}
    </Button>
  );
}
