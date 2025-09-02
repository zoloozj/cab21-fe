"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import PaymentInfo from "./components/payment";
import FromSelect from "./components/from-select";
import { aimags, soums } from "@/components/constant";
import PassengerNumber from "./components/passenger-number";
import TravelDateSelect from "./components/travel-date-select";
import DestinationSelect from "./components/destination-select";
import axios from "axios";

const FormSchema = z.object({
  startPlace: z.string().min(1, { message: "" }),
  startPlaceSub: z.string().min(1, { message: "" }),
  endPlace: z.string().min(1, { message: "" }),
  endPlaceSub: z.string().min(1, { message: "" }),
  startDate: z.date().min(1, { message: "" }),
  startTime: z.string().min(2, { message: "" }),
  ticketPrice: z.number().min(1, { message: "" }),
  passengerSeat: z.number().min(1, { message: "" }).max(10, { message: "" }),
});

interface Props {
  cabId: number;
}

export default function DriverTravelForm({ cabId }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startPlace: "",
      startPlaceSub: "",
      endPlace: "",
      endPlaceSub: "",
      startDate: undefined,
      startTime: undefined,
      passengerSeat: 1,
    },
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const { data } = await axios.post("/api/req", body);
      return data;
    },
    onSuccess: () => {
      toast.success("Амжилттай");
      router.push("/");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const startPlace = aimags.find((a) => a.value === data.startPlace)?.label;
    const startPlaceSubT = soums.find(
      (s) => s.value === data.startPlaceSub
    )?.label;
    const endPlace = aimags.find((a) => a.value === data.endPlace)?.label;
    const endPlaceSubT = soums.find((s) => s.value === data.endPlaceSub)?.label;
    const startDateT = data.startDate.toLocaleDateString("en-CA");
    console.log(data.startDate, "DATE");
    const { endPlaceSub, startPlaceSub, startTime, startDate, ...rest } = data;
    const finalvalue = {
      ...rest,
      startTime: `${startDateT}T${data.startTime}:00Z`,
      startPlace: `${startPlace} - ${startPlaceSubT}`,
      endPlace: `${endPlace} - ${endPlaceSubT}`,
      serviceUrl: "api/rides/create",
      cabId,
    };
    mutation.mutate(finalvalue);
  }

  const [step, setStep] = useState(1);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full overflow-hidden p-4 lg:max-w-2xl lg:mx-auto"
      >
        {step === 1 && <FromSelect setStep={setStep} />}
        {step === 2 && <DestinationSelect setStep={setStep} />}
        {step === 3 && <TravelDateSelect setStep={setStep} />}
        {step === 4 && <PaymentInfo setStep={setStep} />}
        {step === 5 && (
          <PassengerNumber setStep={setStep} isLoading={mutation.isPending} />
        )}
      </form>
    </Form>
  );
}
