"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import PasswordForm from "@/sections/components/password-form";
import PassengerMainInfo from "@/sections/auth/register/passenger/main-info";

const FormSchema = z.object({
  phone: z.string().min(2, { message: "" }),
});

export default function PassengerRegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    console.log(data);
  }

  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col px-12 justify-start w-full mx-auto sm:max-w-xl py-10 h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
          {step === 1 && <PassengerMainInfo setStep={setStep} />}
          {step === 2 && (
            <PasswordForm setStep={setStep} isLoading={isLoading} />
          )}
        </form>
      </Form>
    </div>
  );
}
