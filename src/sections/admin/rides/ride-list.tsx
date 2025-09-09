"use client";

import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { postRequest } from "@/lib/request";
import { TabsList } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function RideList() {
  const body = {
    endRow: 20,
    startRow: 0,
    sortModel: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
    filterModel: {},
    serviceUrl: "api/rides/checklist/grid",
  };
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getRidesGrid"],
    queryFn: async () => postRequest(body),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const handleClick = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status); // add or update
    router.push(`?${params.toString()}`);
  };

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
    </div>
  );
}
