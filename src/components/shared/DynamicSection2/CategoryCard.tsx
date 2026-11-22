
import type { ServiceCategory } from "@/data/categories";
import { Service } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

interface CategoryCardProps {
  category: Service;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/services?category=${encodeURIComponent(category.category)}`}
      className="
        group flex h-full w-full min-w-0 flex-col
        overflow-hidden rounded-2xl
        bg-white
        shadow-[0_18px_40px_-32px_rgba(41,40,36,0.38)]
        ring-1 ring-[#D8C5B2]/70
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_24px_50px_-30px_rgba(41,40,36,0.45)]
        focus-visible:ring-2
        focus-visible:ring-[#A58B73]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#F7F3EE]
        focus-visible:outline-none
      "
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#EFE7DD]">
        <Image
          src={category.image}
          alt={`${category.category} at SalonBook`}
          fill
          sizes="
            (min-width: 1024px) 25vw,
            (min-width: 768px) 33vw,
            50vw
          "
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-[1.04]
            motion-reduce:transition-none
            motion-reduce:group-hover:scale-100
          "
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <h3
          className={`
            ${playfair.className}
            min-h-[3.5rem]
            text-lg leading-snug font-medium tracking-tight
            text-[#292824] text-balance
            sm:min-h-[3.75rem] sm:text-xl
            lg:min-h-[4rem] lg:text-2xl
          `}
        >
          {category.category}
        </h3>

        {/* Card Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#D8C5B2]/50 pt-3 sm:gap-3 sm:pt-4">
          <span className="text-xs font-medium tracking-[0.08em] text-[#625D56] sm:text-sm">
            <span className="sm:hidden">Explore</span>
            <span className="hidden sm:inline">Explore services</span>
          </span>

          <span
            aria-hidden="true"
            className="
              inline-flex size-8 shrink-0 items-center justify-center
              rounded-full bg-[#F7F3EE]
              text-[#A58B73]
              ring-1 ring-[#D8C5B2]/60
              transition-colors duration-200
              group-hover:bg-[#A58B73]
              group-hover:text-white
              sm:size-9
            "
          >
            <ArrowUpRight
              className="
                size-4
                transition-transform duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                motion-reduce:transition-none
              "
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
