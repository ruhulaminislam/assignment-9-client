import ServiceCard from "@/components/shared/HomePage/DynamicSection1/card";
import { Input } from "@/components/ui/input";
import { featuredServices } from "@/data/services";
import { ChevronDown, Search } from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const categories = Array.from(
  new Set(featuredServices.map((service) => service.category)),
);

export default function BrowseServicesPage() {
  return (
    <section
      aria-labelledby="browse-services-heading"
      className={`${inter.className} bg-[#F7F3EE]`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
            Our Services
          </p>

          <h1
            id="browse-services-heading"
            className={`${playfair.className} mt-4 text-3xl leading-[1.15] font-medium tracking-tight text-balance text-[#292824] sm:text-4xl lg:text-[2.75rem]`}
          >
            Browse Services
          </h1>

          <p className="mt-4 text-base leading-7 text-[#625D56] sm:text-lg sm:leading-8">
            Explore our salon treatments and find the service that fits your
            day, your mood, and your moment of calm.
          </p>
        </div>

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
                  defaultValue="all"
                  className="h-11 w-full appearance-none rounded-lg border border-[#D8C5B2] bg-white pr-9 pl-3 text-sm text-[#292824] transition-colors outline-none hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                  defaultValue="price-asc"
                  className="h-11 w-full appearance-none rounded-lg border border-[#D8C5B2] bg-white pr-9 pl-3 text-sm text-[#292824] transition-colors outline-none hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25"
                >
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

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {featuredServices.map((service) => (
            <li key={service.id} className="flex">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
