
"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../ui/avatar'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'


const secondaryButtonClasses =
  "h-9 rounded-lg border-[#A58B73] bg-transparent px-3 text-xs font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#A58B73] hover:text-[#292824] focus-visible:border-[#A58B73] focus-visible:ring-[#292824]/40 sm:px-4 sm:text-sm lg:h-10 lg:px-5";

const primaryButtonClasses =
  "h-9 rounded-lg bg-[#292824] px-3 text-xs font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40 sm:px-4 sm:text-sm lg:h-10 lg:px-5";

 const Profile = () => {
    const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  console.log("navbar user",user);
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    })
    
  }
  if (isPending) {
  return <div className="h-9 w-24 animate-pulse rounded-lg bg-[#A58B73]/30" />

 
}
  
  return (
      <div >
          {user ? <>
            <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline"> <Avatar >
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar></Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
            <div onClick={handleLogout} > Log out</div>
         
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

          </>  : <> <div>
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
            </div> </>}
          </div>
  )
}
export default Profile