import {
  formatDuration,
  formatPrice,
} from "@/components/shared/HomePage/DynamicSection1/card";
import { Button } from "@/components/ui/button";

import { ArrowLeft, CalendarPlus, Clock } from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServiceById, Service } from "@/data/services";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Appointment from "./appointment";
import NotFounds from "./not-found";





const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

interface ServiceDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
  if(!session?.user){
    redirect('/sign-in')
  }
  if(session?.user?.isBlocked===true){
     
     redirect('/other/blocked')
  }
 
  const service:Service =await  getServiceById(id);
   if(!service){
    notFound();
   }

  return (
    <section
      aria-labelledby="service-details-heading"
      className={`${inter.className} bg-[#F7F3EE]`}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#625D56] transition-colors duration-200 hover:text-[#292824] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292824]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F3EE]"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 text-[#A58B73]"
            strokeWidth={1.75}
          />
          Back to Services
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-[0_32px_80px_-48px_rgba(41,40,36,0.35)] ring-1 ring-[#D8C5B2]/70">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative aspect-[4/3] bg-[#EFE7DD] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[30rem]">
              <Image
                src={service.image}
                alt={`${service.serviceName} service at SalonBook`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="inline-flex w-fit items-center rounded-full bg-[#F7F3EE] px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase ring-1 ring-[#D8C5B2]/60">
                {service.category}
              </span>

              <h1
                id="service-details-heading"
                className={`${playfair.className} mt-4 text-3xl leading-[1.12] font-medium tracking-tight text-balance text-[#292824] sm:text-4xl lg:text-[2.75rem]`}
              >
                {service.serviceName}
              </h1>

              <p className="mt-4 text-base leading-7 text-[#625D56] sm:text-lg sm:leading-8">
                {service.description}
              </p>

              <dl className="mt-7 overflow-hidden rounded-xl bg-[#F7F3EE] ring-1 ring-[#D8C5B2]/60">
                <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <dt className="text-[10px] font-medium tracking-[0.16em] text-[#A58B73] uppercase">
                    Price
                  </dt>
                  <dd className="text-lg font-semibold text-[#292824]">
                    {formatPrice(service.price)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[#D8C5B2]/60 px-4 py-3.5">
                  <dt className="text-[10px] font-medium tracking-[0.16em] text-[#A58B73] uppercase">
                    Duration
                  </dt>
                  <dd className="inline-flex items-center gap-1.5 text-lg font-semibold whitespace-nowrap text-[#292824]">
                    <Clock
                      aria-hidden="true"
                      className="size-4 text-[#A58B73]"
                      strokeWidth={1.75}
                    />
                    {formatDuration(service.duration)}
                  </dd>
                </div>
              </dl>

              <Appointment serviceId={service._id} service={service} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
