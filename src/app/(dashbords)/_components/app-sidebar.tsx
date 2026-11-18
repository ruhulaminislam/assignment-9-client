
"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { Briefcase, CalendarClock, ClipboardList, House, LayoutDashboard, LucideIcon, Receipt, UserRound, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
type Role = "user" | "admin"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const homeItem: MenuItem = { id: "home", name: "Home", url: "/", icon: House }

export const menuItemsByRole: Record<Role, MenuItem[]> = {
  user: [
    homeItem,
    { id: "overview", name: "Overview", url: "/dashboards/user/overview", icon: LayoutDashboard },
    { id: "appointments", name: "My Appointments", url: "/dashboards/user/myappointments", icon: CalendarClock },
    { id: "profile", name: "My Profile", url: "/dashboards/user/myprofile", icon: UserRound },
  ],
  admin: [
    homeItem,
    { id: "overview", name: "Overview", url: "/dashboards/admin/overview", icon: LayoutDashboard },
    { id: "services", name: "Manage Services", url: "/dashboards/admin/manageservices", icon: Briefcase },
    { id: "appointments", name: "Manage Appointments", url: "/dashboards/admin/manageappointments", icon: ClipboardList  },
    { id: "users", name: "Manage Users", url: "/dashboards/admin/manageusers", icon: Users   },
    { id: "transactions", name: "Transactions", url: "/dashboards/admin/transactions", icon: Receipt  },
    { id: "profile", name: "My Profile", url: "/dashboards/admin/myprofile", icon: UserRound },
  ],
}

export function AppSidebar() {
      const { data: session } = authClient.useSession()
  const pathname = usePathname()
  const role: Role = (session?.user?.role as Role) || "user"
  const projects = menuItemsByRole[role]
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
  {projects.map((project) => (
    <SidebarMenuItem key={project.name}>
      <SidebarMenuButton render={<Link href={project.url} />}
      isActive={pathname === project.url}
      >
        <project.icon />
        <span>{project.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}