import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ChangePasswordForm from "./change-password-form";
import { UserDetail } from "@/sections/types";

interface Props {
  user: UserDetail;
}

export default function ChangePasswordDialog({ user }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Нууц үг солих
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user.last_name} {user.first_name}-н нууц үгийг солих
          </DialogTitle>
        </DialogHeader>
        <ChangePasswordForm phone={user.phone} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
