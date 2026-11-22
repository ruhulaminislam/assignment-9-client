import { Skeleton } from "@/components/ui/skeleton";

export default function MyProfileLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading profile"
      className="min-h-svh bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div aria-hidden="true">
          <Skeleton className="h-3 w-40 bg-[#EFE7DD]" />
          <Skeleton className="mt-3 h-9 w-60 max-w-full bg-[#EFE7DD] sm:h-10" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl bg-[#EFE7DD]" />
          <Skeleton className="mt-4 h-10 w-32 rounded-lg bg-[#EFE7DD]" />
        </div>

        <div className="mt-8 grid items-start gap-5 xl:grid-cols-[18rem_minmax(0,1fr)]">
          {/* Profile sidebar */}
          <div
            aria-hidden="true"
            className="min-w-0 rounded-2xl bg-white p-6 text-center ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)]"
          >
            <Skeleton className="mx-auto size-24 rounded-full bg-[#EFE7DD] ring-1 ring-[#D8C5B2]/60" />
            <Skeleton className="mt-5 h-6 w-48 bg-[#EFE7DD]" />
            <Skeleton className="mt-1 h-3 w-56 bg-[#EFE7DD]" />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Skeleton className="h-5 w-24 rounded-full bg-[#EFE7DD]" />
              <Skeleton className="h-5 w-20 rounded-full bg-[#EFE7DD]" />
            </div>
            <Skeleton className="mt-5 h-3 w-3/4 bg-[#EFE7DD]" />
          </div>

          {/* Account information section */}
          <div
            aria-hidden="true"
            className="min-w-0 rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-6 w-40 bg-[#EFE7DD]" />
              <Skeleton className="h-6 w-28 rounded-full bg-[#EFE7DD]" />
            </div>

            <Skeleton className="mt-1 h-3 w-56 bg-[#EFE7DD]" />

            <dl className="mt-3 divide-y divide-[#D8C5B2]/50">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-1.5 py-4 sm:grid sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:items-center sm:gap-4">
                  <Skeleton className="h-3 w-24 bg-[#EFE7DD]" />
                  <Skeleton className="h-3.5 w-3/4 bg-[#EFE7DD]" />
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Info notice */}
        <div
          aria-hidden="true"
          className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-[#D8C5B2] bg-[#FBF8F4] p-4"
        >
          <Skeleton className="mt-0.5 size-4 shrink-0 rounded bg-[#EFE7DD]" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full bg-[#EFE7DD]" />
            <Skeleton className="h-3 w-3/4 bg-[#EFE7DD]" />
          </div>
        </div>
      </div>
    </section>
  );
}