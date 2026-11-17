import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

interface FooterLink {
  label: string;
  href: string;
}

interface ContactDetail {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface OpeningHour {
  days: string;
  hours: string;
}

const navigationLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];

const socialLinks: FooterLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/salonbook" },
  { label: "Facebook", href: "https://www.facebook.com/salonbook" },
  { label: "Pinterest", href: "https://www.pinterest.com/salonbook" },
];

const contactDetails: ContactDetail[] = [
  {
    label: "(212) 555-0186",
    href: "tel:+12125550186",
    icon: Phone,
  },
  {
    label: "hello@salonbook.com",
    href: "mailto:hello@salonbook.com",
    icon: Mail,
  },
];

const openingHours: OpeningHour[] = [
  { days: "Mon – Fri", hours: "9:00 AM – 7:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 5:00 PM" },
  { days: "Sunday", hours: "Closed" },
];

const footerHeadingClasses =
  "text-xs font-medium tracking-[0.18em] text-[#D8C5B2] uppercase";

const footerLinkClasses =
  "text-sm text-[#F7F3EE]/75 transition-colors duration-200 hover:text-[#F7F3EE] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8C5B2] focus-visible:ring-offset-4 focus-visible:ring-offset-[#292824]";

export function Footer() {
  return (
    <footer
      className={`${inter.className} border-t border-[#D8C5B2]/40 bg-[#292824] text-[#F7F3EE]`}
    >
      <div className="mx-auto max-w-[1440px] px-4 pt-16 pb-8 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
           <Link
  href="/"
  aria-label="SalonBook home"
  className="inline-block transition-opacity duration-200 hover:opacity-80"
>
  <Image
     src="/images/salonbook-logo-transparent.png"
    alt="SalonBook"
    width={230}
    height={60}
    className="h-12 w-auto object-contain brightness-0 invert"
  />
</Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#D8C5B2]">
              A modern salon experience built around thoughtful service,
              effortless booking, and time to feel your best.
            </p>

            <p className={`${footerHeadingClasses} mt-7`}>Follow Us</p>

            <ul className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`SalonBook on ${link.label}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-[#D8C5B2]/25 px-3 py-1.5 text-xs font-medium text-[#D8C5B2] transition-colors duration-200 hover:border-[#D8C5B2]/60 hover:text-[#F7F3EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8C5B2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#292824]"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h2 className={footerHeadingClasses}>Explore</h2>

            <ul className="mt-5 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={footerHeadingClasses}>Contact</h2>

            <ul className="mt-5 space-y-4">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <li key={detail.href}>
                    <a
                      href={detail.href}
                      className={`${footerLinkClasses} inline-flex items-start gap-3`}
                    >
                      <Icon
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-[#A58B73]"
                        strokeWidth={1.75}
                      />
                      <span>{detail.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={footerHeadingClasses}>Visit Us</h2>

            <div className="mt-5 flex items-start gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-[#A58B73]"
                strokeWidth={1.75}
              />
              <address className="text-sm leading-7 text-[#F7F3EE]/75 not-italic">
                128 Willow Lane, Suite 4
                <br />
                New York, NY 10012
              </address>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Clock
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-[#A58B73]"
                strokeWidth={1.75}
              />

              <ul className="w-full space-y-2">
                {openingHours.map((slot) => (
                  <li
                    key={slot.days}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <span className="text-[#D8C5B2]">{slot.days}</span>
                    <span className="text-right text-[#F7F3EE]/75">
                      {slot.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#D8C5B2]/20 pt-6 lg:mt-16">
          <p className="text-center text-xs leading-5 text-[#D8C5B2] sm:text-left">
            © 2026 SalonBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
