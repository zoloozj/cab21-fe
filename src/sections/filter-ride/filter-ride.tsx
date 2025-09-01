"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import FilterCard from "@/components/main/filter-card";
import RideCard from "@/sections/filter-ride/components/ride-card";
import { buildGridRequest } from "@/lib/utils";

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

  return (
    <div className="w-full px-4 xl:max-w-7xl xl:mx-auto lg:mt-20">
      <div className="relative my-5 lg:-mt-10 lg:mb-10">
        <FilterCard />
      </div>
      <div className="flex flex-wrap gap-3 justify-between mt-10">
        <RideCard />
        <RideCard />
        <RideCard />
      </div>
    </div>
  );
}
