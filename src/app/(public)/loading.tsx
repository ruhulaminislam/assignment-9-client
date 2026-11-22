import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading page"
      className="bg-[#F7F3EE]"
    >
      <div
        aria-hidden="true"
        className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24"
      >
        <div className="max-w-xl">
          <Skeleton className="h-3 w-40 bg-[#EFE7DD]" />

          <Skeleton className="mt-5 h-10 w-full bg-[#EFE7DD] sm:h-12" />
          <Skeleton className="mt-3 h-10 w-4/5 bg-[#EFE7DD] sm:h-12" />
          <Skeleton className="mt-3 h-10 w-3/5 bg-[#EFE7DD] sm:h-12" />

          <Skeleton className="mt-6 h-4 w-full max-w-lg bg-[#EFE7DD]" />
          <Skeleton className="mt-2 h-4 w-10/12 max-w-md bg-[#EFE7DD]" />

          <Skeleton className="mt-8 h-12 w-52 rounded-lg bg-[#EFE7DD] sm:mt-10" />
        </div>

        <Skeleton className="aspect-[4/5] w-full rounded-2xl bg-[#EFE7DD] ring-1 ring-[#D8C5B2]/70 sm:aspect-[3/2] lg:aspect-auto lg:h-[34rem]" />
      </div>

      <div aria-hidden="true" className="border-t border-[#D8C5B2]/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Skeleton className="mx-auto h-3 w-32 bg-[#EFE7DD]" />
            <Skeleton className="mx-auto mt-4 h-9 w-full max-w-lg bg-[#EFE7DD] sm:h-10" />
            <Skeleton className="mx-auto mt-4 h-4 w-full max-w-md bg-[#EFE7DD]" />
            <Skeleton className="mx-auto mt-2 h-4 w-3/4 max-w-sm bg-[#EFE7DD]" />
          </div>

          <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
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
      </div>
    </section>
  );
}
