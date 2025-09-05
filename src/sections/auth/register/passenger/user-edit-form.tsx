import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import IconInput from "@/components/main/icon-input";
import PasswordInput from "@/app/auth/components/password-input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@/lib/user-provider";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  registryNumber: z.string(),
  phone: z.string(),
  password: z.string().min(6, {
    message: "Та нууц үгээ оруулж баталгаажуулна уу!",
  }),
  email: z.email({ message: "Мэйл хаяг оруулна уу!" }),
  birthday: z.string(),
});

export default function UserEditForm() {
  const { user } = useUser();

  const dateString = (date?: number) => {
    return date ? new Date(date).toISOString().slice(0, 10) : "";
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      registryNumber: user?.registryNumber || "",
      password: "",
      email: user?.email || "",
      birthday: dateString(user?.birthday) || undefined,
      phone: user?.phone,
    },
  });

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/user-update", body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast("Амжилттай засварлалаа!");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error?.message ||
          "Алдаа гарлаа, дахин оролдоно уу!",
        { position: "top-center" }
      );
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const body = {
      ...data,
      id: user?.id,
    };
    mutation.mutate(body);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-[95%]">
        <ScrollArea className="min-h-0 flex-1 h-[95%]">
          <div className="flex flex-col gap-3 my-3">
            <span className="text-lg font-bold">Ерөнхий мэдээлэл</span>
            <IconInput
              icon="mdi-light:email"
              name="email"
              placeholder="И-Мэйл"
            />
            <IconInput
              icon="solar:user-circle-linear"
              name="lastName"
              placeholder="Овог"
            />
            <IconInput
              icon="solar:user-circle-linear"
              name="firstName"
              placeholder="Нэр"
            />
            <IconInput
              icon="ant-design:number-outlined"
              name="registryNumber"
              placeholder="Регистрийн дугаар"
            />
            <IconInput
              icon="solar:phone-linear"
              name="phone"
              placeholder="Утасны дугаар"
              type="number"
            />
            <IconInput
              icon="solar:calendar-date-linear"
              name="birthday"
              placeholder="Төрсөн огноо"
              type="date"
              desc
            />

            <p className="text-lg font-bold mt-2">Нууц үг</p>
            <PasswordInput name="password" />
          </div>
        </ScrollArea>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="h-12 px-16 w-full text-white font-bold text-lg rounded-xl cursor-pointer"
        >
          {mutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Засварлах"
          )}
        </Button>
      </form>
    </Form>
  );
}
