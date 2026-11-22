import { Skeleton } from "@/components/ui/skeleton";

const TABLE_GRID =
  "grid-cols-[minmax(0,2.3fr)_0.9fr_0.95fr_0.7fr_1fr_1fr_0.9fr_auto]";

export default function MyAppointmentsLoading() {
  const rows = Array.from({ length: 5 });

  return (
    <section
      aria-busy="true"
      aria-label="Loading appointments"
      className="min-h-svh bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div aria-hidden="true">
          <Skeleton className="h-3 w-40 bg-[#EFE7DD]" />
          <Skeleton className="mt-3 h-9 w-64 max-w-full bg-[#EFE7DD] sm:h-10" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl bg-[#EFE7DD]" />
          <Skeleton className="mt-2 h-4 w-3/4 max-w-xl bg-[#EFE7DD]" />
        </div>

        <div
          aria-hidden="true"
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-4 w-28 bg-[#EFE7DD]" />
                <Skeleton className="size-10 shrink-0 rounded-xl bg-[#EFE7DD]" />
              </div>

              <Skeleton className="mt-5 h-9 w-14 bg-[#EFE7DD]" />
              <Skeleton className="mt-2 h-3 w-32 bg-[#EFE7DD]" />
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 shadow-[0_22px_50px_-40px_rgba(41,40,36,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8C5B2]/60 px-5 py-4 sm:px-6 sm:py-5">
            <div aria-hidden="true">
              <Skeleton className="h-6 w-44 bg-[#EFE7DD]" />
              <Skeleton className="mt-1 h-3 w-56 max-w-full bg-[#EFE7DD]" />
            </div>

            <Skeleton
              aria-hidden="true"
              className="h-6 w-28 rounded-full bg-[#EFE7DD]"
            />
          </div>

          {/* Table layout, mirrors the xl+ breakpoint of the real page */}
          <div aria-hidden="true" className="hidden xl:block">
            <div className="overflow-x-auto">
              <div className="min-w-[62rem]">
                <div
                  className={`grid ${TABLE_GRID} h-11 items-center gap-3 border-b border-[#D8C5B2]/60 px-3`}
                >
                  <Skeleton className="h-3 w-16 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-20 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-16 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-10 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-20 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-16 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-20 bg-[#EFE7DD]" />
                  <div className="sticky right-3 z-10 flex justify-end bg-white pl-3">
                    <Skeleton className="h-3 w-14 bg-[#EFE7DD]" />
                  </div>
                </div>

                {rows.map((_, index) => (
                  <div
                    key={index}
                    className={`grid ${TABLE_GRID} items-center gap-3 border-b border-[#D8C5B2]/40 px-3 py-4 last:border-b-0`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Skeleton className="size-11 shrink-0 rounded-xl bg-[#EFE7DD]" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-3.5 w-3/4 bg-[#EFE7DD]" />
                        <Skeleton className="h-3 w-1/2 bg-[#EFE7DD]" />
                      </div>
                    </div>

                    <Skeleton className="h-3 w-20 bg-[#EFE7DD]" />
                    <Skeleton className="h-3 w-24 bg-[#EFE7DD]" />
                    <Skeleton className="h-3.5 w-12 bg-[#EFE7DD]" />
                    <Skeleton className="h-5 w-20 rounded-full bg-[#EFE7DD]" />
                    <Skeleton className="h-5 w-20 rounded-full bg-[#EFE7DD]" />
                    <Skeleton className="h-3 w-20 bg-[#EFE7DD]" />

                    <div className="sticky right-3 z-10 flex items-center justify-end bg-white pl-3 shadow-[-12px_0_16px_-18px_rgba(41,40,36,0.5)]">
                      <div className="flex items-center overflow-hidden rounded-lg border border-[#D8C5B2]/70 bg-white">
                        <Skeleton className="size-9 rounded-none bg-[#EFE7DD]" />
                        <Skeleton className="size-9 rounded-none border-l border-[#D8C5B2]/60 bg-[#EFE7DD]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card layout, mirrors the sub-xl breakpoint of the real page */}
          <ul
            aria-hidden="true"
            className="divide-y divide-[#D8C5B2]/50 xl:hidden"
          >
            {rows.map((_, index) => (
              <li key={index} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Skeleton className="size-11 shrink-0 rounded-xl bg-[#EFE7DD]" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-3.5 w-3/4 bg-[#EFE7DD]" />
                      <Skeleton className="h-3 w-1/2 bg-[#EFE7DD]" />
                    </div>
                  </div>

                  <Skeleton className="h-5 w-20 shrink-0 rounded-full bg-[#EFE7DD]" />
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, field) => (
                    <div key={field}>
                      <Skeleton className="h-2.5 w-20 bg-[#EFE7DD]" />
                      <Skeleton className="mt-1.5 h-3.5 w-16 bg-[#EFE7DD]" />
                    </div>
                  ))}
                </dl>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D8C5B2]/50 pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-4 w-12 bg-[#EFE7DD]" />
                    <Skeleton className="h-5 w-[4.5rem] rounded-full bg-[#EFE7DD]" />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <Skeleton className="h-9 w-20 rounded-lg bg-[#EFE7DD]" />
                    <Skeleton className="h-9 w-[4.5rem] rounded-lg bg-[#EFE7DD]" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
