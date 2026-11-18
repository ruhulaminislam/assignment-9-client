import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";

import { getServices } from "@/data/services";
import AddServiceForm from "./add-service-form";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const AddServicesPage = async () => {
  const services = await getServices();

  // Categories are the ones already used by the existing services.
  const categories = [...new Set(services.map((service) => service.category))]
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className={`${inter.className} bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
              Admin Dashboard
            </p>

            <h1
              className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
            >
              Add New Service
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
              Create a new treatment for your salon menu. Active services appear
              on the public site and can be booked by customers.
            </p>
          </div>

          <Link
            href="/dashboards/admin/manageservices"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-[#D8C5B2] bg-white px-3.5 text-sm font-medium text-[#292824] transition-colors hover:border-[#A58B73] hover:bg-[#F7F3EE] focus-visible:ring-2 focus-visible:ring-[#A58B73]/40 focus-visible:outline-none"
          >
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Manage Services
          </Link>
        </div>

        <AddServiceForm categories={categories} />
      </div>
    </div>
  );
};

export default AddServicesPage;
