
import React from "react";
import Link from "next/link";
import { XCircle, RefreshCw, Home, ShieldCheck } from "lucide-react";

const Cancel = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg shadow-gray-200/60 border border-gray-100">

        {/* Cancel Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <XCircle className="h-12 w-12 text-red-500" />
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          Payment Cancelled!
        </h1>

        <p className="mb-6 text-sm leading-6 text-gray-500">
          Your payment was not completed. No charges have been made
          through this checkout attempt. You can try again whenever
          you're ready.
        </p>

        {/* Info */}
        <div className="mb-7 rounded-xl bg-gray-50 p-4 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
            <p className="text-sm text-gray-600">
              Your booking information is safe. You can return and
              complete your payment anytime.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <RefreshCw size={18} />
            Try Payment Again
          </Link>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        <p className="mt-7 text-xs text-gray-400">
          Need help? Please contact our support team.
        </p>
      </div>
    </main>
  );
};

export default Cancel;
