"use client";

import { postRequest } from "@/lib/request";
import { useUser } from "@/lib/user-provider";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { RideBooking } from "../types";
import { RideInfo } from "../filter-ride/components/ride-card";

export default function MyBookingList() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const body = {
    serviceUrl: "api/booking/bookings/grid",
    startRow: 0,
    endRow: 100,
    sortModel: [{ colId: "id", sort: "desc" }],
    filterModel: {
      user_id: {
        filter: `${user?.id}`,
        filterType: "number",
        type: "equals",
      },
    },
  };
  const { data, isPending, isError } = useQuery({
    queryKey: ["getMyBookings", user?.id],
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
    <div className="w-full px-4 md:mx-16 lg:max-w-7x lg:mx-auto">
      <h3 className="text-center w-full text-xl font-semibold my-2">
        Аялалын түүх
      </h3>
      <div className="flex flex-wrap gap-3 mt-10">
        {data?.data?.length > 0 ? (
          data.data.map((item: RideBooking) => (
            <Card
              key={item.id}
              className="flex-1 min-w-[300px] gap-2 bg-white px-3 h-min"
            >
              <RideInfo label="Огноо" value={item.created_at} />
              <RideInfo label="Захиалсан суудал" value={item.seat} />
              <RideInfo label="Статус" value={item.status} />
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-xl text-center w-full">
            Мэдээлэл олдсонгүй!
          </p>
        )}
      </div>
    </div>
  );
}
