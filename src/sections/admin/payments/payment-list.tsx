"use client";

import { postRequest } from "@/lib/request";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import Iconify from "@/components/ui/iconify";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/loader";
import { SubscriptionPlan } from "@/sections/types";
import AddPlanDialog from "./components/add-plan-dialog";
import EditPlanDialog from "./components/edit-plan-dialog";

export default function PaymentList() {
  const body = {
    endRow: 100,
    startRow: 0,
    sortModel: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
    filterModel: {},
    serviceUrl: "api/subscription-plans/list",
  };

  const { data, isPending } = useQuery({
    queryKey: ["getSubPlansGrid", body],
    queryFn: async () => postRequest(body),
  });

  if (isPending)
    return (
      <div className="flex flex-col space-y-3 mt-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black">Төлбөрийн мэдээлэл</h1>
        <AddPlanDialog />
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {data?.data.length > 0 ? (
          data.data.map((payment: SubscriptionPlan) => (
            <Card
              key={payment.id}
              className="min-w-[300px] flex-1 p-4 relative"
            >
              <h3 className="font-bold text-center text-xl">{payment.name}</h3>
              <h6 className="text-sm">Төлбөрийн код: {payment.code}</h6>
              <div className="flex flex-col gap-2 text-sm">
                <span>Үнэ: {formatCurrency(payment.price)} ₮</span>
                <span>Хугацаа: {payment.duration_months} сар</span>
                <span className="flex items-center">
                  Идэвхтэй эсэх:
                  <Iconify
                    icon="carbon:dot-mark"
                    color={payment.is_active ? "green" : "red"}
                  />{" "}
                </span>
                <span>Үүсгэсэн огноо: {payment.created_at.slice(0, 10)}</span>
              </div>
              <EditPlanDialog plan={payment} />
            </Card>
          ))
        ) : (
          <p>Төлбөрийн мэдээлэл олдсонгүй</p>
        )}
      </div>
    </div>
  );
}
