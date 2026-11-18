"use client";

import { useState } from "react";
import { Ban, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isBlockeds, type IUser } from "@/data/users";
import { toast } from "@/components/ui/toast";

export function AccessButton({
  user,
  className = "",
  compact = false,
}: {
  user: IUser;
  className?: string;
  compact?: boolean;
}) {
  const [isBlocked, setIsBlocked] = useState(user.isBlocked);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    const newValue = !isBlocked;
    setIsLoading(true);

    try {
      const response = await isBlockeds(user._id, newValue);
      console.log(response.modifiedCount);
      if(response.modifiedCount > 0) {
        setIsBlocked(newValue);
        toast.add({
          title: "User updated",
          description: "User has been updated successfully",
        });

      }else{
        toast.add({
          title: "User update failed",
          description: "User update failed",
        });
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isBlocked) {
    return (
      <Button
        onClick={handleToggle}
        disabled={isLoading}
        type="button"
        variant="outline"
        className={`h-9 rounded-lg border-[#D8C5B2] bg-white px-2.5 text-[#625D56] hover:border-[#287A55]/40 hover:bg-[#E6F3EA] hover:text-[#287A55] focus-visible:ring-[#287A55]/30 ${className}`}
      >
        <ShieldCheck aria-hidden="true" strokeWidth={1.75} />
        {compact ? "Unblock" : "Unblock User"}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isLoading}
      type="button"
      variant="outline"
      className={`h-9 rounded-lg border-[#D8C5B2] bg-white px-2.5 text-[#625D56] hover:border-[#B94343]/40 hover:bg-[#FBE9E7] hover:text-[#B94343] focus-visible:ring-[#B94343]/30 ${className}`}
    >
      <Ban aria-hidden="true" strokeWidth={1.75} />
      {compact ? "Block" : "Block User"}
    </Button>
  );
}