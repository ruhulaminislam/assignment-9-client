"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "../../profile-utils";
import { CircleAlert, ImageIcon, Info, Save } from "lucide-react";
import { updateAdminProfile } from "@/data/users";
import { toast, Toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const inputClasses =
  "h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";

function isValidImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ImageForm({
  currentImage,
  name,
  userId,
}: {
  currentImage: string;
  name: string;
  userId: string;
}) {
  const [imageUrl, setImageUrl] = useState(currentImage);
  const [error, setError] = useState<string | null>(null);
  const [previewFailed, setPreviewFailed] = useState(false);

  const trimmedUrl = imageUrl.trim();
  const showPreview = trimmedUrl.length > 0 && !previewFailed;
  const router = useRouter();

  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);
    const nextImage = String(values.image ?? "").trim();

    if (!isValidImageUrl(nextImage)) {
      setError("Enter a full image URL that starts with http:// or https://.");
      return;
    }

    setError(null);

    // Ready for the PATCH endpoint. Later this becomes:
    // updateAdminProfile(userId, preparedUpdate)
    const preparedUpdate = { image: nextImage };
    const response = await updateAdminProfile(userId, preparedUpdate);
    if(response.modifiedCount > 0){
      console.log(`Prepared profile update for ${userId}:`, response);
      toast.add({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      router.refresh();
    }else{
      toast.add({
        title: "Profile update failed",
        description: "Your profile update failed. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-[#F7F3EE] text-2xl font-medium text-[#A58B73] ring-1 ring-[#D8C5B2]/70">
            {showPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={trimmedUrl}
                src={trimmedUrl}
                alt="Profile image preview"
                referrerPolicy="no-referrer"
                onError={() => setPreviewFailed(true)}
                className="size-full object-cover"
              />
            ) : (
              <span aria-hidden="true">{getInitials(name)}</span>
            )}
          </div>
          <span className="text-[11px] text-[#625D56]">
            {showPreview ? "Live preview" : "Preview"}
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <Label
            htmlFor="profile-image"
            className="text-sm font-medium text-[#292824]"
          >
            Image URL
          </Label>

          <Input
            id="profile-image"
            name="image"
            type="url"
            inputMode="url"
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value);
              setPreviewFailed(false);
              setError(null);
            }}
            placeholder="https://example.com/your-photo.jpg"
            aria-invalid={Boolean(error)}
            aria-describedby="profile-image-help"
            className={inputClasses}
          />

          <p id="profile-image-help" className="text-xs leading-5 text-[#625D56]">
            Use a public link to a JPG, PNG or WEBP image. File upload will be
            added with ImgBB later.
          </p>

          {error ? (
            <p
              role="alert"
              className="flex items-center gap-1.5 text-xs font-medium text-[#B94343]"
            >
              <CircleAlert
                aria-hidden="true"
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
              />
              {error}
            </p>
          ) : null}
        </div>
      </div>

      {!showPreview ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#F7F3EE] px-3 py-2 text-xs text-[#625D56] ring-1 ring-[#D8C5B2]/50">
          <ImageIcon
            aria-hidden="true"
            className="size-3.5 shrink-0 text-[#A58B73]"
            strokeWidth={1.75}
          />
          {trimmedUrl
            ? "The image could not be loaded. Check that the URL points directly to an image."
            : "Add a URL to see a preview of your profile image."}
        </div>
      ) : null}

      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#D8C5B2]/70 bg-[#F7F3EE] p-3.5">
        <Info
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-[#A58B73]"
          strokeWidth={1.75}
        />
        <p className="text-xs leading-5 text-[#625D56]">
         Your updated image will be reflected across the admin dashboard and profile.
        </p>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#D8C5B2]/60 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href="/dashboards/admin/myprofile"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D8C5B2] bg-white px-5 text-sm font-medium text-[#292824] transition-colors hover:border-[#A58B73] hover:bg-[#F7F3EE] focus-visible:ring-2 focus-visible:ring-[#A58B73]/40 focus-visible:outline-none"
        >
          Cancel
        </Link>

        <Button
          type="submit"
          className="h-11 gap-2 rounded-lg bg-[#292824] px-5 text-sm font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40"
        >
          <Save aria-hidden="true" strokeWidth={1.75} />
          Save Image
        </Button>
      </div>
    </form>
  );
}
