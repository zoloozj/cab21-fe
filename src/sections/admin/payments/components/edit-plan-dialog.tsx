import { useState } from "react";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubscriptionPlan } from "@/sections/types";
import SubscriptionPlanForm from "./subscription-plan-form";

interface Props {
  plan: SubscriptionPlan;
}

export default function EditPlanDialog({ plan }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-2 right-2"
          variant="outline"
          size="icon"
          // onClick={() => setOpen(true)}
        >
          <Iconify icon="lucide:edit-2" width={10} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Мэдээлэл засварлах</DialogTitle>
        <SubscriptionPlanForm setOpen={setOpen} editD={plan} />
      </DialogContent>
    </Dialog>
  );
}
