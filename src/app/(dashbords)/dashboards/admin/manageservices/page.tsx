import Image from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import {
  Ban,
  CheckCircle2,
  Clock,
  LayoutGrid,
  PauseCircle,
  Pencil,
  Plus,
  ShieldCheck,
  Tags,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  formatDuration,
  formatPrice,
} from "@/components/shared/HomePage/DynamicSection1/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServices, type Service } from "@/data/services";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function StatusBadge({ status }: { status: Service["status"] }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F3EA] px-2.5 py-1 text-xs font-medium text-[#287A55] ring-1 ring-[#287A55]/20">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAE6E1] px-2.5 py-1 text-xs font-medium text-[#625D56] ring-1 ring-[#89847E]/25">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      Inactive
    </span>
  );
}

function ServiceActions({
  service,
  withLabels = false,
}: {
  service: Service;
  withLabels?: boolean;
}) {
  const isActive = service.status === "active";

  const wrapperClasses = withLabels
    ? "flex flex-wrap items-center gap-1"
    : "flex items-center overflow-hidden rounded-lg border border-[#D8C5B2]/70 bg-white";

  const buttonClasses = withLabels
    ? "h-8 gap-1.5 rounded-lg border border-[#D8C5B2]/70 bg-white px-2 text-xs"
    : "size-8 rounded-none border-l-[#D8C5B2]/60 px-0 first:border-l-transparent";

  const focusClasses =
    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#292824]/40";

  return (
    <div className={wrapperClasses}>
      <Button
        type="button"
        variant="ghost"
        aria-label={`Edit ${service.serviceName}`}
        title="Edit service"
        className={`${buttonClasses} ${focusClasses} text-[#625D56] hover:bg-[#F7F3EE] hover:text-[#292824]`}
      >
        <Pencil aria-hidden="true" strokeWidth={1.75} />
        {withLabels ? "Edit" : null}
      </Button>

      {isActive ? (
        <Button
          type="button"
          variant="ghost"
          aria-label={`Deactivate ${service.serviceName}`}
          title="Deactivate service"
          className={`${buttonClasses} ${focusClasses} text-[#625D56] hover:bg-[#FBE9E7] hover:text-[#B94343]`}
        >
          <Ban aria-hidden="true" strokeWidth={1.75} />
          {withLabels ? "Deactivate" : null}
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          aria-label={`Activate ${service.serviceName}`}
          title="Activate service"
          className={`${buttonClasses} ${focusClasses} text-[#625D56] hover:bg-[#E6F3EA] hover:text-[#287A55]`}
        >
          <ShieldCheck aria-hidden="true" strokeWidth={1.75} />
          {withLabels ? "Activate" : null}
        </Button>
      )}

      <Button
        type="button"
        variant="ghost"
        aria-label={`Delete ${service.serviceName}`}
        title="Delete service"
        className={`${buttonClasses} ${focusClasses} text-[#625D56] hover:bg-[#FBE9E7] hover:text-[#B94343]`}
      >
        <Trash2 aria-hidden="true" strokeWidth={1.75} />
        {withLabels ? "Delete" : null}
      </Button>
    </div>
  );
}

export const ManageServicesPage = async () => {
  const services = await getServices();

  const activeServices = services.filter(
    (service) => service.status === "active",
  );
  const inactiveServices = services.filter(
    (service) => service.status === "inactive",
  );
  const categoryCount = new Set(services.map((service) => service.category))
    .size;

  const stats: {
    id: string;
    label: string;
    caption: string;
    value: number;
    icon: LucideIcon;
    iconClasses: string;
  }[] = [
    {
      id: "total",
      label: "Total Services",
      caption: "Everything in your catalogue",
      value: services.length,
      icon: LayoutGrid,
      iconClasses: "bg-[#F7F3EE] text-[#A58B73] ring-[#D8C5B2]/60",
    },
    {
      id: "active",
      label: "Active Services",
      caption: "Visible on Browse Services",
      value: activeServices.length,
      icon: CheckCircle2,
      iconClasses: "bg-[#E6F3EA] text-[#287A55] ring-[#287A55]/20",
    },
    {
      id: "inactive",
      label: "Inactive Services",
      caption: "Hidden from customers",
      value: inactiveServices.length,
      icon: PauseCircle,
      iconClasses: "bg-[#EAE6E1] text-[#625D56] ring-[#89847E]/25",
    },
    {
      id: "categories",
      label: "Total Categories",
      caption: "Unique service categories",
      value: categoryCount,
      icon: Tags,
      iconClasses: "bg-[#D8C5B2]/30 text-[#292824] ring-[#D8C5B2]/70",
    },
  ];

  return (
    <div className={`${inter.className} bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
              Admin Dashboard
            </p>

            <h1
              className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
            >
              Manage Services
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
              Review your salon catalogue, keep each treatment up to date and
              control which services customers can book.
            </p>
          </div>

           
          <Link href="/dashboards/admin/manageservices/addservices">
           <Button
           
            type="button"
            className="h-10 w-fit gap-2 rounded-lg bg-[#292824] px-4 text-sm font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40"
          >
            <Plus aria-hidden="true" strokeWidth={1.75} />
            Add New Service
          </Button>
          </Link>

           
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm leading-6 font-medium text-[#625D56]">
                    {stat.label}
                  </p>

                  <span
                    aria-hidden="true"
                    className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${stat.iconClasses}`}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                </div>

                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#292824] tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[#625D56]">{stat.caption}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[#D8C5B2]/70 shadow-[0_22px_50px_-40px_rgba(41,40,36,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8C5B2]/60 px-5 py-4 sm:px-6 sm:py-5">
            <div>
              <h2
                className={`${playfair.className} text-xl font-medium text-[#292824]`}
              >
                All Services
              </h2>
              <p className="mt-1 text-xs leading-5 text-[#625D56]">
                Active services are visible on the public Browse Services page.
              </p>
            </div>

            <span className="rounded-full bg-[#F7F3EE] px-3 py-1 text-xs font-medium text-[#625D56] ring-1 ring-[#D8C5B2]/60">
              {services.length} services
            </span>
          </div>

          {services.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-[#F7F3EE] text-[#A58B73] ring-1 ring-[#D8C5B2]/60">
                <LayoutGrid
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.75}
                />
              </span>
              <p className="mt-2 text-sm font-medium text-[#292824]">
                No services yet
              </p>
              <p className="text-xs text-[#625D56]">
                Services you add will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden xl:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#D8C5B2]/60 hover:bg-transparent">
                      <TableHead className="h-11 px-4 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        Service
                      </TableHead>
                      <TableHead className="h-11 px-4 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        Category
                      </TableHead>
                      <TableHead className="h-11 px-4 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        Price / Duration
                      </TableHead>
                      <TableHead className="h-11 px-4 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        Status
                      </TableHead>
                      <TableHead className="h-11 px-4 text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        <span className="block leading-4">Created</span>
                        <span className="block leading-4">Updated</span>
                      </TableHead>
                      <TableHead className="h-11 px-4 text-right text-[11px] font-medium tracking-[0.14em] text-[#625D56] uppercase">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {services.map((service) => (
                      <TableRow
                        key={service._id}
                        className="border-[#D8C5B2]/40 hover:bg-[#F7F3EE]/60"
                      >
                        <TableCell className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-[#EFE7DD] ring-1 ring-[#D8C5B2]/60">
                              <Image
                                src={service.image}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-[#292824]">
                                {service.serviceName}
                              </p>
                              <p
                                title={service.description}
                                className="mt-0.5 max-w-[12rem] truncate text-xs leading-5 text-[#625D56]"
                              >
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3.5">
                          <span className="inline-flex items-center rounded-full bg-[#F7F3EE] px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-[#625D56] ring-1 ring-[#D8C5B2]/60">
                            {service.category}
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-sm font-medium text-[#292824] tabular-nums">
                            {formatPrice(service.price)}
                          </p>
                          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#625D56]">
                            <Clock
                              aria-hidden="true"
                              className="size-3.5 text-[#A58B73]"
                              strokeWidth={1.75}
                            />
                            {formatDuration(service.duration)}
                          </p>
                        </TableCell>

                        <TableCell className="px-4 py-3.5">
                          <StatusBadge status={service.status} />
                        </TableCell>

                        <TableCell className="px-4 py-3.5 text-xs leading-5 whitespace-nowrap">
                          <p className="text-[#625D56]">
                            <span className="sr-only">Created </span>
                            {formatDate(service.createdAt)}
                          </p>
                          <p className="text-[#89847E]">
                            <span className="sr-only">Updated </span>
                            {formatDate(service.updatedAt)}
                          </p>
                        </TableCell>

                        <TableCell className="px-4 py-3.5">
                          <div className="flex justify-end">
                            <ServiceActions service={service} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <ul className="divide-y divide-[#D8C5B2]/50 xl:hidden">
                {services.map((service) => (
                  <li key={service._id} className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#EFE7DD] ring-1 ring-[#D8C5B2]/60">
                        <Image
                          src={service.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-medium text-[#292824]">
                            {service.serviceName}
                          </p>
                          <StatusBadge status={service.status} />
                        </div>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#625D56]">
                          {service.description}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#625D56]">
                          <span className="inline-flex items-center rounded-full bg-[#F7F3EE] px-2 py-0.5 text-[11px] font-medium text-[#625D56] ring-1 ring-[#D8C5B2]/60">
                            {service.category}
                          </span>

                          <span className="font-medium text-[#292824] tabular-nums">
                            {formatPrice(service.price)}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Clock
                              aria-hidden="true"
                              className="size-3.5 text-[#A58B73]"
                              strokeWidth={1.75}
                            />
                            {formatDuration(service.duration)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#D8C5B2]/50 pt-3">
                      <p className="text-[11px] leading-5 text-[#89847E]">
                        Created {formatDate(service.createdAt)} · Updated{" "}
                        {formatDate(service.updatedAt)}
                      </p>

                      <ServiceActions service={service} withLabels />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageServicesPage;
