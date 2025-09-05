"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { customError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUserInfo(body: any) {
  const response = await axios.post(`/api/req`, body);
  if (response.status !== 200) {
    await customError(response.data);
  }
  return response.data;
}

export default function UserList() {
  const body = {
    endRow: 10,
    startRow: 0,
    sortModel: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
    filterModel: {},
    serviceUrl: "api/user/grid",
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo", body],
    queryFn: () => fetchUserInfo(body),
  });
  if (error) return <p>Сервер дээр алдаа гарсан байна!</p>;
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

  console.log(data);
  return <div>User Lst</div>;
}
