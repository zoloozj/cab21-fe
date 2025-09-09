"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Iconify from "@/components/ui/iconify";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { postRequest } from "@/lib/request";
import { RideInfo } from "@/sections/filter-ride/components/ride-card";
import { Ride } from "@/sections/types";
import { TabsList } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteRideModal from "./components/delete-ride-modal";
import { Skeleton } from "@/components/ui/loader";

export default function RideList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const body = {
    endRow: 20,
    startRow: 0,
    sortModel: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
    filterModel: {
      ride_status: {
        filter: paramsObject?.status ? paramsObject.status : "OPEN",
        filterType: "text",
        type: "equals",
      },
    },
    serviceUrl: "api/rides/checklist/grid",
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getRidesGrid", paramsObject],
    queryFn: async () => postRequest(body),
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
    <div className="">
      <Tabs defaultValue="OPEN" className="w-full">
        <TabsList className="h-12">
          <TabsTrigger
            onClick={() => handleClick("OPEN")}
            className="w-1/3"
            value="OPEN"
          >
            Нээлттэй
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleClick("FULL")}
            className="w-1/3"
            value="FULL"
          >
            Дүүрсэн
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleClick("INACTIVE")}
            className="w-1/3"
            value="INACTIVE"
          >
            Идэвхгүй
          </TabsTrigger>
        </TabsList>
        <TabsContent value="OPEN"></TabsContent>
        <TabsContent value="FULL"></TabsContent>
        <TabsContent value="INACTIVE"></TabsContent>
      </Tabs>
      {data?.data?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {data.data.map((item: Ride) => (
            <Card key={item.id} className="p-4 min-w-[350px] flex-1 h-min">
              <RideInfo label="Огноо" value={item.start_time} />
              <RideInfo label="Хөдлөх газар" value={item.start_place} />
              <RideInfo label="Очих газар" value={item.end_place} />
              <div className="flex justify-between">
                <div className="m-0 p-0 flex justify-start gap-2">
                  <Button type="button" variant="ghost">
                    <Iconify icon="solar:pen-bold" />
                  </Button>
                  <DeleteRideModal ride={item} />
                </div>
                <Collapsible className="text-end">
                  <CollapsibleTrigger asChild>
                    <Button type="button">Дэлгэрэнгүй</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <RideInfo
                      label="Суудал"
                      value={`${item.passenger_count}/${item.capacity}`}
                    />
                    <RideInfo label="Улсын дугаар" value={item.plate} />
                    <RideInfo label="Модель" value={item.model} />
                    <RideInfo label="Утас" value={item.phone} />
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-xl mt-4">
          Мэдээлэл олдсонгүй!
        </p>
      )}
    </div>
  );
}
