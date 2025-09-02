"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { useUser } from "@/lib/user-provider";
import CabInfo from "@/sections/auth/register/cab/cab-info";

const FormSchema = z.object({
  plate: z.string().regex(/^\d{4}[А-ЯЁҮӨҺ]{3}$/i, {
    message: "Улсын дугаарын формат буруу байна!",
  }),
  model: z.string().min(2, { message: "Заавал бөглөх талбар" }).max(100),
  passengerSeats: z.string().min(1, { message: "Заавал бөглөх талбар" }).max(2),
});

export default function CabRegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plate: "",
      model: "",
      passengerSeats: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/req", body);
      return res.data;
    },
    onSuccess: (data) => {
      toast("Амжилттай бүртгүүллээ!");
      router.back();
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.error || "Алдаа гарлаа, дахин оролдоно уу!",
        { position: "top-center" }
      );
    },
  });
  const { user } = useUser();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const body = {
      ...data,
      serviceUrl: "api/cabs/create",
      driverName: user?.firstName,
      driverId: user?.id,
    };
    mutation.mutate(body);
  }

  return (
    <div className="flex flex-col px-12 justify-start mx-auto items-center w-full sm:max-w-xl py-10 h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
          <CabInfo />
        </form>
      </Form>
    </div>
  );
}
