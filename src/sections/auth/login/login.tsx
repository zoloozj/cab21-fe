"use client";

import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { useUser } from "@/lib/user-provider";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "@/components/ui/form";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import RHFInput from "@/components/hook-form/rhf-input";
import PasswordInput from "@/app/auth/components/password-input";
import RFHCheckbox from "@/components/hook-form/rhf-checkbox";

const FormSchema = z.object({
  username: z.string().min(2, { message: "" }),
  password: z.string().min(4, { message: "" }),
  remember: z.boolean().optional(),
});

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();

  const username = localStorage.getItem("rememberedEmail") || "";

  const defaultValues = useMemo(
    () => ({
      username,
      password: "",
      remember: !!username,
    }),
    [username]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const { data } = await axios.post("/api/login", body, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    },
    onSuccess: (user) => {
      toast("Тавтай морил!");
      setUser(user.user);
      const from = searchParams.get("from");
      router.push(from || "/");
    },
    onError: (error: any) => {
      if (error.status === 401)
        toast.error("Хэрэглэгчийн нэр, нууц үг буруу байна!");
      // toast(error.message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { remember, username, ...rest } = data;
    if (remember) {
      localStorage.setItem("rememberedEmail", data.username);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    mutation.mutate(data);
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
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
            />
            <RHFInput
              name="username"
              placeholder="Утасны дугаар"
              className="pl-10 py-4 h-12 bg-white"
              type="number"
            />
          </div>
          <PasswordInput name="password" />
          <div className="w-full flex justify-between items-center mt-6 text-xs">
            <span className="text-gray-500 flex gap-2">
              <RFHCheckbox
                name="remember"
                placeholder=""
                item={{
                  label: "Нэвтрэх нэр сануулах",
                  value: true,
                }}
              />
            </span>
            <Link href="/forgot-password" className="text-[#FFB300]">
              Нууц үг мартсан?
            </Link>
          </div>
          <div className="text-center w-full mb-3">
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
