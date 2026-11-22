
import { serviceCategories, type ServiceCategory } from "@/data/categories";
import { Inter, Playfair_Display } from "next/font/google";
import { CategoryCard } from "./CategoryCard";
import { featuredServices, Service } from "@/data/services";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export async function SalonServiceCategories() {
  const response = await featuredServices();
const data: Service[] = response;

// Get 7 unique categories with active services
const seenCategories = new Set<string>();

const categories = data.filter((service) => {
  if (!service.category || service.status !== "active") {
    return false;
  }

  if (seenCategories.has(service.category)) {
    return false;
  }

  seenCategories.add(service.category);
  return true;
}).slice(0, 7);
  return (
    <section
      aria-labelledby="salon-service-categories-heading"
      className={`${inter.className} border-t border-[#D8C5B2]/60 bg-[#F7F3EE]`}
    >
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
            Explore By Category
          </p>

          <h2
            id="salon-service-categories-heading"
            className={`${playfair.className} mt-4 text-3xl leading-[1.15] font-medium tracking-tight text-balance text-[#292824] sm:text-4xl lg:text-[2.75rem]`}
          >
            Salon Service Categories
          </h2>

          <p className="mt-4 text-base leading-7 text-[#625D56] sm:text-lg sm:leading-8">
            Browse our menu by treatment type — from everyday grooming to
            restorative rituals, each service is designed around you.
          </p>
        </div>

        <ul className="mt-12 flex list-none flex-wrap items-stretch justify-center gap-4 md:gap-6 lg:mt-16 lg:gap-8">
          {categories.map((category) => (
            <li
              key={category._id}
              className="
                flex min-w-0
                w-[calc((100%-1rem)/2)]
                md:w-[calc((100%-3rem)/3)]
                lg:w-[calc((100%-6rem)/4)]
              "
            >
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
