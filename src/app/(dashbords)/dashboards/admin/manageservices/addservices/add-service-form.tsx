"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ImageIcon,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { Playfair_Display } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { addService, type NewService } from "@/data/services";
import { toast } from "@/components/ui/toast";
import { redirect } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

// Special option value: it can never match a real category name.
const ADD_NEW_CATEGORY = "__add_new__";

const inputClasses =
  "h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";

const selectClasses =
  "h-12 w-full appearance-none rounded-lg border border-[#D8C5B2] bg-white pr-10 pl-4 text-base text-[#292824] transition-colors outline-none hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";

const textareaClasses =
  "min-h-32 rounded-lg border-[#D8C5B2] bg-white px-4 py-3 text-base leading-6 text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";

const labelClasses = "text-sm font-medium text-[#292824]";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AddServiceForm({ categories }: { categories: string[] }) {
  const { data: session } = authClient.useSession();
  const admin = session?.user;
  console.log("Admin:", admin);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Category: is the admin typing a brand new category?
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Release the object URL when it is replaced or the page unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

 
const handleImageChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) {
    setSelectedFile(null);
    setPreviewUrl(null);
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error("Image upload failed");
    }

    setSelectedFile(file);
    setPreviewUrl(data.data.url);

  } catch (error) {
    console.error("Image upload error:", error);
  }
};

const handleRemoveImage = () => {
  setSelectedFile(null);
  setPreviewUrl(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const isNew = event.target.value === ADD_NEW_CATEGORY;
    setIsAddingNewCategory(isNew);

    if (!isNew) {
      setNewCategory("");
    }
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);

    // Pick the category source: typed text or the dropdown value.
    const rawCategory = isAddingNewCategory
      ? newCategory
      : (values.category as string);

    // "  Hair   Care " -> "Hair Care"
    const cleanedCategory = rawCategory.trim().replace(/\s+/g, " ");

    if (cleanedCategory === "") {
      return;
    }

    // "hair" reuses the existing "Hair" instead of creating a duplicate.
    const category =
      categories.find(
        (item) => item.toLowerCase() === cleanedCategory.toLowerCase()
      ) ?? cleanedCategory;

    const preparedService: NewService = {
      serviceName: values.serviceName as string,
      category: category,
      description: values.description as string,
      price: Number(values.price),
      duration: Number(values.duration),
      // The image URL is attached only after a real ImgBB upload.
      image: previewUrl || "",
      status: "active",
      createdBy: admin?.id ?? "",
      createdByEmail: admin?.email ?? "",
      createdByName: admin?.name ?? "",
    };
  
    console.log("Prepared service:", preparedService);
    console.log("Selected image file:", selectedFile);
    const addserviceapi=await addService(preparedService);
    console.log("Add service API response:", addserviceapi);
    if(addserviceapi.insertedId){
        toast.add({
        title: "Service added successfully",
        description: "The service has been added successfully",
        
        
      })
      redirect("/dashboards/admin/manageservices");
    
    }else{
      toast.add({
        title: "Service add failed",
        description: "The service has not been added successfully",
      })
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]"
    >
      <div className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6">
        <h2
          className={`${playfair.className} text-xl font-medium text-[#292824]`}
        >
          Service Details
        </h2>
        <p className="mt-1 text-xs leading-5 text-[#625D56]">
          Tell customers what the treatment includes, how long it takes and what
          it costs.
        </p>

        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="service-name" className={labelClasses}>
              Service Name
            </Label>
            <Input
              id="service-name"
              name="serviceName"
              type="text"
              placeholder="e.g. Premium Haircut"
              required
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-category" className={labelClasses}>
              Service Category
            </Label>

            <div className="relative">
              <select
                id="service-category"
                name="category"
                required
                defaultValue=""
                onChange={handleCategoryChange}
                className={selectClasses}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value={ADD_NEW_CATEGORY}>+ Add new category</option>
              </select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#A58B73]"
                strokeWidth={1.75}
              />
            </div>

            {isAddingNewCategory ? (
              <Input
                id="new-category"
                type="text"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="e.g. Skin Care"
                aria-label="New category name"
                required
                className={inputClasses}
              />
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-description" className={labelClasses}>
              Description
            </Label>
            <Textarea
              id="service-description"
              name="description"
              rows={4}
              placeholder="Describe the service, the products used and what the customer can expect."
              required
              className={textareaClasses}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="service-price" className={labelClasses}>
                Price (USD)
              </Label>
              <Input
                id="service-price"
                name="price"
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                required
                aria-describedby="service-price-hint"
                className={inputClasses}
              />
              <p id="service-price-hint" className="text-xs text-[#625D56]">
                Must be greater than 0.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-duration" className={labelClasses}>
                Duration (minutes)
              </Label>
              <Input
                id="service-duration"
                name="duration"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                placeholder="45"
                required
                aria-describedby="service-duration-hint"
                className={inputClasses}
              />
              <p id="service-duration-hint" className="text-xs text-[#625D56]">
                Estimated time in minutes.
              </p>
            </div>
          </div>

          {/* <fieldset className="space-y-2">
            <legend className={labelClasses}>Service Status</legend>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#D8C5B2] bg-white p-4 transition-colors hover:border-[#C4AC96] has-[:checked]:border-[#A58B73] has-[:checked]:bg-[#F7F3EE]">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  defaultChecked
                  className="mt-0.5 size-4 shrink-0 accent-[#A58B73]"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[#292824]">
                    Active
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-[#625D56]">
                    Visible on the public site and open for booking.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#D8C5B2] bg-white p-4 transition-colors hover:border-[#C4AC96] has-[:checked]:border-[#A58B73] has-[:checked]:bg-[#F7F3EE]">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  className="mt-0.5 size-4 shrink-0 accent-[#A58B73]"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[#292824]">
                    Inactive
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-[#625D56]">
                    Hidden from customers until you activate it.
                  </span>
                </span>
              </label>
            </div>
          </fieldset> */}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6">
        <h2
          className={`${playfair.className} text-xl font-medium text-[#292824]`}
        >
          Service Image
        </h2>
        <p className="mt-1 text-xs leading-5 text-[#625D56]">
          Choose a clear photo from your device. Optional.
        </p>

        <input
          ref={fileInputRef}
          id="service-image"
          name="imageFile"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          aria-label="Service image file"
          onChange={handleImageChange}
          className="sr-only"
        />

        <div className="mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-[#D8C5B2] bg-[#F7F3EE]">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Preview of the selected service image"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white text-[#A58B73] ring-1 ring-[#D8C5B2]/60">
                <ImageIcon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.75}
                />
              </span>
              <p className="text-sm font-medium text-[#292824]">
                No image selected
              </p>
              <p className="text-xs text-[#625D56]">JPG, PNG or WEBP</p>
            </div>
          )}
        </div>

        {selectedFile ? (
          <div className="mt-3 rounded-lg bg-[#F7F3EE] px-3 py-2 ring-1 ring-[#D8C5B2]/50">
            <p className="truncate text-xs font-medium text-[#292824]">
              {selectedFile.name}
            </p>
            <p className="mt-0.5 text-[11px] text-[#625D56]">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="h-10 gap-2 rounded-lg border-[#D8C5B2] bg-white px-3.5 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE] focus-visible:ring-[#A58B73]/40"
          >
            <ImageIcon aria-hidden="true" strokeWidth={1.75} />
            {selectedFile ? "Change Image" : "Choose Image"}
          </Button>

          {selectedFile ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleRemoveImage}
              className="h-10 gap-2 rounded-lg px-3 text-sm font-medium text-[#625D56] hover:bg-[#FBE9E7] hover:text-[#B94343] focus-visible:ring-[#B94343]/30"
            >
              <Trash2 aria-hidden="true" strokeWidth={1.75} />
              Remove
            </Button>
          ) : null}
        </div>

        <div className="mt-5 border-t border-[#D8C5B2]/60 pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={!selectedFile}
            title="Image upload will be connected later"
            className="h-10 w-full gap-2 rounded-lg border-[#D8C5B2] bg-white px-3.5 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE] focus-visible:ring-[#A58B73]/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload aria-hidden="true" strokeWidth={1.75} />
            Upload to ImageBB
          </Button>

          <p className="mt-2 text-[11px] leading-5 text-[#625D56]">
            Upload is not connected yet, so the selected file stays on this
            device.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#D8C5B2]/60 pt-5 sm:flex-row sm:items-center sm:justify-end lg:col-span-2">
        <Link
          href="/dashboards/admin/manageservices"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D8C5B2] bg-white px-5 text-sm font-medium text-[#292824] transition-colors hover:border-[#A58B73] hover:bg-[#F7F3EE] focus-visible:ring-2 focus-visible:ring-[#A58B73]/40 focus-visible:outline-none"
        >
          Cancel
        </Link>

        <Button
          type="submit"
          className="h-11 gap-2 rounded-lg bg-[#292824] px-5 text-sm font-medium text-white hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40"
        >
          <Plus aria-hidden="true" strokeWidth={1.75} />
          Add Service
        </Button>
      </div>
    </form>
  );
}