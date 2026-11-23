"use client";

import { useState } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import {
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  CircleAlert,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { appointmentApi } from "@/data/appiontmentapi";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Service } from "@/data/services";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const TIME_SLOTS = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 01:00 PM",
  "02:00 PM – 03:00 PM",
  "03:00 PM – 04:00 PM",
];

const labelClasses = "text-sm font-medium text-[#292824]";

const selectClasses =
  "h-12 w-full appearance-none rounded-lg border border-[#D8C5B2] bg-white pr-10 pl-4 text-base text-[#292824] transition-colors outline-none hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 aria-invalid:border-[#B94343] aria-invalid:ring-2 aria-invalid:ring-[#B94343]/20";

const textareaClasses =
  "min-h-24 rounded-lg border-[#D8C5B2] bg-white px-4 py-3 text-base leading-6 text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

// The API will receive the date as YYYY-MM-DD in the customer's local time.
function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function Appointment({ serviceId, service }: { serviceId: string,service:Service }) {
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const resetForm = () => {
    setDate(undefined);
    setTimeSlot("");
    setMessage("");
    setDateError(null);
    setSlotError(null);
    setDateOpen(false);
  };

  const { data: session } = authClient.useSession()
  const userId = session?.user?.id;
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDateError(date ? null : "Choose an appointment date.");
    setSlotError(timeSlot ? null : "Choose a time slot.");

    if (!date || !timeSlot) {
      return;
    }

    const preparedAppointment = {
      serviceId,
      appointmentDate: formatDateValue(date),
      timeSlot,
      message: message.trim(),
      customerId: userId,
      servicePrice: service?.price as number,
      serviceName: service?.serviceName as string,
      customerName: session?.user?.name as string,
      customerEmail: session?.user?.email as string,
      serviceCategory: service?.category as string,
      serviceImage: service?.image as string,
    };
   
    setIsPending(true);
    try {
      const response = await appointmentApi(preparedAppointment);
      if (response.insertedId) {
        setOpen(false);
        toast.add({
          title: "Appointment booked",
          description: "Your appointment has been booked successfully.",
        })
      } else {
        if (response.message) {
          toast.add({
            title: "Appointment booking failed",
            description: response.message,
          })
        } else {
          toast.add({
            title: "Appointment booking failed",
            description: "Your appointment booking failed. Please try again.",
          })
        }
        setOpen(false);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => {handleDialogChange(open); setOpen(open)}} open={open} >
      <DialogTrigger
        render={
          <Button
            type="button"
            className="mt-8 h-12 w-full rounded-lg bg-[#292824] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <CalendarPlus
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.75}
            />
            Book Appointment
          </Button>
        }
      />

      <DialogContent
        className={`${inter.className} max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D8C5B2]/70 bg-white p-5 text-[#292824] ring-0 shadow-[0_32px_80px_-40px_rgba(41,40,36,0.45)] sm:max-w-lg sm:p-6`}
      >
        <DialogHeader>
          <DialogTitle
            className={`${playfair.className} text-2xl leading-tight font-medium tracking-tight text-[#292824]`}
          >
            Book Appointment
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-[#625D56]">
            Choose a date and time for your visit. The salon will review your
            request before it is confirmed.
          </DialogDescription>
        </DialogHeader>

        <form noValidate onSubmit={handleSubmit} className="mt-1 space-y-5">
          <div className="space-y-2">
            <span id="appointment-date-label" className={labelClasses}>
              Appointment Date
            </span>

            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    aria-labelledby="appointment-date-label"
                    aria-invalid={Boolean(dateError)}
                    aria-describedby={
                      dateError ? "appointment-date-error" : undefined
                    }
                    className={`h-12 w-full justify-start gap-2.5 rounded-lg border-[#D8C5B2] bg-white px-4 text-base font-normal transition-colors hover:border-[#C4AC96] hover:bg-white focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 ${
                      date ? "text-[#292824]" : "text-[#8A8178]"
                    }`}
                  >
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#A58B73]"
                      strokeWidth={1.75}
                    />
                    <span className="truncate">
                      {date ? formatDateLabel(date) : "Select a date"}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="ml-auto size-4 shrink-0 text-[#A58B73]"
                      strokeWidth={1.75}
                    />
                  </Button>
                }
              />

              <PopoverContent
                align="start"
                className="w-auto rounded-xl border border-[#D8C5B2]/70 bg-white p-1 shadow-[0_20px_50px_-30px_rgba(41,40,36,0.45)]"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selected) => {
                    setDate(selected);
                    setDateError(null);
                    setDateOpen(false);
                  }}
                  disabled={{ before: startOfToday() }}
                  className="text-[#292824]"
                />
              </PopoverContent>
            </Popover>

            {dateError ? (
              <p
                id="appointment-date-error"
                role="alert"
                className="flex items-center gap-1.5 text-xs font-medium text-[#B94343]"
              >
                <CircleAlert
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                />
                {dateError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointment-time-slot" className={labelClasses}>
              Time Slot
            </Label>

            <div className="relative">
              <select
                id="appointment-time-slot"
                name="timeSlot"
                value={timeSlot}
                onChange={(event) => {
                  setTimeSlot(event.target.value);
                  setSlotError(null);
                }}
                aria-invalid={Boolean(slotError)}
                aria-describedby={
                  slotError ? "appointment-time-slot-error" : undefined
                }
                className={selectClasses}
              >
                <option value="" disabled>
                  Select a time slot
                </option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#A58B73]"
                strokeWidth={1.75}
              />
            </div>

            {slotError ? (
              <p
                id="appointment-time-slot-error"
                role="alert"
                className="flex items-center gap-1.5 text-xs font-medium text-[#B94343]"
              >
                <CircleAlert
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                />
                {slotError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointment-message" className={labelClasses}>
              Additional Message{" "}
              <span className="font-normal text-[#8A8178]">(optional)</span>
            </Label>

            <Textarea
              id="appointment-message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Share any preferences, allergies, or requests."
              className={textareaClasses}
            />
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-[#D8C5B2]/60 bg-[#F7F3EE] px-3.5 py-3">
            <Clock
              aria-hidden="true"
              className="mt-0.5 size-3.5 shrink-0 text-[#A58B73]"
              strokeWidth={1.75}
            />
            <p className="text-xs leading-5 text-[#625D56]">
              Appointment requests start as pending and are confirmed by the
              salon. You can track the status from your dashboard.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-[#D8C5B2]/60 pt-5 sm:flex-row sm:items-center sm:justify-end">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-lg border-[#D8C5B2] bg-white px-5 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE]"
                >
                  Cancel
                </Button>
              }
            />
            
<Button
               type="submit"
               disabled={isPending}
               className="h-11 gap-2 rounded-lg bg-[#292824] px-5 text-sm font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40 disabled:opacity-50 disabled:hover:bg-[#292824]"
             >
               {isPending ? (
                 <>
                   <svg
                     className="animate-spin h-4 w-4"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                   >
                     <circle
                       className="opacity-25"
                       cx="12"
                       cy="12"
                       r="10"
                       stroke="currentColor"
                       strokeWidth="4"
                     />
                     <path
                       className="opacity-75"
                       fill="currentColor"
                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                     />
                   </svg>
                   Creating Appointment...
                 </>
               ) : (
                 <>
                   <CalendarCheck aria-hidden="true" strokeWidth={1.75} />
                   Submit Booking
                 </>
               )}
             </Button>
           
            
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
