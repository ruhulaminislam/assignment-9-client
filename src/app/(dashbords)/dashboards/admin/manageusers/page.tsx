import { allusers, IUser } from "@/data/users";
import ManageUsersPage from "./manage-users-page";


export default async function Page() {
  const mockUsers: IUser[] = await allusers()
  return <ManageUsersPage mockUsers={mockUsers} />;
}
