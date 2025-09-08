"use client";

import { Ride } from "@/sections/types";
import { getRequest } from "@/lib/request";
import { useUser } from "@/lib/user-provider";
import { useQuery } from "@tanstack/react-query";
import MyRideCard from "./components/my-ride-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyRidesList() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const body = {
    serviceUrl: "api/rides/checklist/grid",
    startRow: 0,
    endRow: 100,
    sortModel: [{ colId: "id", sort: "desc" }],
    filterModel: {
      phone: {
        filter: `${user?.username}`,
        filterType: "text",
        type: "equals",
      },
      ride_status: {
        filter: paramsObject?.status ? paramsObject.status : "OPEN",
        filterType: "text",
        type: "equals",
      },
    },
  };
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["getMyRides", paramsObject],
    queryFn: () => getRequest(body),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
  const handleClick = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status); // add or update
    router.push(`?${params.toString()}`);
  };
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
    <div className="w-full px-4 xl:max-w-7xl xl:mx-auto">
      <Tabs defaultValue={paramsObject?.status ? paramsObject.status : "OPEN"}>
        <TabsList className="w-full h-12">
          <TabsTrigger
            value="OPEN"
            className="w-full"
            onClick={() => handleClick("OPEN")}
          >
            Идэвхтэй
          </TabsTrigger>
          <TabsTrigger
            value="CLOSED"
            className="w-full"
            onClick={() => handleClick("FULL")}
          >
            Идэвхгүй
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap gap-3 justify-between mt-10">
        {data?.data?.length > 0 &&
          data?.data.map((ride: Ride) => (
            <MyRideCard key={ride.id} ride={ride} />
          ))}
      </div>
    </div>
  );
}
