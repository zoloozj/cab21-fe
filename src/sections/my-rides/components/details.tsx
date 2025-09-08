import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getRequest } from "@/lib/request";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import { Booking, Ride } from "@/sections/types";
import { Separator } from "@/components/ui/separator";
import { RideInfo } from "@/sections/filter-ride/components/ride-card";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export async function getBookings() {}

interface Props {
  ride: Ride;
}

export default function RideDetails({ ride }: Props) {
  const queryClient = useQueryClient();
  const body = {
    serviceUrl: "api/booking/bookings/grid",
    startRow: 0,
    endRow: 100,
    sortModel: [{ colId: "id", sort: "desc" }],
    filterModel: {
      ride_id: {
        filter: ride.id,
        filterType: "text",
        type: "equals",
      },
    },
  };
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["getBookings", ride.id, "getMyRides"],
    queryFn: () => getRequest(body),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/req", body);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getBookings", ride.id] });
    },
    onError: (error: any) => {
      console.log(error, "ERROR");
      toast.error(error.message);
    },
  });

  const handleApproveBooking = useCallback(async (item: Booking) => {
    const body = {
      serviceUrl: "api/booking/bookings/approve",
      id: item.id,
      rideId: item.ride_id,
      userId: item.user_id,
    };
    mutation.mutate(body);
  }, []);

  return (
    <div className="flex gap-4 w-full justify-end">
      <Collapsible className="w-full text-end">
        <CollapsibleTrigger>
          <div className="bg-primary text-white flex gap-2 items-center px-4 h-12 rounded-lg text-sm font-semibold">
            Дэлгэрэнгүй
            <Iconify icon="solar:phone-linear" color="white" width={20} />
          </div>
        </CollapsibleTrigger>
        {data?.data?.map((item: Booking, index: number) => (
          <div key={item.id} className="w-full">
            <Separator className={cn(index === 0 && "hidden")} />
            <CollapsibleContent className="w-full my-2 text-end">
              <RideInfo
                label="Овог нэр"
                value={`${item.last_name.charAt(0)}. ${item.first_name}`}
              />
              <RideInfo label="Утасны дугаар" value={item.phone} />
              <RideInfo label="Захиалсан суудал" value={item.seat} />
              <div className="flex justify-between gap-3 my-3">
                <Link
                  href={`tel:${item?.phone}`}
                  aria-label={`Call ${item?.phone}`}
                  className="bg-[#00ACC1] text-white flex gap-2 items-center px-4 rounded-lg text-sm h-10 font-semibold"
                >
                  {item?.phone}
                  <Iconify icon="solar:phone-linear" color="white" width={20} />
                </Link>
                <Button
                  type="button"
                  onClick={() => handleApproveBooking(item)}
                  disabled={item.status !== "BOOKED"}
                >
                  {item.status === "BOOKED" ? "Батлах" : "Баталсан"}
                  <Iconify
                    icon={
                      item.status === "BOOKED"
                        ? "solar:check-square-linear"
                        : "solar:check-read-linear"
                    }
                    color="white"
                  />
                </Button>
              </div>
            </CollapsibleContent>
          </div>
        ))}
      </Collapsible>
    </div>
  );
}
