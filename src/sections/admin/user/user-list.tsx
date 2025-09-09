"use client";

import { postRequest } from "@/lib/request";
import { Card } from "@/components/ui/card";
import { UserDetail } from "@/sections/types";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import UserDetailPage from "./components/user-detail";
import { RideInfo } from "@/sections/filter-ride/components/ride-card";
import ChangePasswordDialog from "./components/change-password-dialog";

interface Props {
  cab?: boolean;
  inactive?: boolean;
}

export default function UserList({ cab = false, inactive }: Props) {
  const body = {
    endRow: 100,
    startRow: 0,
    sortModel: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
    filterModel: {
      status: {
        filter: inactive ? 0 : 1,
        filterType: "number",
        type: "equals",
      },
    },
    serviceUrl: "api/user/grid",
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo", body],
    queryFn: () => postRequest(body),
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

  const type = cab ? 1 : null;
  const users = data.data.filter((x: UserDetail) => x.cab_status === type);
  return (
    <div className="flex flex-wrap gap-3">
      {data?.data.length > 0 ? (
        users.map((user: UserDetail) => (
          <Card key={user.id} className="min-w-[300px] flex-1 p-4">
            <RideInfo
              label="Овог нэр"
              value={`${user.last_name} ${user.first_name}`}
            />
            <RideInfo label="Мэйл хаяг" value={user.email} />
            <RideInfo label="Гар утас" value={user.phone} />
            <div className="flex items-center justify-between">
              <ChangePasswordDialog user={user} />
              <UserDetailPage user={user} cab={cab} inactive={inactive} />
            </div>
          </Card>
        ))
      ) : (
        <p>Хэрэглэгч олдсонгүй</p>
      )}
    </div>
  );
}
