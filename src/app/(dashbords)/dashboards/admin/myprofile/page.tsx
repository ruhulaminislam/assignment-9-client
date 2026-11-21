import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import {
  CalendarDays,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileUser } from "./get-profile-user";
import { formatProfileDate, getInitials } from "./profile-utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

function ProfileRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 py-4 sm:grid sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:items-center sm:gap-4">
      <dt className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-[#8A8178] uppercase">
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
        {label}
      </dt>
      <dd className="text-sm break-words text-[#292824] sm:text-base">
        {children}
      </dd>
    </div>
  );
}

function RoleBadge({ role }: { role?: string }) {
  const isAdmin = role === "admin";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A58B73]/15 px-2.5 py-1 text-xs font-medium text-[#7A634D]">
      {isAdmin ? (
        <ShieldCheck aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
      ) : (
        <UserRound aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
      )}
      {isAdmin ? "Administrator" : "Customer"}
    </span>
  );
}

function StatusBadge({ isBlocked }: { isBlocked?: boolean }) {
  if (isBlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBE9E7] px-2.5 py-1 text-xs font-medium text-[#B94343] ring-1 ring-[#B94343]/20">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        Blocked
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F3EA] px-2.5 py-1 text-xs font-medium text-[#287A55] ring-1 ring-[#287A55]/20">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      Active
    </span>
  );
}

export const MyProfilePage = async () => {
  const user = await getProfileUser();
  const roleLabel = user.role === "admin" ? "Administrator" : "Customer";
  const isBlocked = Boolean(user.isBlocked);

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
              My Profile
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
              Review the information connected to your SalonBook account. Your
              name and profile image can be updated at any time.
            </p>
          </div>

          <Link
            href={`/dashboards/${user.role}/myprofile/edit`}
            className="inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-lg bg-[#292824] px-4 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#292824]/90 focus-visible:ring-2 focus-visible:ring-[#292824]/40 focus-visible:outline-none"
          >
            <Pencil aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Edit Profile
          </Link>
        </div>

        <div className="mt-8 grid items-start gap-5 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <section className="min-w-0 rounded-2xl bg-white p-6 text-center ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)]">
            <Avatar className="mx-auto size-24 after:border-[#D8C5B2]/60">
              {user.image ? (
                <AvatarImage
                  src={user.image}
                  alt={`${user.name}'s profile image`}
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <AvatarFallback className="bg-[#F7F3EE] text-2xl font-medium text-[#A58B73]">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <h2 className="mt-5 text-lg font-semibold break-words text-[#292824]">
              {user.name}
            </h2>
            <p className="mt-1 text-sm break-all text-[#625D56]">{user.email}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <RoleBadge role={user.role} />
              <StatusBadge isBlocked={isBlocked} />
            </div>

            <p className="mt-5 border-t border-[#D8C5B2]/60 pt-4 text-xs leading-5 text-[#625D56]">
              Member since {formatProfileDate(user.createdAt)}
            </p>
          </section>

          <section className="min-w-0 rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6">
            <h2
              className={`${playfair.className} text-xl font-medium text-[#292824]`}
            >
              Account Information
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#625D56]">
              These details come from your current signed-in session.
            </p>

            <dl className="mt-3 divide-y divide-[#D8C5B2]/50">
              <ProfileRow icon={UserRound} label="Full Name">
                {user.name}
              </ProfileRow>

              <ProfileRow icon={Mail} label="Email Address">
                <span className="break-all">{user.email}</span>
              </ProfileRow>

              <ProfileRow icon={ShieldCheck} label="Role">
                {roleLabel}
              </ProfileRow>

              <ProfileRow icon={ShieldCheck} label="Account Status">
                <span className="inline-flex items-center gap-2">
                  <StatusBadge isBlocked={isBlocked} />
                  <span className="text-xs text-[#625D56]">
                    {isBlocked
                      ? "Access is currently restricted."
                      : "Your account is in good standing."}
                  </span>
                </span>
              </ProfileRow>

              <ProfileRow icon={CalendarDays} label="Member Since">
                {formatProfileDate(user.createdAt)}
              </ProfileRow>
            </dl>
          </section>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-[#D8C5B2] bg-[#FBF8F4] p-4">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-[#A58B73]"
            strokeWidth={1.75}
          />
          <p className="text-xs leading-5 text-[#625D56]">
            You can edit your display name and profile image. Your role and
            account status are managed by SalonBook and cannot be changed from
            your profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
