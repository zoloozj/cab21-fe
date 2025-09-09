import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import { Ride } from "@/sections/types";
import { useEffect, useState } from "react";
import DriverTravelForm from "@/sections/driver/driver-travel-form";

interface Props {
  ride: Ride;
}

export default function EditRideModal({ ride }: Props) {
  const [open, setOpen] = useState(false);
  const [cab, setCab] = useState<any>();
  useEffect(() => {}, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost">
          <Iconify icon="solar:pen-bold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[#fbbf24]">Засварлах</DialogTitle>
          {/* <DialogDescription>
            Та {ride.start_time} цагт хөдлөх аялалыг устгах гэж байна!
          </DialogDescription> */}
        </DialogHeader>
        <DriverTravelForm cabId={1} editD={ride} />
      </DialogContent>
    </Dialog>
  );
}
