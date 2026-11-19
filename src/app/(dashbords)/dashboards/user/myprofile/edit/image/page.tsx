import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import { ArrowLeft } from "lucide-react";

import { getProfileUser } from "../../get-profile-user";
import ImageForm from "./image-form";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const EditImagePage = async () => {
  const user = await getProfileUser();

  return (
    <div className={`${inter.className} bg-[#F7F3EE] px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/dashboards/admin/myprofile/edit"
          className="inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-[#D8C5B2] bg-white px-3.5 text-sm font-medium text-[#292824] transition-colors hover:border-[#A58B73] hover:bg-[#F7F3EE] focus-visible:ring-2 focus-visible:ring-[#A58B73]/40 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Edit Profile
        </Link>

        <p className="mt-6 text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
          Profile Settings
        </p>

        <h1
          className={`${playfair.className} mt-3 text-3xl leading-tight font-medium tracking-tight text-[#292824] sm:text-4xl`}
        >
          Change Profile Image
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
          Add a direct image URL to update the photo shown on your account.
        </p>

        <ImageForm
          currentImage={user.image ?? ""}
          name={user.name}
          userId={user.id}
        />
      </div>
    </div>
  );
};

export default EditImagePage;
