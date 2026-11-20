import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOverviewLoading() {
  return (
    <div className="min-h-svh bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div
          aria-hidden="true"
          className="relative overflow-hidden rounded-2xl border border-[#D8C5B2]/70 bg-white p-6 shadow-[0_28px_70px_-55px_rgba(41,40,36,0.55)] sm:p-8 lg:p-10"
        >
          <Skeleton className="h-3 w-36 bg-[#EFE7DD]" />
          <Skeleton className="mt-4 h-9 w-64 bg-[#EFE7DD]" />
          <Skeleton className="mt-3 h-5 w-60 bg-[#EFE7DD]" />
          <Skeleton className="mt-4 h-4 w-full max-w-xl bg-[#EFE7DD]" />
        </div>

        <div className="mt-8 sm:mt-10">
          <Skeleton className="h-7 w-56 bg-[#EFE7DD]" />
          <Skeleton className="mt-2 h-4 w-72 bg-[#EFE7DD]" />

          <ul
            aria-hidden="true"
            className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <li
                key={index}
                className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-4 w-28 bg-[#EFE7DD]" />
                  <Skeleton className="size-11 rounded-xl bg-[#EFE7DD]" />
                </div>
                <Skeleton className="mt-5 h-10 w-16 bg-[#EFE7DD]" />
                <Skeleton className="mt-3 h-3 w-full bg-[#EFE7DD]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
