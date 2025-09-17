"use client";

import { Ride } from "@/sections/types";
import { postRequest } from "@/lib/request";
import { useUser } from "@/lib/user-provider";
import { useQuery } from "@tanstack/react-query";
import MyRideCard from "./components/my-ride-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";

type RideStatus = "OPEN" | "FULL" | "INACTIVE"; // <- align with your API

const ALLOWED: RideStatus[] = ["OPEN", "FULL", "INACTIVE"];

function getStatusFromParams(
  sp: ReturnType<typeof useSearchParams>
): RideStatus {
  const raw = sp.get("status")?.toUpperCase();
  return (ALLOWED as string[]).includes(raw ?? "")
    ? (raw as RideStatus)
    : "OPEN";
}

export default function MyRidesList() {
  const { user } = useUser();
  const router = useRouter();
  const sp = useSearchParams();
  const status = getStatusFromParams(sp);
  const body = useMemo(() => {
    const username = user?.username ?? "";
    return {
      serviceUrl: "api/rides/checklist/grid",
      startRow: 0,
      endRow: 100,
      sortModel: [{ colId: "id", sort: "desc" }],
      filterModel: {
        phone: {
          filter: username,
          filterType: "text",
          type: "equals",
        },
        ride_status: {
          filter: status,
          filterType: "text",
          type: "equals",
        },
      },
    };
  }, [user?.username, status]);
  const { data, isPending } = useQuery({
    queryKey: ["getMyRides", user?.username ?? null, status],
    queryFn: () => postRequest(body),
    enabled: !!user?.username,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
  const setStatus = (next: RideStatus) => {
    const params = new URLSearchParams(sp.toString());
    params.set("status", next);
    router.replace(`?${params.toString()}`);
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
      <Tabs value={status} onValueChange={(v) => setStatus(v as RideStatus)}>
        <TabsList className="w-full h-12">
          <TabsTrigger value="OPEN" className="w-full">
            Нээлттэй
          </TabsTrigger>
          <TabsTrigger value="FULL" className="w-full">
            Дүүрэн
          </TabsTrigger>
          {/* <TabsTrigger value="INACTIVE" className="w-full">
            Хугацаа дууссан
          </TabsTrigger> */}
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap gap-3 justify-between mt-10">
        {data?.data?.length > 0 ? (
          data?.data.map((ride: Ride) => (
            <MyRideCard key={ride.id} ride={ride} />
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
