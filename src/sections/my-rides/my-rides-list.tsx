"use client";

import { Ride } from "@/sections/types";
import { Card } from "@/components/ui/card";
import { useUser } from "@/lib/user-provider";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyRides } from "@/app/(default)/my-rides/page";
import RideDetails from "@/sections/my-rides/components/details";
import { RideInfo } from "@/sections/filter-ride/components/ride-card";

export default function MyRidesList() {
  const { user } = useUser();
  const body = {
    serviceUrl: "api/rides/checklist/grid",
    startRow: 0,
    endRow: 100,
    sortModel: [{ colId: "id", sort: "desc" }],
    filterModel: {
      phone: {
        filter: `${user?.phone}`,
        filterType: "text",
        type: "equals",
      },
    },
  };
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["getMyRides"],
    queryFn: () => getMyRides(body),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
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
    <div className="w-full px-4 xl:max-w-7xl xl:mx-auto mt-5 lg:mt-10">
      <div className="flex flex-wrap gap-3 justify-between mt-10">
        {data?.data?.length > 0 &&
          data?.data.map((ride: Ride) => (
            <Card className="flex-1 min-w-[300px] gap-2 bg-white px-3">
              <RideInfo label="Хөдлөх газар" value={ride.start_place} />
              <RideInfo label="Очих газар" value={ride.end_place} />
              <RideInfo label="Хөдлөх цаг" value={ride.start_time} />
              <RideInfo label="Автомашины дугаар" value={ride.plate} />
              <RideInfo label="Автомашины марк" value={ride.model} />
              <RideInfo
                label="Суудал дүүргэлт"
                value={`${ride.passenger_count}/${ride.capacity}`}
              />
              <RideInfo
                label="Зардал"
                value={`${Number(ride.ticket_price).toLocaleString()}₮`}
              />
              <RideDetails />
            </Card>
          ))}
      </div>
    </div>
  );
}
