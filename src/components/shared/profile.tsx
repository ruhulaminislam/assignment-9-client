"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

const secondaryButtonClasses =
  "h-9 rounded-lg border-[#A58B73] bg-transparent px-3 text-xs font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#A58B73] hover:text-[#292824] focus-visible:border-[#A58B73] focus-visible:ring-[#292824]/40 sm:px-4 sm:text-sm lg:h-10 lg:px-5";

const primaryButtonClasses =
  "h-9 rounded-lg bg-[#292824] px-3 text-xs font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40 sm:px-4 sm:text-sm lg:h-10 lg:px-5";

const menuItemClasses =
  "gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium text-[#292824] focus:bg-[#F7F3EE] focus:text-[#292824] data-highlighted:bg-[#F7F3EE] data-highlighted:text-[#292824] [&_svg]:size-4 [&_svg]:text-[#A58B73]";

const logoutItemClasses =
  "gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium text-[#B94343] focus:bg-[#FBE9E7] focus:text-[#B94343] data-highlighted:bg-[#FBE9E7] data-highlighted:text-[#B94343] [&_svg]:size-4 [&_svg]:text-[#B94343]";

const Profile = () => {
  const router = useRouter();
  const { data: userData, isPending,refetch } = authClient.useSession();
  //desiblecatch true
   useEffect(() => {
  const handleProfileUpdate = async () => {
    // আগে Cookie Cache bypass করে নতুন Session আনবে
    await authClient.getSession({
      query: {
        disableCookieCache: true,
      },
    });

    // এরপর Navbar-এর Session Hook refresh করবে
    await refetch();
  };

  window.addEventListener("profile-updated", handleProfileUpdate);

  return () => {
    window.removeEventListener("profile-updated", handleProfileUpdate);
  };
}, [refetch]);
  const user = userData?.user;
  console.log("User image:", user?.image);

  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SB";

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-[#A58B73]/30" />;
  }

  return (
    <div>
      {user ? (
        <DropdownMenu>
         <DropdownMenuTrigger
  className="inline-flex h-auto cursor-pointer items-center gap-1 rounded-full p-1 hover:bg-[#A58B73]/15"
  aria-label="Open profile menu"
>
  <ChevronDown className="size-4 text-[#625D56]" aria-hidden="true" />

  <Avatar>
    {user?.image ? (
      <AvatarImage
        src={user.image}
        alt=""
        referrerPolicy="no-referrer"
      />
    ) : null}

    <AvatarFallback className="bg-[#F7F3EE] text-xs font-medium text-[#A58B73]">
      {initials}
    </AvatarFallback>

    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
  </Avatar>
</DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#D8C5B2]/70 bg-white p-1.5 text-[#292824] shadow-[0_24px_60px_-30px_rgba(41,40,36,0.45)]"
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar  className="size-12">
                {user?.image ? <AvatarImage src={user?.image} alt="" referrerPolicy="no-referrer" /> : null}
                <AvatarFallback className="bg-[#F7F3EE] text-sm font-medium text-[#A58B73]">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
  <p className="truncate text-base font-semibold text-[#292824]">
    {user?.name}
  </p>
  <p className="truncate text-sm text-[#625D56]">
    {user?.email}
  </p>
  {user?.role ? (
    <span className="mt-1.5 inline-block rounded-full bg-[#A58B73]/15 px-2.5 py-0.5 text-xs font-medium capitalize text-[#7A634D]">
      {user?.role}
    </span>
  ) : null}
</div>
            </div>

            <DropdownMenuSeparator className="my-1.5 bg-[#D8C5B2]/60" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                render={<Link href={`/dashboards/${user?.role}/myprofile`} />}
                className={menuItemClasses}
              >
                <UserRound aria-hidden="true" strokeWidth={1.75} />
                My Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                render={<Link href={`/dashboards/${user?.role}/overview`} />}
                className={menuItemClasses}
              >
                <LayoutDashboard aria-hidden="true" strokeWidth={1.75} />
                Dashboard
              </DropdownMenuItem>

           
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1.5 bg-[#D8C5B2]/60" />

            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className={logoutItemClasses}
            >
              <LogOut aria-hidden="true" strokeWidth={1.75} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          <Button
            render={<Link href="/sign-in" />}
            variant="outline"
            className={secondaryButtonClasses}
          >
            Sign In
          </Button>
          <Button
            render={<Link href="/sign-up" />}
            className={primaryButtonClasses}
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
