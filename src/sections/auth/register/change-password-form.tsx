import { z } from "zod";
import { Form } from "@/components/ui/form";

const FormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Нууц үг 6-с дээш оронтой байх ёстой!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Нууц үг тохирохгүй байна!",
    path: ["confirmPassword"],
  });

export default function ChangePasswordForm() {
  // return <div className="flex flex-col px-12 justify-start w-full mx-auto sm:max-w-xl py-10 h-screen">
  //   <Form {...form}>
  //     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full"></form></Form></div>
  return <></>;
}
