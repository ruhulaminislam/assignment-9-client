"use client";

import { useState } from "react";
import { UserCheck, Users, UserX, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allusers, type IUser } from "@/data/users";


import { AccessButton } from "./access-button";
import { CustomerAvatar } from "./customer-avatar";
import { StatusBadge } from "./status-badge";
import { ViewDetailsButton } from "./view-details-button";
import { inter, playfair } from "./fonts";
import { formatDate } from "./user-helpers";

/**
 * Placeholder customer data that follows the existing `IUser` structure.
 * It can be replaced with API data later without changing the UI.
 */

const mockUsers: IUser[] = await allusers()

// Admin accounts are never counted as customers.
const customers = mockUsers.filter((user) => user.role !== "admin");

const stats: {
  id: string;
  label: string;
  caption: string;
  value: number;
  icon: LucideIcon;
  iconClasses: string;
}[] = [
  {
    id: "total",
    label: "Total Registered Customers",
    caption: "All customer accounts",
    value: customers.length,
    icon: Users,
    iconClasses: "bg-[#F7F3EE] text-[#A58B73] ring-[#D8C5B2]/60",
  },
  {
    id: "active",
    label: "Active Customers",
    caption: "Full access to SalonBook",
    value: customers.filter((user) => !user.isBlocked).length,
    icon: UserCheck,
    iconClasses: "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20",
  },
  {
    id: "blocked",
    label: "Blocked Customers",
    caption: "Access currently restricted",
    value: customers.filter((user) => user.isBlocked).length,
    icon: UserX,
    iconClasses: "bg-[#FBE9E7] text-[#B94343] ring-[#B94343]/20",
  },
];

export const ManageUsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  return (
    <div className={`${inter.className} bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
          Admin Dashboard
        </p>

        <h1
          className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
        >
          Manage Users
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
          Review registered customers, check their account access, and open a
          profile whenever you need more detail.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm leading-6 font-medium text-[#625D56]">
                    {stat.label}
                  </p>

                  <span
                    aria-hidden="true"
                    className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${stat.iconClasses}`}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                </div>

                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#292824] tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[#625D56]">{stat.caption}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 shadow-[0_22px_50px_-40px_rgba(41,40,36,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8C5B2]/60 px-5 py-4 sm:px-6 sm:py-5">
            <div>
              <h2
                className={`${playfair.className} text-xl font-medium text-[#292824]`}
              >
                Registered Customers
              </h2>
              <p className="mt-1 text-xs leading-5 text-[#625D56]">
                Customer accounts only — admin accounts are excluded.
              </p>
            </div>

            <span className="rounded-full bg-[#F7F3EE] px-3 py-1 text-xs font-medium text-[#625D56] ring-1 ring-[#D8C5B2]/60">
              {customers.length} customers
            </span>
          </div>

          <div className="hidden xl:block">
            <Table>
              <TableHeader>
                <TableRow className="border-[#D8C5B2]/60 hover:bg-transparent">
                  <TableHead className="h-11 px-5 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                    Customer
                  </TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                    Role
                  </TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                    Status
                  </TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                    Registered
                  </TableHead>
                  <TableHead className="h-11 px-5 text-right text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {customers.map((user) => (
                  <TableRow
                    key={user._id}
                    className="border-[#D8C5B2]/40 hover:bg-[#F7F3EE]/60"
                  >
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <CustomerAvatar user={user} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#292824]">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-[#625D56]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <Badge
                        variant="outline"
                        className="h-6 rounded-full border-[#D8C5B2]/70 bg-[#F7F3EE] px-2.5 text-[11px] font-medium text-[#625D56]"
                      >
                        Customer
                      </Badge>
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <StatusBadge isBlocked={user.isBlocked} />
                    </TableCell>

                    <TableCell className="px-5 py-4 text-sm whitespace-nowrap text-[#625D56]">
                      {formatDate(user.createdAt)}
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <ViewDetailsButton
                          user={user}
                          onSelect={setSelectedUser}
                        />
                        <AccessButton user={user} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <ul className="divide-y divide-[#D8C5B2]/50 xl:hidden">
            {customers.map((user) => (
              <li key={user._id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <CustomerAvatar user={user} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#292824]">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-[#625D56]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <StatusBadge isBlocked={user.isBlocked} />
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <dl className="grid grid-cols-2 gap-3 text-sm sm:flex sm:gap-10">
                    <div>
                      <dt className="text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        Role
                      </dt>
                      <dd className="mt-1 text-[#292824]">Customer</dd>
                    </div>

                    <div>
                      <dt className="text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        Registered
                      </dt>
                      <dd className="mt-1 text-[#292824]">
                        {formatDate(user.createdAt)}
                      </dd>
                    </div>
                  </dl>

                  <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:items-center">
                    <ViewDetailsButton
                      user={user}
                      onSelect={setSelectedUser}
                      className="w-full border border-[#D8C5B2]/80 bg-white sm:w-auto"
                    />
                    <AccessButton
                      user={user}
                      compact
                      className="w-full sm:w-auto"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog
        open={selectedUser !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
          }
        }}
      >
        <DialogContent className="rounded-2xl border border-[#D8C5B2]/70 bg-white p-6 text-[#292824] ring-0 sm:max-w-md">
          {selectedUser ? (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3 pr-8">
                  <CustomerAvatar user={selectedUser} />

                  <div className="min-w-0">
                    <DialogTitle
                      className={`${playfair.className} text-xl leading-snug font-medium text-[#292824]`}
                    >
                      {selectedUser.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1 truncate text-xs text-[#625D56]">
                      {selectedUser.email}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge isBlocked={selectedUser.isBlocked} />
                <Badge
                  variant="outline"
                  className="h-6 rounded-full border-[#D8C5B2]/70 bg-[#F7F3EE] px-2.5 text-[11px] font-medium text-[#625D56]"
                >
                  Customer
                </Badge>
              </div>

              <dl className="divide-y divide-[#D8C5B2]/50 rounded-xl bg-[#F7F3EE] px-4 ring-1 ring-[#D8C5B2]/50">
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-xs text-[#625D56]">Customer ID</dt>
                  <dd className="text-right text-sm font-medium text-[#292824]">
                    {selectedUser._id}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-xs text-[#625D56]">Registered</dt>
                  <dd className="text-right text-sm font-medium text-[#292824]">
                    {formatDate(selectedUser.createdAt)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-xs text-[#625D56]">Last Updated</dt>
                  <dd className="text-right text-sm font-medium text-[#292824]">
                    {formatDate(selectedUser.updatedAt)}
                  </dd>
                </div>
              </dl>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsersPage;
