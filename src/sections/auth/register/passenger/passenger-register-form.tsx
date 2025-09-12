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
import PasswordForm from "@/sections/auth/components/password-form";
import PassengerMainInfo from "@/sections/auth/components/main-info";

const FormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    registryNumber: z.string(),
    password: z
      .string()
      .min(6, { message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой." }),
    confirmPassword: z.string(),
    email: z.email({ message: "Мэйл хаяг оруулна уу!" }),
    birthday: z.string(),
    phone: z.string(),
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
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/user-create", body);
      return res.data;
    },
    onSuccess: (data) => {
      toast("Амжилттай бүртгүүллээ!");
      router.push("auth/login");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.error || "Алдаа гарлаа, дахин оролдоно уу!",
        { position: "top-center" }
      );
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { confirmPassword, ...rest } = data;
    const body = {
      ...rest,
      role: "user",
      username: data.phone,
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
            <PasswordForm
              setStep={setStep}
              isLoading={mutation.isPending}
              prev={1}
            />
          )}
        </form>
      </Form>
    </div>
  );
}
