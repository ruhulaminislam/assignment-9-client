import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionsLoading() {
  return (
    <div className="min-h-svh bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Skeleton className="h-3 w-36 bg-[#EFE7DD]" />
        <Skeleton className="mt-4 h-9 w-72 bg-[#EFE7DD]" />
        <Skeleton className="mt-3 h-4 w-full max-w-md bg-[#EFE7DD]" />

        <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 shadow-[0_22px_50px_-40px_rgba(41,40,36,0.4)]">
          <div className="flex items-center justify-between gap-3 border-b border-[#D8C5B2]/60 px-5 py-4 sm:px-6 sm:py-5">
            <div>
              <Skeleton className="h-6 w-48 bg-[#EFE7DD]" />
              <Skeleton className="mt-2 h-3 w-64 bg-[#EFE7DD]" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full bg-[#EFE7DD]" />
          </div>

          <div aria-hidden="true" className="space-y-4 p-5 sm:p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-[#D8C5B2]/40 pb-4 last:border-b-0 last:pb-0"
              >
                <Skeleton className="size-9 shrink-0 rounded-full bg-[#EFE7DD]" />
                <Skeleton className="h-4 flex-1 bg-[#EFE7DD]" />
                <Skeleton className="hidden h-4 w-40 bg-[#EFE7DD] sm:block" />
                <Skeleton className="h-6 w-16 rounded-full bg-[#EFE7DD]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
