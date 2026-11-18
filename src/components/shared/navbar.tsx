import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Profile from "./profile";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
];

const navLinkClasses =
  "relative inline-flex items-center py-2 text-sm font-medium text-[#292824] transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#A58B73] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292824]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F3EE] aria-[current=page]:after:scale-x-100";

const secondaryButtonClasses =
  "h-9 rounded-lg border-[#A58B73] bg-transparent px-3 text-xs font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#A58B73] hover:text-[#292824] focus-visible:border-[#A58B73] focus-visible:ring-[#292824]/40 sm:px-4 sm:text-sm lg:h-10 lg:px-5";

const primaryButtonClasses =
  "h-9 rounded-lg bg-[#292824] px-3 text-xs font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40 sm:px-4 sm:text-sm lg:h-10 lg:px-5";

export function Navbar() {
  return (
    <header
      className={`${inter.className} border-b border-[#D8C5B2]/70 bg-[#F7F3EE]`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:px-8 lg:py-0">
        <div className="flex items-center justify-between gap-4 lg:justify-start">
    <Link href="/" aria-label="SalonBook home">
  <Image
  src="/images/salonbook-logo-transparent.png"
  alt="SalonBook"
  width={230}
  height={60}
  priority
  className="h-12 w-auto object-contain"
/>
</Link>
         <div className="flex items-center gap-2 lg:hidden ">
          <Profile />
         </div>
        
        </div>

        <nav aria-label="Main navigation" className="lg:flex lg:justify-center">
          <ul className="flex items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-end gap-2 lg:flex">
         <Profile />
        </div>
      </div>
    </header>
  );
}
