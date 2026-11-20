import {
  CalendarClock,
  CalendarDays,
  CreditCard,
  ReceiptText,
  Scissors,
  type LucideIcon,
} from "lucide-react";

import { formatPrice } from "@/components/shared/HomePage/DynamicSection1/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Payment } from "@/data/transactions";

import type { TransactionRow } from "./transactions-data";

const headClasses =
  "h-12 px-3 py-2 text-[11px] leading-tight font-medium tracking-[0.14em] text-[#625D56] uppercase whitespace-normal align-bottom";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

function formatAppointmentDate(value: string) {
  return value ? dateFormatter.format(new Date(value)) : "—";
}

function TransactionDate({ value }: { value: string }) {
  const date = new Date(value);

  return (
    <>
      <span className="block">{dateFormatter.format(date)}</span>
      <span className="mt-0.5 block text-[10px] text-[#89847E]">
        {timeFormatter.format(date)}
      </span>
    </>
  );
}

function shortenSessionId(sessionId: string) {
  if (!sessionId) {
    return "—";
  }

  return sessionId.length > 20
    ? `${sessionId.slice(0, 12)}…${sessionId.slice(-4)}`
    : sessionId;
}

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

function CustomerIdentity({ row }: { row: TransactionRow }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F7F3EE] text-[11px] font-medium text-[#A58B73] ring-1 ring-[#D8C5B2]/60"
      >
        {getInitials(row.customerName)}
      </span>

      <div className="min-w-0 xl:max-w-[13rem]">
        <p className="truncate text-sm font-medium text-[#292824]">
          {row.customerName}
        </p>
        <p
          title={row.customerEmail || undefined}
          className="truncate text-xs text-[#625D56]"
        >
          {row.customerEmail || "—"}
        </p>
      </div>
    </div>
  );
}

function PaymentStatusBadge({ status }: { status: Payment["payment_status"] }) {
  const isPaid = status === "paid";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ring-1 ${
        isPaid
          ? "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20"
          : "bg-[#FBE9E7] text-[#B94343] ring-[#B94343]/20"
      }`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {isPaid ? "Paid" : "Failed"}
    </span>
  );
}

function Amount({ row }: { row: TransactionRow }) {
  if (row.amount === null) {
    return <span className="text-sm text-[#89847E]">—</span>;
  }

  return (
    <div>
      <p className="text-sm font-medium text-[#292824] tabular-nums">
        {formatPrice(row.amount)}
      </p>
      <p className="mt-0.5 text-[10px] tracking-[0.12em] text-[#89847E] uppercase">
        {row.currency}
      </p>
    </div>
  );
}

function SessionId({ sessionId }: { sessionId: string }) {
  return (
    <span
      title={sessionId || undefined}
      className="inline-block max-w-[10rem] truncate font-mono text-xs text-[#625D56]"
    >
      {shortenSessionId(sessionId)}
    </span>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
        {label}
      </dt>
      <dd className="mt-1 text-sm break-words text-[#292824]">{children}</dd>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#F7F3EE] text-[#A58B73] ring-1 ring-[#D8C5B2]/60"
      >
        <ReceiptText className="size-5" strokeWidth={1.5} />
      </span>
      <p className="mt-4 text-sm font-medium text-[#292824]">
        No transactions yet
      </p>
      <p className="mt-1 max-w-sm text-xs leading-5 text-[#625D56]">
        Completed Stripe payments will appear here once customers check out.
      </p>
    </div>
  );
}

export function TransactionsTable({ rows }: { rows: TransactionRow[] }) {
  if (rows.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="hidden xl:block">
        <Table className="min-w-[52rem]">
          <TableHeader>
            <TableRow className="border-[#D8C5B2]/60 hover:bg-transparent">
              <TableHead className={headClasses}>Customer</TableHead>
              <TableHead className={headClasses}>
                Service &amp; Appointment Date
              </TableHead>
              <TableHead className={headClasses}>Payment Amount</TableHead>
              <TableHead className={headClasses}>Stripe Session ID</TableHead>
              <TableHead className={headClasses}>Payment Status</TableHead>
              <TableHead className={headClasses}>Transaction Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-[#D8C5B2]/40 hover:bg-[#F7F3EE]/60"
              >
                <TableCell className="px-4 py-4">
                  <CustomerIdentity row={row} />
                </TableCell>

                <TableCell className="px-4 py-4">
                  <p className="text-sm font-medium text-[#292824]">
                    {row.serviceName || "—"}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#625D56]">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-3.5 text-[#A58B73]"
                      strokeWidth={1.75}
                    />
                    {row.appointmentDate
                      ? formatAppointmentDate(row.appointmentDate)
                      : "Appointment not linked"}
                  </p>
                </TableCell>

                <TableCell className="px-4 py-4">
                  <Amount row={row} />
                </TableCell>

                <TableCell className="px-4 py-4">
                  <SessionId sessionId={row.sessionId} />
                </TableCell>

                <TableCell className="px-4 py-4">
                  <PaymentStatusBadge status={row.paymentStatus} />
                </TableCell>

                <TableCell className="px-3 py-4 text-xs whitespace-nowrap text-[#625D56]">
                  <TransactionDate value={row.transactionDate} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="divide-y divide-[#D8C5B2]/50 xl:hidden">
        {rows.map((row) => (
          <li key={row.id} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <CustomerIdentity row={row} />
              <PaymentStatusBadge status={row.paymentStatus} />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              <Detail icon={Scissors} label="Service">
                {row.serviceName || "—"}
              </Detail>

              <Detail icon={CalendarDays} label="Appointment Date">
                {row.appointmentDate
                  ? formatAppointmentDate(row.appointmentDate)
                  : "—"}
              </Detail>

              <Detail icon={CreditCard} label="Payment Amount">
                <Amount row={row} />
              </Detail>

              <Detail icon={CalendarClock} label="Transaction Date">
                <TransactionDate value={row.transactionDate} />
              </Detail>
            </dl>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-[#F7F3EE] px-3 py-2 ring-1 ring-[#D8C5B2]/50">
              <span className="text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                Stripe Session
              </span>
              <SessionId sessionId={row.sessionId} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
