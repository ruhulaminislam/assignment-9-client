import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailsLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading service details"
      className="bg-[#F7F3EE]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div aria-hidden="true" className="flex items-center gap-1.5">
          <Skeleton className="size-4 rounded bg-[#EFE7DD]" />
          <Skeleton className="h-3.5 w-28 bg-[#EFE7DD]" />
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-[0_32px_80px_-48px_rgba(41,40,36,0.35)] ring-1 ring-[#D8C5B2]/70">
          <div aria-hidden="true" className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <Skeleton className="aspect-[4/3] w-full rounded-none bg-[#EFE7DD] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[30rem]" />

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <Skeleton className="h-6 w-24 rounded-full bg-[#EFE7DD]" />

              <Skeleton className="mt-4 h-9 w-4/5 bg-[#EFE7DD] sm:h-10" />
              <Skeleton className="mt-2 h-9 w-3/5 bg-[#EFE7DD] sm:h-10" />

              <Skeleton className="mt-4 h-4 w-full bg-[#EFE7DD]" />
              <Skeleton className="mt-2 h-4 w-11/12 bg-[#EFE7DD]" />
              <Skeleton className="mt-2 h-4 w-2/3 bg-[#EFE7DD]" />

              <div className="mt-7 overflow-hidden rounded-xl bg-[#F7F3EE] ring-1 ring-[#D8C5B2]/60">
                <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <Skeleton className="h-3 w-14 bg-[#E4D8CA]" />
                  <Skeleton className="h-5 w-20 bg-[#E4D8CA]" />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[#D8C5B2]/60 px-4 py-3.5">
                  <Skeleton className="h-3 w-16 bg-[#E4D8CA]" />
                  <Skeleton className="h-5 w-24 bg-[#E4D8CA]" />
                </div>
              </div>

              <Skeleton className="mt-8 h-12 w-full rounded-lg bg-[#EFE7DD]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
