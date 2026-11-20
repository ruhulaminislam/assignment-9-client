import { AlertCircle } from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { getTransactionRows, type TransactionRow } from "./transactions-data";
import { TransactionsTable } from "./transactions-table";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default async function TransactionsPage() {
  let rows: TransactionRow[] | null = null;

  try {
    rows = await getTransactionRows();
  } catch {
    rows = null;
  }

  return (
    <div
      className={`${inter.className} min-h-svh bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div>
          <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
            Admin Dashboard
          </p>

          <h1
            className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
          >
            Admin Transactions
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
            Manage and monitor all payment transactions.
          </p>
        </div>

        {rows === null ? (
          <Alert className="mt-8 border-[#B94343]/30 bg-[#FBE9E7] px-4 py-3 text-[#B94343]">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Could not load transactions</AlertTitle>
            <AlertDescription className="text-[#B94343]/90">
              Payment records are temporarily unavailable. Please refresh the
              page to try again.
            </AlertDescription>
          </Alert>
        ) : (
          <section className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 shadow-[0_22px_50px_-40px_rgba(41,40,36,0.4)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8C5B2]/60 px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <h2
                  className={`${playfair.className} text-xl font-medium text-[#292824]`}
                >
                  Transaction Records
                </h2>
                <p className="mt-1 text-xs leading-5 text-[#625D56]">
                  A read-only record of payments received through Stripe.
                </p>
              </div>

              <span className="rounded-full bg-[#F7F3EE] px-3 py-1 text-xs font-medium text-[#625D56] ring-1 ring-[#D8C5B2]/60">
                {rows.length} {rows.length === 1 ? "transaction" : "transactions"}
              </span>
            </div>

            <TransactionsTable rows={rows} />
          </section>
        )}
      </div>
    </div>
  );
}
