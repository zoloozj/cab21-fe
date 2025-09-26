"use client";

import { z } from "zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SelectDate from "@/components/main/components/select-time";
import SelectFrom from "@/components/main/components/select-from";
import Iconify from "../ui/iconify";

const FormSchema = z.object({
  startPlace: z.string().nullable().optional(),
  endPlace: z.string().nullable().optional(),
  startTime: z.date().nullable().optional(),
  // passengerSeats: z.number().nullable().optional(),
});

type SearchParamsLike = URLSearchParams | ReadonlyURLSearchParams;

function useCreateQueryString(searchParams: SearchParamsLike) {
  return useCallback(
    (updates: Record<string, string | number | boolean | null | undefined>) => {
      // clone current params (ReadonlyURLSearchParams is immutable)
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      for (const [key, val] of Object.entries(updates)) {
        if (
          val === null ||
          val === undefined ||
          val === "" ||
          val === "null - undefined" ||
          val === "undefined - undefined"
        ) {
          params.delete(key);
        } else {
          params.set(key, String(val));
        }
      }
      return params.toString();
    },
    [searchParams]
  );
}

export default function FilterCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString(searchParams);

  const startTimeString = searchParams.get("startTime");
  const startPlace = searchParams.get("startPlace");
  const endPlace = searchParams.get("endPlace");
  const startTime = startTimeString ? new Date(startTimeString) : null;

  const defaultValues = useMemo(
    () => ({
      startPlace,
      endPlace,
      startTime: startTime,
      // passengerSeats: null,
    }),
    [startTime, startPlace, endPlace]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const finalValue = {
      startPlace: data.startPlace,
      endPlace: data.endPlace,
      startTime: data.startTime?.toLocaleDateString("en-CA") || null,
    };
    router.push(`/filter?${createQueryString(finalValue)}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full overflow-hidden p-4 lg:max-w-lg lg:mx-auto"
      >
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 md:mx-2 w-full max-w-lg 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl">
          <Card className="mx-auto p-0 flex flex-col sm:flex-row shadow-2xl gap-0">
            <div className="m-0 py-2 flex flex-row gap-3 justify-evenly flex-1">
              <SelectFrom
                name="startPlace"
                icon="lineicons:road-1"
                placeholder="Хаанаас"
              />
              <Separator orientation="vertical" />
              <SelectFrom
                name="endPlace"
                icon="streamline-ultimate:trip-road"
                placeholder="Хаашаа"
              />

              <Separator orientation="vertical" />
              <SelectDate
                name="startTime"
                placeholder="Өнөөдөр"
                icon="solar:calendar-outline"
              />
            </div>
            <Button
              // asChild
              type="submit"
              className="flex sm:h-15 justify-center items-center px-8 lg:px-10 -m-[1px] bg-[#FFB300] text-white font-bold rounded-r-lg cursor-pointer lg:w-sm text-xs lg:text-lg"
              // variant="ghost"
            >
              Хайх
            </Button>
          </Card>
        </div>
      </form>
    </Form>
  );
}
