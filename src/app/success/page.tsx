
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  Check,
  CheckCircle2,
  CalendarDays,
  Clock,
  CreditCard,
  Mail,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react"

import { transactions } from "@/data/transactions"
import { stripe } from "@/lib/stripe"

type SuccessProps = {
  searchParams: Promise<{
    session_id?: string
  }>
}

const formatMoney = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default async function Success({
  searchParams,
}: SuccessProps) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error("Please provide a valid session_id")
  }

  const session = await stripe.checkout.sessions.retrieve(
    session_id,
    {
      expand: ["line_items", "payment_intent"],
    },
  )

  if (session.status === "open") {
    redirect("/")
  }

  if (
    session.status !== "complete" ||
    session.payment_status !== "paid"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F3EE] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#EAE2D8] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[#292824]">
            Payment not completed
          </h1>
          <p className="mt-3 text-sm text-[#77716A]">
            We could not confirm your payment. Please check your
            appointment before trying again.
          </p>
          <Link
            href="/dashboards/customer/my-appointments"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-[#292824] px-6 text-sm font-medium text-white transition hover:bg-[#A58B73]"
          >
            View My Appointments
          </Link>
        </div>
      </main>
    )
  }

  // Save transaction in your Express backend
  let transactionSaved = false

  try {
    await transactions(session_id)
    transactionSaved = true
  } catch (error) {
    console.error("Transaction save failed:", error)
  }

  const serviceName =
    session.line_items?.data?.[0]?.description || "Salon Service"

  const customerEmail =
    session.customer_details?.email ||
    session.customer_email ||
    "Not available"

  const appointmentId =
    session.metadata?.appointmentId || "Not available"

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || "Not available"

  const totalAmount = session.amount_total || 0
  const currency = session.currency || "usd"

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">

        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-[#A58B73]">
            <Sparkles className="size-4" />
            SALONBOOK
          </div>
        </div>

        {/* Main Confirmation Card */}
        <div className="overflow-hidden rounded-3xl border border-[#E6DCCE] bg-white shadow-[0_20px_70px_rgba(41,40,36,0.08)]">

          {/* Success Header */}
          <div className="relative overflow-hidden bg-[#292824] px-6 py-12 text-center text-white sm:px-10 sm:py-14">
            <div className="absolute -right-16 -top-20 size-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-28 -left-20 size-72 rounded-full border border-white/10" />

            <div className="relative mx-auto flex size-20 items-center justify-center rounded-full border border-[#D8C5B2]/40 bg-[#D8C5B2]/15">
              <Check className="size-10 text-[#E5C9A9]" strokeWidth={2.5} />
            </div>

            <div className="relative mt-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-200">
                <CheckCircle2 className="size-3.5" />
                PAYMENT CONFIRMED
              </span>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Payment Successful!
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65 sm:text-base">
                Thank you for choosing SalonBook. Your payment has
                been received successfully.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-9">

            {/* Amount */}
            <div className="rounded-2xl border border-[#EAE2D8] bg-[#FAF8F5] px-5 py-7 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#89847E]">
                Total Amount Paid
              </p>

              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#292824] sm:text-5xl">
                {formatMoney(totalAmount, currency)}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="size-3.5" />
                Paid Successfully
              </div>
            </div>

            {/* Service Details */}
            <div className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <ReceiptText className="size-5 text-[#A58B73]" />
                <h2 className="text-base font-semibold text-[#292824]">
                  Booking Details
                </h2>
              </div>

              <div className="rounded-2xl border border-[#EAE6E1]">
                <div className="flex items-center justify-between gap-4 border-b border-[#EAE6E1] p-4 sm:p-5">
                  <div>
                    <p className="text-xs text-[#89847E]">
                      Service
                    </p>
                    <p className="mt-1 font-semibold text-[#292824]">
                      {serviceName}
                    </p>
                  </div>
                  <Sparkles className="size-5 shrink-0 text-[#A58B73]" />
                </div>

                <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
                  <div>
                    <p className="text-xs text-[#89847E]">
                      Appointment ID
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-[#292824]">
                      {appointmentId}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#89847E]">
                      Customer Email
                    </p>
                    <p className="mt-1 flex items-center gap-2 break-all text-sm font-medium text-[#292824]">
                      <Mail className="size-4 shrink-0 text-[#A58B73]" />
                      {customerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="size-5 text-[#A58B73]" />
                <h2 className="text-base font-semibold text-[#292824]">
                  Transaction Details
                </h2>
              </div>

              <div className="space-y-4 rounded-2xl border border-[#EAE6E1] p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[#89847E]">
                    Transaction ID
                  </span>
                  <span className="max-w-[65%] break-all text-right text-sm font-medium text-[#292824]">
                    {paymentIntent}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[#89847E]">
                    Checkout Session
                  </span>
                  <span className="max-w-[65%] break-all text-right text-sm font-medium text-[#292824]">
                    {session.id}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#89847E]">
                    Payment Date
                  </span>
                  <span className="text-right text-sm font-medium text-[#292824]">
                    {formatDate(session.created)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#89847E]">
                    Currency
                  </span>
                  <span className="text-sm font-medium uppercase text-[#292824]">
                    {currency}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[#EAE6E1] pt-4">
                  <span className="text-sm text-[#89847E]">
                    Payment Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="size-4" />
                    Paid
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction Save Notice */}
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#F7F3EE] p-4">
              {transactionSaved ? (
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" />
              ) : (
                <Clock className="mt-0.5 size-5 shrink-0 text-[#A58B73]" />
              )}

              <p className="text-xs leading-5 text-[#625D56]">
                {transactionSaved
                  ? "Your transaction has been recorded. You can view your appointment details in your dashboard."
                  : "Your payment is confirmed by Stripe, but transaction recording is still pending. Please contact support if your appointment is not updated."}
              </p>
            </div>

            {/* Action */}
            <div className="mt-8">
              <Link
                href="/dashboards/user/myappointments"
                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#292824] px-5 text-sm font-semibold text-white transition duration-200 hover:bg-[#A58B73]"
              >
                View My Appointments
                <ArrowRight className="size-4" />
              </Link>

              <p className="mt-4 text-center text-xs text-[#89847E]">
                Thank you for trusting SalonBook with your experience.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-xs tracking-wide text-[#89847E]">
          SECURE PAYMENT · SALONBOOK
        </p>
      </div>
    </main>
  )
}
