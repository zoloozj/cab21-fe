"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/sections/profile/user-info";
import { customError } from "@/lib/utils";

interface Props {
  userId: number;
}

async function fetchCabInfo(userId: number) {
  const response = await fetch(`/api/req?url=api/cabs/user/${userId}`);
  if (!response.ok) {
    await customError(response);
  }
  return response.json();
}

export default function UserCab({ userId }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cabInfo", userId],
    queryFn: () => fetchCabInfo(userId),
  });
  console.log(data, "DATA");
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

  if (error) {
    const { error: e } = JSON.parse(error.message);
    console.log(e, "ERROR");
    if (e.status === 404)
      return (
        <div className="mt-3">
          <p className="text-center text-muted-foreground">
            Та тээврийн хэрэгслийн мэдээлэл оруулаагүй байна!
          </p>
          <div className="flex gap-3 text-muted-foreground justify-center">
            <Link
              href="cab"
              className="text-primary underline block text-center font-semibold"
            >
              Энд{" "}
            </Link>
            дарж мэдээллээ оруулна уу!
          </div>
        </div>
      );
    return <Card className="mt-3 text-center">{e.message}</Card>;
  }
  return (
    <Card className="p-4 mt-3">
      <h2 className="text-lg font-semibold text-primary">
        Тээврийн хэрэгслийн мэдээлэл
      </h2>
      <Separator />
      {data ? (
        <>
          <UserInfo
            label="Тээврийн хэрэгслийн улсын дугаар"
            value={data.plate}
          />
          <UserInfo label="Тээврийн хэрэгслийн загвар" value={data.model} />
          <UserInfo label="Зорчигчийн тоо" value={data.passengerSeats} />
        </>
      ) : (
        <div>
          <p className="text-center text-muted-foreground">
            Та тээврийн хэрэгслийн мэдээлэл оруулаагүй байна!
          </p>
          <Link
            href="cab"
            className="text-primary underline block text-center font-semibold"
          >
            Тээврийн хэрэгслийн мэдээлэл оруулах
          </Link>
        </div>
      )}
    </Card>
  );
}
