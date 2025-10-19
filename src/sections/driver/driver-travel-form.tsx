"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import PaymentInfo from "./components/payment";
import FromSelect from "./components/from-select";
import { aimags, soums } from "@/components/constant";
import PassengerNumber from "./components/passenger-number";
import TravelDateSelect from "./components/travel-date-select";
import DestinationSelect from "./components/destination-select";
import axios from "axios";
import { Ride } from "../types";
import Link from "next/link";
import { useUser } from "@/lib/user-provider";

const FormSchema = z.object({
  startPlace: z.string().min(1, { message: "" }),
  startPlaceSub: z.string().min(1, { message: "" }),
  endPlace: z.string().min(1, { message: "" }),
  endPlaceSub: z.string().min(1, { message: "" }),
  startDate: z.date().optional(),
  startTime: z.string().optional(),
  ticketPrice: z.number().min(1, { message: "" }),
  passengerSeat: z.number().min(1, { message: "" }).max(10, { message: "" }),
});

function useCab() {
  const { user } = useUser();
  return useQuery({
    queryKey: ["cab", "me"],
    queryFn: async () => {
      const res = await fetch(`/api/req?url=api/cabs/user/${user?.id}`, {
        cache: "no-store",
      });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
      return res.json();
    },
    staleTime: 0,
    retry: 1,
  });
}

interface Props {
  editD?: Ride;
}

export default function DriverTravelForm({ editD }: Props) {
  const router = useRouter();

  const aimag = (aimag: string[] | ""): string | undefined => {
    return aimags.find((x) => x.label === aimag[0]?.trim())?.value;
  };
  const soum = (
    soum: string[] | "",
    aimag: string | undefined
  ): string | undefined => {
    return soums.find((x) => x.parent === aimag && x.label === soum[1]?.trim())
      ?.value;
  };
  const defaultValues = useMemo(() => {
    const startPlace = editD?.start_place.split("-") || "";
    const endPlace = editD?.end_place.split("-") || "";
    const startTime = editD?.start_time.split(" ") || "";

    return {
      startPlace: aimag(startPlace) || "",
      startPlaceSub: soum(startPlace, aimag(startPlace)) || "",
      endPlace: aimag(endPlace) || "",
      endPlaceSub: soum(endPlace, aimag(endPlace)) || "",
      startDate: editD ? new Date(startTime[0]) : undefined,
      startTime: editD ? startTime[1] : "18:00",
      ticketPrice: editD?.ticket_price || 0,
      passengerSeat: editD?.capacity || 1,
    };
  }, [editD]);

  const { data: cab, isLoading, error } = useCab();
  const cabId = cab?.id;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      if (editD) {
        const { data } = await axios.put("/api/req", body);
      } else {
        const { data } = await axios.post("/api/req", body);
        return data;
      }
    },
    onSuccess: () => {
      toast.success("Амжилттай");
      router.push("/");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const startPlace = aimags.find((a) => a.value === data.startPlace)?.label;
    const startPlaceSubT = soums.find(
      (s) => s.value === data.startPlaceSub
    )?.label;
    const endPlace = aimags.find((a) => a.value === data.endPlace)?.label;
    const endPlaceSubT = soums.find((s) => s.value === data.endPlaceSub)?.label;
    const startDateT = data.startDate?.toLocaleDateString("en-CA");
    const { endPlaceSub, startPlaceSub, startTime, startDate, ...rest } = data;
    const finalvalue = {
      ...rest,
      startTime: `${startDateT}T${data.startTime}:00Z`,
      startPlace: `${startPlace} - ${startPlaceSubT}`,
      endPlace: `${endPlace} - ${endPlaceSubT}`,
      serviceUrl: editD ? `api/rides/edit/${editD?.id}` : "api/rides/create",
      cabId,
    };
    if (editD) mutation.mutate(finalvalue);
    else mutation.mutate(finalvalue);
  }

  const [step, setStep] = useState(1);
  if (isLoading) return <div className="mt-3 text-center">Ачааллаж байна…</div>;
  if (error)
    return (
      <div className="mt-3 text-center text-destructive">Алдаа гарлаа</div>
    );

  if (!cab) {
    return (
      <div className="mt-3">
        <p className="text-center text-muted-foreground">
          Та тээврийн хэрэгслийн мэдээлэл оруулаагүй байна!
        </p>
        <div className="flex gap-3 text-muted-foreground justify-center">
          <Link
            href="/cab"
            className="text-primary underline block text-center font-semibold"
          >
            Энд{" "}
          </Link>
          дарж мэдээллээ оруулна уу!
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full overflow-hidden p-4 lg:max-w-2xl lg:mx-auto"
      >
        {step === 1 && <FromSelect setStep={setStep} />}
        {step === 2 && <DestinationSelect setStep={setStep} />}
        {step === 3 && <TravelDateSelect setStep={setStep} />}
        {step === 4 && <PaymentInfo setStep={setStep} />}
        {step === 5 && (
          <PassengerNumber setStep={setStep} isLoading={mutation.isPending} />
        )}
      </form>
    </Form>
  );
}
