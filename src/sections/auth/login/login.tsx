"use client";

import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "@/components/ui/form";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import RHFInput from "@/components/hook-form/rhf-input";
import PasswordInput from "@/app/auth/components/password-input";

const FormSchema = z.object({
  username: z.string().min(2, { message: "" }),
  password: z.string().min(6, { message: "" }),
});

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
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
      toast("Тавтай морил!");
      Cookies.set("token", data.token, {
        expires: 7,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      const from = searchParams.get("from");
      router.push(from || "/");
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const body = {
      serviceUrl: "api/auth/login",
      ...data,
    };
    mutation.mutate(body);
  }

  return (
    <div className="flex flex-col px-12 justify-start w-full sm:max-w-96">
      <p className="text-xl font-bold">Нэвтрэх</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="relative h-12 w-full mb-3">
            <Iconify
              width={20}
              color="#667085"
              icon="solar:user-circle-linear"
              className="absolute left-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-500 z-10"
            />
            <RHFInput
              name="username"
              placeholder="Нэвтрэх нэр"
              className="pl-10 py-4 h-12 bg-white"
            />
          </div>
          <PasswordInput name="password" />
          <div className="w-full flex justify-between items-center mt-6 text-xs">
            <span className="text-gray-500">Нэвтрэх нэр сануулах</span>
            <Link href="" className="text-[#FFB300]">
              Нууц үг мартсан?
            </Link>
          </div>
          <div className="text-center w-full">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="mt-10 h-12 px-16 text-white font-bold text-lg rounded-xl cursor-pointer"
            >
              {mutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Нэвтрэх"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
