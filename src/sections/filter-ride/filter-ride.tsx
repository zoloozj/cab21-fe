"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import FilterCard from "@/components/main/filter-card";
import RideCard from "@/sections/filter-ride/components/ride-card";
import { buildGridRequest } from "@/lib/utils";
import { Ride } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Iconify from "@/components/ui/iconify";
import ShowDeleteFilter from "./components/show-delete-filters";

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
  const { data, isLoading, isError, error } = useRides({
    serviceUrl: "api/rides/checklist/grid",
    ...buildGridRequest(paramsObject),
  });

  if (isLoading)
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
