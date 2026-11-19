type IndexPageProps = {
  searchParams: Promise<{
    canceled?: string;
  }>;
};

export default async function PaymentCard({
  searchParams,
}: IndexPageProps) {
  const { canceled } = await searchParams;

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-4 py-12 sm:py-20 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#A58B73]">
            SalonBook
          </span>

          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-[#292824]">
            Complete Your Payment
          </h1>

          <p className="mt-3 text-[#625D56] text-sm sm:text-base">
            You're one step closer to your salon experience.
          </p>
        </div>

        {/* Cancel Notification */}
        {canceled && (
          <div className="mb-5 rounded-xl border border-[#D8C5B2] bg-white px-4 py-3 text-sm text-[#625D56]">
            Your checkout was cancelled. You can continue whenever you're ready.
          </div>
        )}

        {/* Payment Card */}
        <div className="overflow-hidden rounded-2xl border border-[#D8C5B2]/60 bg-white shadow-[0_12px_45px_rgba(41,40,36,0.08)]">
          {/* Card Header */}
          <div className="border-b border-[#EAE6E1] px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#292824]">
                  Payment Summary
                </h2>
                <p className="mt-1 text-sm text-[#89847E]">
                  Review your booking before checkout
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F3EE] text-[#A58B73]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="5" width="20" height="14" rx="3" />
                  <path d="M2 10h20" />
                </svg>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="px-6 py-7 sm:px-8">
            <div className="rounded-xl bg-[#F7F3EE] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#A58B73]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v18" />
                    <path d="M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
                  </svg>
                </div>

                <div>
                  <p className="font-semibold text-[#292824]">
                    Appointment Payment
                  </p>
                  <p className="mt-0.5 text-xs text-[#89847E]">
                    Secure online checkout
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Information */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#625D56]">Amount</span>
                <span className="font-semibold text-[#292824]">$100</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#625D56]">Payment method</span>
                <span className="font-medium text-[#292824]">
                  Secure Checkout
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#625D56]">Payment status</span>
                <span className="rounded-full bg-[#FFF2D8] px-3 py-1 text-xs font-medium text-[#956515]">
                  Awaiting Payment
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-dashed border-[#D8C5B2]" />

            {/* Checkout Button */}
            <form action="/api/checkout_sessions" method="POST">
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#292824] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#A58B73] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A58B73] focus:ring-offset-2 active:scale-[0.99]"
              >
                Continue to Checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#89847E]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Your checkout is securely processed.
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#89847E]">
          © {new Date().getFullYear()} SalonBook. All rights reserved.
        </p>
      </div>
    </main>
  );
}