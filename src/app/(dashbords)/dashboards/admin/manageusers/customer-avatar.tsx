import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type IUser } from "@/data/users";
import { getInitials } from "./user-helpers";


export function CustomerAvatar({ user }: { user: IUser }) {
  return (
    <Avatar className="size-10 ring-1 ring-[#D8C5B2]/60">
      <AvatarImage src={user.image} alt="" />
      <AvatarFallback className="bg-[#F7F3EE] text-xs font-medium text-[#A58B73]">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}
