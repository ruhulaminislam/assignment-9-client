"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ImageIcon,
  Loader2,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";
import { Playfair_Display } from "next/font/google";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serviceCategories } from "@/data/categories";
import { updateService, type Service, type ServiceStatus } from "@/data/services";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });

interface EditServiceButtonProps {
  service: Service;          // ✅ সঠিক type
  className?: string;
  withLabels?: boolean;
}

// ✅ শুধু যে field গুলো edit হবে সেগুলো
type UpdateServiceData = Pick<
  Service,
  "serviceName" | "category" | "description" | "price" | "duration" | "image" | "status"
> & { updatedAt: string };

const inputClasses =
  "h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";
const selectClasses =
  "h-12 w-full appearance-none rounded-lg border border-[#D8C5B2] bg-white pr-10 pl-4 text-base text-[#292824] transition-colors outline-none hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";
const textareaClasses =
  "min-h-32 rounded-lg border-[#D8C5B2] bg-white px-4 py-3 text-base leading-6 text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base";
const labelClasses = "text-sm font-medium text-[#292824]";
const cardClasses =
  "rounded-2xl bg-white p-5 ring-1 ring-[#D8C5B2]/70 shadow-[0_18px_40px_-34px_rgba(41,40,36,0.35)] sm:p-6";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function EditServiceButton({
  service,
  className = "",
  withLabels = false,
}: EditServiceButtonProps) {
  const router = useRouter();
  const uid = useId(); // ✅ প্রতিটি instance-এর জন্য unique id
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(service.image ?? ""); // ✅ default image
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dialog খোলার সময় সব state আবার service-এর মূল data-তে ফিরিয়ে আনা
  const handleOpenChange = (next: boolean) => {
    if (next) {
      setImageUrl(service.image ?? "");
      setSelectedFile(null);
      setError(null);
    }
    setOpen(next);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error("Image upload failed");

      setSelectedFile(file);
      setImageUrl(data.data.url);
    } catch (err) {
      console.error("Image upload error:", err);
      setError("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const values = Object.fromEntries(new FormData(event.currentTarget));

    const updatedData: UpdateServiceData = {
      serviceName: values.serviceName as string,
      category: values.category as string,
      description: values.description as string,
      price: Number(values.price),
      duration: Number(values.duration),
      image: imageUrl,
      
      updatedAt: new Date().toISOString(), // ✅ type string
    };

    try {
      const result = await updateService(service._id, updatedData);
      console.log("Update response:", result);

      setOpen(false);
      router.refresh(); // ✅ list-এ নতুন data দেখানোর জন্য
    } catch (err) {
      console.error("Update failed:", err);
      setError("Could not save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            aria-label={`Edit ${service.serviceName}`}
            title="Edit service"
            className={`${className} text-[#625D56] hover:bg-[#F7F3EE] hover:text-[#292824]`}
          >
            <Pencil aria-hidden="true" strokeWidth={1.75} />
            {withLabels ? "Edit" : null}
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit service</DialogTitle>
          <DialogDescription>
            Update the details of this service, then click save.
          </DialogDescription>
        </DialogHeader>

        {/* ✅ মাত্র একটি form, footer-ও এর ভিতরে */}
        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]"
        >
          {/* ---------- Service Details ---------- */}
          <div className={cardClasses}>
            <h2 className={`${playfair.className} text-xl font-medium text-[#292824]`}>
              Service Details
            </h2>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor={`${uid}-name`} className={labelClasses}>
                  Service Name
                </Label>
                <Input
                  id={`${uid}-name`}
                  name="serviceName"
                  defaultValue={service.serviceName}
                  required
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${uid}-category`} className={labelClasses}>
                  Service Category
                </Label>
                <div className="relative">
                  <select
                    id={`${uid}-category`}
                    name="category"
                    required
                    defaultValue={service.category}
                    className={selectClasses}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {serviceCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#A58B73]"
                    strokeWidth={1.75}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${uid}-description`} className={labelClasses}>
                  Description
                </Label>
                <Textarea
                  id={`${uid}-description`}
                  name="description"
                  rows={4}
                  defaultValue={service.description}
                  required
                  className={textareaClasses}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`${uid}-price`} className={labelClasses}>
                    Price (USD)
                  </Label>
                  <Input
                    id={`${uid}-price`}
                    name="price"
                    type="number"
                    inputMode="decimal"
                    min="0.01"
                    step="0.01"
                    defaultValue={service.price}
                    required
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${uid}-duration`} className={labelClasses}>
                    Duration (minutes)
                  </Label>
                  <Input
                    id={`${uid}-duration`}
                    name="duration"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1"
                    defaultValue={service.duration}
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* <fieldset className="space-y-2">
                <legend className={labelClasses}>Service Status</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["active", "inactive"] as const).map((status) => (
                    <label
                      key={status}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#D8C5B2] bg-white p-4 transition-colors hover:border-[#C4AC96] has-[:checked]:border-[#A58B73] has-[:checked]:bg-[#F7F3EE]"
                    >
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        defaultChecked={service.status === status} // ✅ default status
                        className="mt-0.5 size-4 shrink-0 accent-[#A58B73]"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium capitalize text-[#292824]">
                          {status}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-[#625D56]">
                          {status === "active"
                            ? "Visible on the public site and open for booking."
                            : "Hidden from customers until you activate it."}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset> */}
            </div>
          </div>

          {/* ---------- Service Image ---------- */}
          <div className={cardClasses}>
            <h2 className={`${playfair.className} text-xl font-medium text-[#292824]`}>
              Service Image
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#625D56]">
              Choose a clear photo from your device. Optional.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              aria-label="Service image file"
              onChange={handleImageChange}
              className="sr-only"
            />

            <div className="mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-[#D8C5B2] bg-[#F7F3EE]">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Preview of the service"
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
                  <ImageIcon aria-hidden="true" className="size-6 text-[#A58B73]" strokeWidth={1.75} />
                  <p className="text-sm font-medium text-[#292824]">No image selected</p>
                  <p className="text-xs text-[#625D56]">JPG, PNG or WEBP</p>
                </div>
              )}
            </div>

            {selectedFile ? (
              <div className="mt-3 rounded-lg bg-[#F7F3EE] px-3 py-2 ring-1 ring-[#D8C5B2]/50">
                <p className="truncate text-xs font-medium text-[#292824]">{selectedFile.name}</p>
                <p className="mt-0.5 text-[11px] text-[#625D56]">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="h-10 gap-2 rounded-lg border-[#D8C5B2] bg-white px-3.5 text-sm font-medium text-[#292824] hover:border-[#A58B73] hover:bg-[#F7F3EE]"
              >
                {isUploading ? (
                  <Loader2 aria-hidden="true" className="animate-spin" />
                ) : (
                  <ImageIcon aria-hidden="true" strokeWidth={1.75} />
                )}
                {isUploading ? "Uploading..." : imageUrl ? "Change Image" : "Choose Image"}
              </Button>

              {imageUrl ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleRemoveImage}
                  className="h-10 gap-2 rounded-lg px-3 text-sm font-medium text-[#625D56] hover:bg-[#FBE9E7] hover:text-[#B94343]"
                >
                  <Trash2 aria-hidden="true" strokeWidth={1.75} />
                  Remove
                </Button>
              ) : null}
            </div>
          </div>

          {/* ---------- Footer ---------- */}
          <div className="lg:col-span-2">
            {error ? (
              <p role="alert" className="mb-3 text-sm text-[#B94343]">
                {error}
              </p>
            ) : null}

            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                }
              />
              <Button
                type="submit"
                disabled={isSaving || isUploading}
                className="gap-2 bg-[#292824] text-white hover:bg-[#292824]/90"
              >
                {isSaving ? (
                  <Loader2 aria-hidden="true" className="animate-spin" />
                ) : (
                  <Save aria-hidden="true" strokeWidth={1.75} />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}