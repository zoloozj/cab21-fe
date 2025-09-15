"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/app/auth/components/password-input";
import { Button } from "@/components/ui/button";
import IconInput from "@/components/main/icon-input";
import { useCallback } from "react";
import { Loader2Icon } from "lucide-react";

const FormSchema = z
  .object({
    phone: z.string(),
    // .min(8, { message: "Утасны дугаар оруулна уу!" }),
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
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phone: "", newPassword: "", confirmPassword: "" },
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
      router.push("/auth/login");
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
    // console.log(data, "DATA");
    mutation.mutate({ ...rest, serviceUrl: "api/user/change-password" });
  }

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="h-screen flex items-center">
      <div className="flex flex-col px-12 justify-start w-full sm:max-w-96 mx-auto">
        <p className="text-xl font-bold">Нууц үг шинэчлэх</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-full"
          >
            <div className="m-2 flex flex-col gap-3 items-end">
              <IconInput
                placeholder="Утасны дугаар"
                icon="solar:phone-linear"
                name="phone"
              />
              <PasswordInput name="newPassword" />
              <div className="mt-3"></div>
              <PasswordInput
                name="confirmPassword"
                placeholder="Нууц үг давтах"
              />
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Буцах
                </Button>
                <Button type="submit" className="mx-auto flex-1">
                  {mutation.isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Шинэчлэх"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
