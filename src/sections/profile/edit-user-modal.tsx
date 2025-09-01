"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserEditForm from "@/sections/auth/register/passenger/user-edit-form";

interface Props {
  userId: number;
}

export default function EditUserModal({ userId }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="text-primary underline">
        Мэдээлэл шинэчлэх
      </DialogTrigger>
      <DialogContent className="h-3/4 overflow-hidden pb-3">
        <DialogTitle></DialogTitle>
        <UserEditForm />
      </DialogContent>
    </Dialog>
  );
}
