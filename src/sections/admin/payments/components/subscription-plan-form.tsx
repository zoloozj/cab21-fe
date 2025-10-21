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
import RHFInput from "@/components/hook-form/rhf-input";
import RFHCheckbox from "@/components/hook-form/rhf-checkbox";
import { SubscriptionPlan } from "@/sections/types";
import { useMemo } from "react";

const FormSchema = z.object({
  code: z.string().min(4, { message: "Заавал бөглөх талбар" }),
  name: z.string().min(4, { message: "Заавал бөглөх талбар" }),
  durationMonths: z.string().min(1, { message: "Заавал бөглөх талбар" }),
  isActive: z.boolean(),
  price: z.string().min(1, { message: "Заавал бөглөх талбар" }),
});

interface Props {
  editD?: SubscriptionPlan;
  setOpen: (a: boolean) => void;
}

export default function SubscriptionPlanForm({ setOpen, editD }: Props) {
  const queryClient = useQueryClient();
  const defaultValues = useMemo(
    () => ({
      code: editD?.code ?? "",
      name: editD?.name ?? "",
      durationMonths: editD?.duration_months ? `${editD.duration_months}` : "",
      isActive: editD?.is_active ?? true,
      price: editD?.price ? `${editD.price}` : "",
    }),
    [editD]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      if (editD) {
        const res = await axios.put("/api/req", body, {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      } else {
        const res = await axios.post("/api/req", body, {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      }
    },
    onSuccess: (data) => {
      toast("Амжилттай хадгаллаа!");
      queryClient.invalidateQueries({ queryKey: ["getSubPlansGrid"] });
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.error.error || "Алдаа гарлаа, дахин оролдоно уу!",
        { position: "top-center" }
      );
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { code, ...rest } = data;
    if (!editD) {
      mutation.mutate({ ...data, serviceUrl: "api/subscription-plans/create" });
    } else
      mutation.mutate({
        ...rest,
        serviceUrl: `api/subscription-plans/${editD.id}`,
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
        <div className="m-2 flex flex-col gap-3">
          <RHFInput
            name="code"
            placeholder="Төлбөрийн код"
            disabled={!!editD}
          />
          <RHFInput name="name" placeholder="Төлбөрийн нэр" />
          <RHFInput type="number" name="price" placeholder="Үнэ" />
          <RHFInput
            type="number"
            name="durationMonths"
            placeholder="Хугацаа (сар)"
          />
          <RFHCheckbox
            name="isActive"
            item={{ label: "Идэвхтэй эсэх", value: true }}
            placeholder=""
          />
          <Button
            type="submit"
            className="w-max self-end"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Хадгалах"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
