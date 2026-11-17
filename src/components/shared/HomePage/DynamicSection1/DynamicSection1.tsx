
import { Inter, Playfair_Display } from "next/font/google";


import { featuredServices, type Service } from "@/data/services";
import ServiceCard from "./card";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});











export async function DynamicSection1() {
    const response = await featuredServices
    const data:Service[] = response;
  return (
    <section
      aria-labelledby="featured-services-heading"
      className={`${inter.className} border-t border-[#D8C5B2]/60 bg-[#F7F3EE]`}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
            Salon Favourites
          </p>

          <h2
            id="featured-services-heading"
            className={`${playfair.className} mt-4 text-3xl leading-[1.15] font-medium tracking-tight text-balance text-[#292824] sm:text-4xl lg:text-[2.75rem]`}
          >
            Featured Salon Services
          </h2>

          <p className="mt-4 text-base leading-7 text-[#625D56] sm:text-lg sm:leading-8">
            A curated selection of our most-loved treatments, from precision
            cuts to restorative facials — each delivered with thoughtful care.
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {data.map((service) => (
            <li key={service.id} className="flex">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
