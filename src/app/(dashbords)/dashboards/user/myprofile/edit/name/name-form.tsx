"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert, Info, Save } from "lucide-react";
import { updateAdminProfile } from "@/data/users";
import { toast, Toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const inputClasses =
  "h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";

export default function NameForm({
  currentName,
  userId,
}: {
  currentName: string;
  userId: string;
}) {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);
    const nextName = String(values.name ?? "").trim();

    if (nextName.length < 2) {
      setError("Enter a name with at least 2 characters.");
      return;
    }

    setError(null);

    // Ready for the PATCH endpoint. Later this becomes:
    // updateAdminProfile(userId, preparedUpdate)
    const preparedUpdate = { name: nextName };
     const response = await updateAdminProfile(userId, preparedUpdate);
    console.log(`Prepared profile update for ${userId}:`, response);
    if (response.modifiedCount > 0) {
     toast.add({
      title: "Success",
      description: "Profile name updated successfully",
     })
     router.refresh();
  }else{
    toast.add({
      title: "Error",
      description: "Profile name update failed",
     })
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="profile-name" className="text-sm font-medium text-[#292824]">
          Display Name
        </Label>

        <Input
          id="profile-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError(null);
          }}
          placeholder="Your full name"
          required
          minLength={2}
          maxLength={80}
          aria-invalid={Boolean(error)}
          aria-describedby="profile-name-help"
          className={inputClasses}
        />

        <p id="profile-name-help" className="text-xs leading-5 text-[#625D56]">
          Customer-facing pages and the dashboard use this name.
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

      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#D8C5B2]/70 bg-[#F7F3EE] p-3.5">
        <Info
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-[#A58B73]"
          strokeWidth={1.75}
        />
        <p className="text-xs leading-5 text-[#625D56]">
          Your display name will be updated across your admin profile and dashboard.
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
          Save Name
        </Button>
      </div>
    </form>
  );
}
