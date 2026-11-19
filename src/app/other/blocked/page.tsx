
import { Ban, Mail } from "lucide-react";
import Link from "next/link";

export default function Blocked() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EE] px-4">
      <div className="w-full max-w-md rounded-xl border border-[#D8C5B2] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Ban className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="mb-3 font-serif text-2xl font-bold text-[#292824]">
          Account Blocked
        </h1>

        <p className="mb-6 text-sm leading-6 text-[#625D56]">
          Your account has been temporarily blocked by the administrator.
          You cannot access your account or use our services at this moment.
          Please contact our support team for more information.
        </p>

        <a
          href="mailto:support@salonbook.com"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#292824] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#A58B73]"
        >
          <Mail className="h-4 w-4" />
          Contact Support
        </a>

        <Link
          href="/"
          className="text-sm font-medium text-[#A58B73] hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
