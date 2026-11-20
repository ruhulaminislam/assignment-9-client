"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ServiceFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState(searchParams.get("search") ?? "");

  // শুধু একটা key বদলায়, বাকিগুলো যেমন ছিল তেমন থাকে
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "default") params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  // টাইপ থামার ৪০০ms পরে search হবে (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText !== (searchParams.get("search") ?? "")) {
        updateParam("search", searchText);
      }
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className="mt-10 rounded-2xl bg-white p-4 ring-1 ring-[#D8C5B2]/70 sm:p-5 lg:mt-12">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem_12rem] md:items-end">
        <div className="space-y-2">
          <label
            htmlFor="service-search"
            className="block text-xs font-medium tracking-[0.14em] text-[#625D56] uppercase"
          >
            Search Services
          </label>

          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#A58B73]"
              strokeWidth={1.75}
            />
            <Input
              id="service-search"
              name="search"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by service name"
              className="h-11 rounded-lg border-[#D8C5B2] bg-white pr-4 pl-10 text-sm text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="service-category"
            className="block text-xs font-medium tracking-[0.14em] text-[#625D56] uppercase"
          >
            Category
          </label>

          <div className="relative">
            <select
              id="service-category"
              name="category"
              value={searchParams.get("category") ?? "all"}
              onChange={(e) => updateParam("category", e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-[#D8C5B2] bg-white pr-9 pl-3 text-sm text-[#292824] transition-colors outline-none hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25"
            >
              <option value="all">All Categories</option>
              {categories.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#A58B73]"
              strokeWidth={1.75}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="service-sort"
            className="block text-xs font-medium tracking-[0.14em] text-[#625D56] uppercase"
          >
            Sort By Price
          </label>

          <div className="relative">
            <select
              id="service-sort"
              name="sort"
              value={searchParams.get("sort") ?? "default"}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-[#D8C5B2] bg-white pr-9 pl-3 text-sm text-[#292824] transition-colors outline-none hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25"
            >
              <option value="default">Default</option>
              <option value="price-asc">Low to High</option>
              <option value="price-desc">High to Low</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#A58B73]"
              strokeWidth={1.75}
            />
          </div>
        </div>
      </div>
    </div>
  );
}