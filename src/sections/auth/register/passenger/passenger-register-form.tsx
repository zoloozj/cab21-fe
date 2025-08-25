"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import PasswordForm from "@/sections/components/password-form";
import PassengerMainInfo from "@/sections/auth/register/passenger/main-info";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    firstName: z.string().min(1, { message: "" }),
    lastName: z.string().min(1, { message: "" }),
    registryNumber: z.string().min(1, { message: "" }),
    password: z.string().min(1, { message: "" }),
    confirmPassword: z.string().min(1, { message: "" }),
    email: z.email().min(1, { message: "" }),
    birthday: z.string({ message: "" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг тохирохгүй байна!",
    path: ["confirmPassword"],
  });

export default function PassengerRegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      registryNumber: "",
      password: "",
      confirmPassword: "",
      email: "",
      birthday: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/auth", body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast("Амжилттай бүртгүүллээ!");
      router.push("auth/login");
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { confirmPassword, ...rest } = data;
    const body = {
      ...rest,
      serviceUrl: "api/user/create",
      role: "user",
      username: data.email,
    };
    mutation.mutate(body);
  }

  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col px-12 justify-start w-full mx-auto sm:max-w-xl py-10 h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
          {step === 1 && <PassengerMainInfo setStep={setStep} />}
          {step === 2 && (
            <PasswordForm setStep={setStep} isLoading={mutation.isPending} />
          )}
        </form>
      </Form>
    </div>
  );
}
