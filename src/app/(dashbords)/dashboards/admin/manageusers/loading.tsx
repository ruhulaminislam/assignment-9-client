import { Skeleton } from "@/components/ui/skeleton";

const TABLE_GRID = "grid-cols-[minmax(0,2.5fr)_0.8fr_0.8fr_1.2fr_auto]";

export default function ManageUsersLoading() {
  const rows = Array.from({ length: 6 });

  return (
    <section
      aria-busy="true"
      aria-label="Loading users"
      className="min-h-svh bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div aria-hidden="true">
          <Skeleton className="h-3 w-40 bg-[#EFE7DD]" />
          <Skeleton className="mt-3 h-9 w-72 max-w-full bg-[#EFE7DD] sm:h-10" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl bg-[#EFE7DD]" />
        </div>

        <div
          aria-hidden="true"
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-4 w-36 bg-[#EFE7DD]" />
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
              <Skeleton className="h-6 w-48 bg-[#EFE7DD]" />
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
              <div className="min-w-[64rem]">
                <div
                  className={`grid ${TABLE_GRID} h-11 items-center gap-3 border-b border-[#D8C5B2]/60 px-5`}
                >
                  <Skeleton className="h-3 w-16 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-10 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-10 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-20 bg-[#EFE7DD]" />
                  <Skeleton className="h-3 w-14 justify-self-end bg-[#EFE7DD]" />
                </div>

                {rows.map((_, index) => (
                  <div
                    key={index}
                    className={`grid ${TABLE_GRID} items-center gap-3 border-b border-[#D8C5B2]/40 px-5 py-4 last:border-b-0`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Skeleton className="size-10 shrink-0 rounded-full bg-[#EFE7DD]" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-3.5 w-3/4 bg-[#EFE7DD]" />
                        <Skeleton className="h-3 w-full bg-[#EFE7DD]" />
                      </div>
                    </div>

                    <Skeleton className="h-5 w-16 rounded-full bg-[#EFE7DD]" />

                    <Skeleton className="h-5 w-16 rounded-full bg-[#EFE7DD]" />

                    <Skeleton className="h-3 w-20 bg-[#EFE7DD]" />

                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-24 rounded-lg bg-[#EFE7DD]" />
                      <Skeleton className="h-9 w-20 rounded-lg bg-[#EFE7DD]" />
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
              <li key={index} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Skeleton className="size-10 shrink-0 rounded-full bg-[#EFE7DD]" />
                    <div className="min-w-0">
                      <Skeleton className="h-3.5 w-3/4 bg-[#EFE7DD]" />
                      <Skeleton className="mt-0.5 h-3 w-full bg-[#EFE7DD]" />
                    </div>
                  </div>

                  <Skeleton className="h-5 w-16 shrink-0 rounded-full bg-[#EFE7DD]" />
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <dl className="grid grid-cols-2 gap-3 text-sm sm:flex sm:gap-10">
                    {Array.from({ length: 2 }).map((_, field) => (
                      <div key={field}>
                        <Skeleton className="h-2.5 w-10 bg-[#EFE7DD]" />
                        <Skeleton className="mt-1.5 h-3.5 w-16 bg-[#EFE7DD]" />
                      </div>
                    ))}
                  </dl>

                  <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:items-center">
                    <Skeleton className="h-9 w-24 rounded-lg bg-[#EFE7DD]" />
                    <Skeleton className="h-9 w-20 rounded-lg bg-[#EFE7DD]" />
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