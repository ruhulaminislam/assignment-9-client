"use client"

import { useState } from "react"
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { IAppointment } from "@/data/appiontmentapi"

type PaymentCardProps = {
  appointment: IAppointment
  canceled?: boolean
  withLabels?: boolean
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

const formatDate = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

export default function PaymentCard({
  appointment,
  canceled,
  withLabels,
}: PaymentCardProps) {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [error, setError] = useState("")

  const isPaid = appointment.paymentStatus === "paid"
  const isCancelled = appointment.status === "cancelled"

  const handlePayment = async () => {
    try {
      setIsRedirecting(true)
      setError("")

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId: appointment._id,
          serviceName: appointment.serviceName,
          servicePrice: appointment.servicePrice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout")
      }

      if (!data.url) {
        throw new Error("Checkout URL was not returned")
      }

      window.location.href = data.url
    } catch (error) {
      console.error("Payment error:", error)
      setError(
        error instanceof Error ? error.message : "Something went wrong",
      )
      setIsRedirecting(false)
    }
  }

  // Payment already completed
  if (isPaid) {
    return (
      <span className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-50 px-3 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
        Paid
      </span>
    )
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            disabled={isCancelled}
            className={`rounded-lg bg-[#292824] font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40 ${
              withLabels ? "h-9 px-3.5 text-xs" : "h-8 px-3 text-xs"
            }`}
          >
            Pay Now
          </Button>
        }
      />

      <DialogContent className="gap-0 overflow-hidden border-[#D8C5B2]/60 bg-white p-0 sm:max-w-md">
        <DialogHeader className="border-b border-[#EAE6E1] bg-[#F7F3EE] px-6 py-5 text-left">
          <DialogTitle className="text-xl font-semibold text-[#292824]">
            Complete your payment
          </DialogTitle>

          <DialogDescription className="text-sm text-[#625D56]">
            Review your booking, then continue to secure checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          {canceled && (
            <div
              role="status"
              className="rounded-lg border border-[#D8C5B2] bg-[#F7F3EE] px-4 py-3 text-sm text-[#625D56]"
            >
              Your last checkout was cancelled. You can try again whenever
              you&apos;re ready.
            </div>
          )}

          <div>
            <p className="text-base font-semibold text-[#292824]">
              {appointment.serviceName}
            </p>

            <dl className="mt-3 space-y-2 text-sm text-[#625D56]">
              <div className="flex items-center gap-2.5">
                <User className="size-4 text-[#A58B73]" aria-hidden="true" />
                <dt className="sr-only">Customer</dt>
                <dd>{appointment.customerName}</dd>
              </div>

              <div className="flex items-center gap-2.5">
                <CalendarDays
                  className="size-4 text-[#A58B73]"
                  aria-hidden="true"
                />
                <dt className="sr-only">Date</dt>
                <dd>{formatDate(appointment.appointmentDate)}</dd>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="size-4 text-[#A58B73]" aria-hidden="true" />
                <dt className="sr-only">Time</dt>
                <dd>{appointment.timeSlot}</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="border-t border-dashed border-[#D8C5B2]" />
            <span className="absolute -left-9 -top-2.5 size-5 rounded-full bg-[#F7F3EE]" />
            <span className="absolute -right-9 -top-2.5 size-5 rounded-full bg-[#F7F3EE]" />
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#625D56]">Service price</span>
              <span className="text-[#292824]">
                {formatPrice(appointment.servicePrice)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#625D56]">Payment status</span>
              <span className="rounded-full bg-[#FFF2D8] px-2.5 py-0.5 text-xs font-medium text-[#956515]">
                Awaiting payment
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-[#EAE6E1] pt-3">
              <span className="font-medium text-[#292824]">Total</span>
              <span className="text-2xl font-semibold text-[#292824]">
                {formatPrice(appointment.servicePrice)}
              </span>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="flex-col gap-3 border-t border-[#EAE6E1] bg-[#F7F3EE]/60 px-6 py-5 sm:flex-col">
          <Button
            type="button"
            onClick={handlePayment}
            disabled={isRedirecting}
            className="h-12 w-full rounded-xl bg-[#292824] text-sm font-semibold text-white hover:bg-[#A58B73] focus-visible:ring-[#A58B73]/50"
          >
            {isRedirecting ? (
              <>
                <Loader2
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                Redirecting to checkout…
              </>
            ) : (
              <>Pay {formatPrice(appointment.servicePrice)}</>
            )}
          </Button>

          <DialogClose
            render={
              <Button
                type="button"
                variant="ghost"
                className="h-9 w-full text-[#625D56]"
              >
                Not now
              </Button>
            }
          />

          <p className="flex items-center justify-center gap-1.5 text-xs text-[#89847E]">
            <Lock className="size-3.5" aria-hidden="true" />
            Payments are processed securely by Stripe.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}