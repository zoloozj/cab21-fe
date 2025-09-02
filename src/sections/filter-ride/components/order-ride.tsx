import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import PassengerNumber from "@/sections/driver/components/passenger-number";
import { useMutation } from "@tanstack/react-query";

interface Props {
  ride: Ride;
}

const FormSchema = z.object({
  passengerSeat: z.number().min(1, { message: "" }).max(10, { message: "" }),
});

export default function OrderRide({ ride }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const mutation = useMutation({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      passengerSeat: 1,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full overflow-hidden p-4 lg:max-w-2xl lg:mx-auto"
            >
              <PassengerNumber notPrev isLoading={mutation.isPending} />
              <div className="flex gap-2 justify-around">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Буцах
                </Button>
                <Button type="submit">Зөвшөөрөх</Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
