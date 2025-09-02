import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ride } from "@/sections/types";
import Iconify from "@/components/ui/iconify";

interface Props {
  ride: Ride;
}

export default function OrderRide({ ride }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-[#6853BD]  flex text-white gap-2 justify-center items-center text-sm rounded-lg font-semibold py-2 px-6 cursor-pointer">
          Сонгох
          <Iconify icon="solar:arrow-right-linear" color="white" width={20} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Та аялалд бүртгүүлэхдээ итгэлтэй байна уу?</DialogTitle>
        <DialogDescription>
          <p className="text-justify mb-3">
            Та {ride.start_place} ----- {ride.end_place} чиглэлд{" "}
            {ride.start_time} цагт хөдлөх {ride.plate} улсын дугаартай авто
            машинд бүртгүүлэх гэж байна!
          </p>
          <div className="flex gap-2 justify-around">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Буцах
            </Button>
            <Button type="button">Зөвшөөрөх</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
