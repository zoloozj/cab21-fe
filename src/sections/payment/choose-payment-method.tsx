"use client";

import { Button } from "@/components/ui/button";
import Iconify from "@/components/ui/iconify";
import { Skeleton } from "@/components/ui/loader";
import { postRequest } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { SubscriptionPlan } from "../types";
import { Card } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { useState } from "react";

interface Props {
  driverId: string;
}

export default function ChoosePaymentMethod({ driverId }: Props) {
  const [chosen, setChoose] = useState<number>();
  const body = {
    endRow: 100,
    startRow: 0,
    sortModel: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
    filterModel: {
      // is_active: {
      //   filter: false,
      //   filterType: "boolean",
      //   type: "equals",
      // },
    },
    serviceUrl: "api/subscription-plans/list",
  };

  const { data, isPending } = useQuery({
    queryKey: ["getSubPlans", body],
    queryFn: async () => postRequest(body),
  });

  if (isPending)
    return (
      <div className="flex flex-col space-y-3 mt-3 text-center text-gray-500">
        Ачаалж байна...
      </div>
    );

  return (
    <div className="w-full px-4 xl:max-w-7xl xl:mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="flex gap-2 items-center">
          <Iconify icon="solar:alt-arrow-left-linear" color="gray-600" />
          <span className="hidden sm:block">Буцах</span>
        </Button>
        <h1 className="text-lg font-bold">Төлбөрийн мэдээлэл</h1>
        <span> {} </span>
      </div>
      <div className="flex flex-wrap gap-5 mt-3 mx-auto justify-center">
        {data.data.length > 0 &&
          data.data
            .filter((x: SubscriptionPlan) => x.is_active)
            .map((plan: SubscriptionPlan) => (
              <Card
                key={plan.id}
                className={cn(
                  "min-w-[300px] max-w-[300px] flex-1 p-4 cursor-pointer",
                  plan.id === chosen
                    ? "ring-2 ring-emerald-300/50"
                    : "hover:scale-105 hover:shadow-md hover:shadow-emerald-500/50"
                )}
                onClick={() => setChoose(plan.id)}
              >
                <h3 className="text-sm text-gray-500 font-bold text-center">
                  {plan.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {formatCurrency(plan.price)}₮
                  </span>
                  <span className="text-xs text-gray-500">
                    {plan.duration_months}/сар
                  </span>
                </div>
              </Card>
            ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button>Хэтэвч цэнэглэх</Button>
      </div>
    </div>
  );
}
