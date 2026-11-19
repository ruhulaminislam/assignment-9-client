import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from 'lucide-react'
  const wrapperClasses = withLabels
    ? "flex flex-wrap items-center gap-1"
    : "flex items-center overflow-hidden rounded-lg border border-[#D8C5B2]/70 bg-white";

  const buttonClasses = withLabels
    ? "h-8 gap-1.5 rounded-lg border border-[#D8C5B2]/70 bg-white px-2 text-xs"
    : "size-8 rounded-none border-l-[#D8C5B2]/60 px-0 first:border-l-transparent";

  const focusClasses =
    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#292824]/40";

 const UpdateServicePage = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button
                type="button"
                variant="ghost"
                aria-label={`Delete ${service.serviceName}`}
                title="Delete service"
                className={`${buttonClasses} ${focusClasses} text-[#625D56] hover:bg-[#FBE9E7] hover:text-[#B94343]`}
              >
                <Trash2 aria-hidden="true" strokeWidth={1.75} />
                {withLabels ? "Delete" : null}
              </Button>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateServicePage
