import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileUser } from "../get-profile-user";
import { getInitials } from "../profile-utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

function EditCard({
  href,
  icon: Icon,
  title,
  description,
  children,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] transition-colors hover:bg-[#FBF8F4] focus-visible:ring-2 focus-visible:ring-[#A58B73]/50 focus-visible:outline-none sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EE] text-[#A58B73] ring-1 ring-[#D8C5B2]/60">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
        <h2 className="text-base font-semibold text-[#292824]">{title}</h2>
      </div>

      {children ? <div className="mt-4">{children}</div> : null}

      <p className="mt-3 text-sm leading-6 text-[#625D56]">{description}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#7A634D]">
        Edit {title.toLowerCase()}
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      </span>
    </Link>
  );
}

export const EditProfilePage = async () => {
  const user = await getProfileUser();
  const initials = getInitials(user.name);

  return (
    <div className={`${inter.className} bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/dashboards/admin/myprofile"
          className="inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-[#D8C5B2] bg-white px-3.5 text-sm font-medium text-[#292824] transition-colors hover:border-[#A58B73] hover:bg-[#F7F3EE] focus-visible:ring-2 focus-visible:ring-[#A58B73]/40 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          My Profile
        </Link>

        <p className="mt-6 text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
          Profile Settings
        </p>

        <h1
          className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
        >
          Edit Profile
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
          Choose what you would like to update. Each detail has its own page, so
          only one field is changed at a time.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <EditCard
            href="/dashboards/admin/myprofile/edit/name"
            icon={UserRound}
            title="Display Name"
            description="The name shown next to your profile image across the dashboard."
          >
            <p className="truncate text-sm font-medium text-[#292824]">
              {user.name}
            </p>
          </EditCard>

          <EditCard
            href="/dashboards/admin/myprofile/edit/image"
            icon={ImageIcon}
            title="Profile Image"
            description="A photo or image URL used to identify your account."
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-12 after:border-[#D8C5B2]/60">
                {user.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={`${user.name}'s profile image`}
                    referrerPolicy="no-referrer"
                  />
                ) : null}
                <AvatarFallback className="bg-[#F7F3EE] text-sm font-medium text-[#A58B73]">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-sm text-[#625D56]">
                {user.image ? "Current image" : "No image added yet"}
              </span>
            </div>
          </EditCard>
        </div>

        <p className="mt-5 text-xs leading-5 text-[#625D56]">
          Role and account status are not editable. Contact a SalonBook
          administrator if one of them needs to change.
        </p>
      </div>
    </div>
  );
};

export default EditProfilePage;
