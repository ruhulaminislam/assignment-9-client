import { Button } from "@/components/ui/button";
import { Service } from "@/data/services";
import { ArrowRight, Clock } from "lucide-react";
import { Playfair_Display } from "next/font/google";


import Image from "next/image";
import Link from "next/link";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

const playfai = Playfair_Display ({
  subsets: ["latin"],
  display: "swap",
});



function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDuration(minutes: number) {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes
    ? `${hours} hr ${remainingMinutes} min`
    : `${hours} hr`;
}


 export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 transition-shadow duration-300 hover:shadow-[0_22px_45px_-30px_rgba(41,40,36,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE7DD]">
        <Image
          src={service.image}
          alt={`${service.name} service at SalonBook`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="inline-flex w-fit items-center rounded-full bg-[#F7F3EE] px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-[#625D56] uppercase ring-1 ring-[#D8C5B2]/60">
          {service.category}
        </span>

        <h3
          className={`${playfai.className } mt-3 text-xl leading-snug font-medium text-[#292824]`}
        >
          {service.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#625D56]">
          {service.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#D8C5B2]/50 pt-4">
          <p className="text-base font-semibold text-[#292824]">
            {formatPrice(service.price)}
          </p>
          <p className="inline-flex items-center gap-1.5 text-sm text-[#625D56]">
            <Clock aria-hidden="true" className="size-4 text-[#A58B73]" />
            {formatDuration(service.durationMinutes)}
          </p>
        </div>

        <Button
          render={<Link href={`/services/${service.id}`} />}
          variant="outline"
          className="mt-4 h-10 w-full rounded-lg border-[#A58B73] bg-transparent text-sm font-medium text-[#292824] hover:bg-[#F7F3EE] hover:text-[#292824] focus-visible:border-[#A58B73] focus-visible:ring-[#292824]/30"
        >
          View Details
          <ArrowRight
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/button:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none"
          />
        </Button>
      </div>
    </article>
  );
}