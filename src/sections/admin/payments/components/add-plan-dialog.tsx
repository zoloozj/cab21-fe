import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubscriptionPlanForm from "./subscription-plan-form";

export default function AddPlanDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Төлбөр нэмэх</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Төлбөр нэмэх</DialogTitle>
        <SubscriptionPlanForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
