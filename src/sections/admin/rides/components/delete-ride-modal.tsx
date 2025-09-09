import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import { Ride } from "@/sections/types";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/lib/request";
import { toast } from "sonner";

interface Props {
  ride: Ride;
}

export default function DeleteRideModal({ ride }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await deleteRequest(url);
    },
    onSuccess: () => {
      handleClose();
      toast.success("Амжилттай устгалаа!");
      queryClient.invalidateQueries({ queryKey: ["getRidesGrid"] });
    },
    onError: (error) => {
      toast.error("Алдаа гарлаа та дараа дахин оролдоно уу!");
    },
  });

  const handleClose = useCallback(() => setOpen(false), []);
  const handleDelete = useCallback(async () => {
    mutation.mutate(`api/rides/delete/${ride.id}`);
  }, [ride]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost">
          <Iconify icon="solar:trash-bin-2-bold" color="#dc2626" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[#dc2626]">Устгах</DialogTitle>
          <DialogDescription>
            Та {ride.start_time} цагт хөдлөх аялалыг устгах гэж байна!
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex gap-2 justify-between">
          <Button type="button" variant="outline" onClick={handleClose}>
            Буцах
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Устгах
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
