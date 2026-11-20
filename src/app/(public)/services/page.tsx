import ServiceCard from "@/components/shared/HomePage/DynamicSection1/card";
import { featuredServices,  Service } from "@/data/services";
import { Inter, Playfair_Display } from "next/font/google";
import ServiceFilters from "./ServiceFilters";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

type SearchParams = Promise<{
  search?: string;
  category?: string;
  sort?: string;
}>;

export default async function BrowseServicesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, category, sort } = await searchParams;

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (category) query.set("category", category);
  if (sort) query.set("sort", sort);

  // filter + sort করা data
  const services: Service[] = await featuredServices(query.toString());
    const filteredServices = services.filter((s) => s.status === "active");
  // dropdown-এর জন্য সব category (filter ছাড়া), duplicate বাদ দিয়ে
  const allServices: Service[] = await featuredServices();
  
  const categoryNames = [...new Set(allServices.map((s) => s.category))];

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

        <ServiceFilters categories={categoryNames} />

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {filteredServices.map((service) => (
            <li key={service._id} className="flex ">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}