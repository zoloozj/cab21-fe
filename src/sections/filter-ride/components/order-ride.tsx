import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ride } from "@/sections/types";
import { Form } from "@/components/ui/form";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFInput from "@/components/hook-form/rhf-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  ride: Ride;
}

const FormSchema = z.object({
  passengerSeat: z.number().min(1, { message: "" }).max(10, { message: "" }),
});

export default function OrderRide({ ride }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const { data } = await axios.post("/api/req", body);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Амжилттай захиаллаа!");
      router.refresh();
    },
    onError: (error) => {
      toast(error.message);
    },
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      passengerSeat: 1,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const finalValue = {
      rideId: ride.id,
      seatCount: data.passengerSeat,
      serviceUrl: "api/booking/rides/book",
    };
    mutation.mutate(finalValue);
  }
  const { watch, setValue } = form;
  const passengerN = watch("passengerSeat");
  const disabled = ride.capacity === ride.passenger_count;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={disabled}>
        <div
          className={cn(
            "bg-[#6853BD] flex text-white gap-2 justify-center items-center text-sm rounded-lg font-semibold py-2 px-6 cursor-pointer",
            disabled && "bg-[#9280db]"
          )}
        >
          Сонгох
          <Iconify icon="solar:arrow-right-linear" color="white" width={20} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Та аялалд бүртгүүлэхдээ итгэлтэй байна уу?</DialogTitle>
        {/* <DialogDescription> */}
        <DialogDescription className="text-justify mb-3">
          Та {ride.start_place} ----- {ride.end_place} чиглэлд {ride.start_time}{" "}
          цагт хөдлөх {ride.plate} улсын дугаартай авто машинд бүртгүүлэх гэж
          байна!
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full overflow-hidden p-4 lg:max-w-2xl lg:mx-auto"
          >
            <div className="flex justify-evenly items-center mb-6">
              <Iconify
                icon="solar:minus-circle-linear"
                width={50}
                className="cursor-pointer"
                onClick={() => {
                  if (passengerN !== 1) {
                    setValue("passengerSeat", passengerN - 1);
                  }
                }}
              />
              <RHFInput
                name="passengerSeat"
                className="h-12 text-center text-gray-800 font-bold text-2xl w-20 bg-white"
                type="number"
                disabled
              />
              <Iconify
                icon="solar:add-circle-linear"
                width={50}
                className="cursor-pointer"
                onClick={() => {
                  if (passengerN < ride.capacity - ride.passenger_count)
                    setValue("passengerSeat", passengerN + 1);
                }}
              />
            </div>
            <div className="flex gap-3 justify-around">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-12 flex-1"
              >
                Буцах
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="h-12 flex-1 cursor-pointer"
              >
                {mutation.isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Бүртгүүлэх"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* </DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
}
