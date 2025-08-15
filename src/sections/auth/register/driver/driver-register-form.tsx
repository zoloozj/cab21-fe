"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import IconInput from "@/components/main/icon-input";
import Iconify from "@/components/ui/iconify";
import Image from "next/image";
import MainInfo from "./main-info";

const FormSchema = z.object({
  phone: z.string().min(2, { message: "" }),
});

export default function DriverRegisterForm() {
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

  return (
    <div className="flex flex-col px-12 justify-start w-full sm:max-w-96 py-10">
      <div className="my-10 relative w-full">
        <Link href="/auth/register" className="flex items-center gap-2">
          <Iconify
            icon="solar:alt-arrow-left-linear"
            width={20}
            color="#6a7282"
          />{" "}
          <span className="hidden md:block text-gray-500">Буцах</span>
        </Link>
        <div className="flex justify-center w-full -mt-5">
          <Image
            src="/assets/logo2.svg"
            width={100}
            height={100}
            alt="Аваад явий"
          />
        </div>
      </div>
      <p className="text-xl font-bold">Ерөнхий мэдээлэл</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <MainInfo />
        </form>
      </Form>
    </div>
  );
}
