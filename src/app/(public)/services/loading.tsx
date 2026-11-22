import { Skeleton } from "@/components/ui/skeleton";

export default function BrowseServicesLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading services"
      className="bg-[#F7F3EE]"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Skeleton className="mx-auto h-3 w-28 bg-[#EFE7DD]" />
          <Skeleton className="mx-auto mt-4 h-9 w-64 max-w-full bg-[#EFE7DD] sm:h-11" />
          <Skeleton className="mx-auto mt-4 h-4 w-full max-w-md bg-[#EFE7DD]" />
          <Skeleton className="mx-auto mt-2 h-4 w-3/4 max-w-sm bg-[#EFE7DD]" />
        </div>

        <div
          aria-hidden="true"
          className="mt-10 rounded-2xl bg-white p-4 ring-1 ring-[#D8C5B2]/70 sm:p-5 lg:mt-12"
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem_12rem] md:items-end">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-3 w-24 bg-[#EFE7DD]" />
                <Skeleton className="h-11 w-full rounded-lg bg-[#EFE7DD]" />
              </div>
            ))}
          </div>
        </div>

        <ul
          aria-hidden="true"
          className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="flex">
              <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70">
                <Skeleton className="aspect-[4/3] w-full rounded-none bg-[#EFE7DD]" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <Skeleton className="h-6 w-20 rounded-full bg-[#EFE7DD]" />
                  <Skeleton className="mt-3 h-6 w-3/4 bg-[#EFE7DD]" />
                  <Skeleton className="mt-3 h-3 w-full bg-[#EFE7DD]" />
                  <Skeleton className="mt-2 h-3 w-5/6 bg-[#EFE7DD]" />

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#D8C5B2]/50 pt-4">
                    <Skeleton className="h-5 w-16 bg-[#EFE7DD]" />
                    <Skeleton className="h-4 w-20 bg-[#EFE7DD]" />
                  </div>

                  <Skeleton className="mt-4 h-10 w-full rounded-lg bg-[#EFE7DD]" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
