"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import PasswordInput from "@/app/auth/components/password-input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

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

interface Props {
  phone: string;
  setOpen: (a: boolean) => void;
}

export default function ChangePasswordForm({ phone, setOpen }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/req", body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast("Амжилттай Засварлалаа!");
      setOpen(false);
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

    mutation.mutate({ ...rest, phone, serviceUrl: "api/user/change-password" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
        <div className="m-2 flex flex-col gap-3 items-end">
          <PasswordInput name="newPassword" />
          <PasswordInput name="confirmPassword" placeholder="Нууц үг давтах" />
          <Button type="submit" className="w-max" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Шинэчлэх"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
