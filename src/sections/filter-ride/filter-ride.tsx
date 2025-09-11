"use client";

import { buildGridRequest } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { Ride } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import FilterCard from "@/components/main/filter-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RideCard from "@/sections/filter-ride/components/ride-card";

export function useRides(req: any) {
  return useQuery({
    queryKey: ["rides", req],
    queryFn: async () => {
      const res = await fetch("/api/req", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...req,
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch rides");
      return res.json();
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export default function FilterRide() {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const { data, isPending, isError, error } = useRides({
    serviceUrl: "api/rides/checklist/grid",
    ...buildGridRequest(paramsObject),
  });

  if (isPending)
    return (
      <div className="w-full px-4 xl:max-w-7xl xl:mx-auto lg:mt-20">
        <div className="flex flex-wrap gap-3 justify-between mt-10">
          {[1, 2, 3, 4].map((x) => (
            <div key={x} className="flex flex-col space-y-3 mt-3">
              <Skeleton className="h-[125px] w-[250px] bg-gray-200 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-200" />
                <Skeleton className="h-4 w-[200px] bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="w-full px-4 xl:max-w-7xl xl:mx-auto lg:mt-20">
      <div className="relative my-5 lg:-mt-10 lg:mb-10">
        <FilterCard />
      </div>
      {/* <ShowDeleteFilter /> */}
      <ScrollArea>
        <div className="flex flex-wrap gap-3 justify-between mt-10">
          {data && data.data.length > 0 ? (
            data.data.map((ride: Ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))
          ) : (
            <p className="text-center mx-auto text-muted-foreground">
              Аялал олдсонгүй!
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
