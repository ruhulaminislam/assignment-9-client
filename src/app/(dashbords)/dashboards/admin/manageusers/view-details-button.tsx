import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type IUser } from "@/data/users";

export function ViewDetailsButton({
  user,
  onSelect,
  className = "",
}: {
  user: IUser;
  onSelect: (user: IUser) => void;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSelect(user)}
      className={`h-9 rounded-lg px-2.5 text-[#625D56] hover:bg-[#F7F3EE] hover:text-[#292824] focus-visible:ring-[#292824]/30 ${className}`}
    >
      <Eye aria-hidden="true" strokeWidth={1.75} />
      View
    </Button>
  );
}
