"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import PaymentInfo from "./components/payment";
import FromSelect from "./components/from-select";
import ReturnSelect from "./components/return-select";
import PassengerNumber from "./components/passenger-number";
import TravelDateSelect from "./components/travel-date-select";
import DestinationSelect from "./components/destination-select";

const FormSchema = z.object({
  phone: z.string().min(2, { message: "" }),
  payment: z.number().min(2, { message: "" }),
  passengerNumber: z.number().min(1, { message: "" }),
});

export default function DriverTravelForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      payment: 0,
      passengerNumber: 1,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    console.log(data);
  }

  const [step, setStep] = useState(1);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-[90%] overflow-hidden p-4"
      >
        {step === 1 && <FromSelect setStep={setStep} />}
        {step === 2 && <DestinationSelect setStep={setStep} />}
        {step === 3 && <TravelDateSelect setStep={setStep} />}
        {step === 4 && <PaymentInfo setStep={setStep} />}
        {step === 5 && <PassengerNumber setStep={setStep} />}
        {step === 6 && <ReturnSelect setStep={setStep} />}
      </form>
    </Form>
  );
}
