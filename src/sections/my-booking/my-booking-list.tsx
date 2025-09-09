"use client";

import { postRequest } from "@/lib/request";
import { useUser } from "@/lib/user-provider";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function MyBookingList() {
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
      //   phone: {
      //     filter: `${user?.username}`,
      //     filterType: "text",
      //     type: "equals",
      //   },
      //   ride_status: {
      //     filter: paramsObject?.status ? paramsObject.status : "OPEN",
      //     filterType: "text",
      //     type: "equals",
      //   },
    },
  };
  const { data, isPending, isError } = useQuery({
    queryKey: ["getMyBookings", paramsObject],
    queryFn: async () => postRequest(body),
  });
  console.log(data, "DATA");
  return (
    <div className="w-full px-4 md:mx-16 lg:max-w-7x lg:mx-auto">
      <h3>Аялалын түүх</h3>
    </div>
  );
}
