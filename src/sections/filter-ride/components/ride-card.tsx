import { Card } from "@/components/ui/card";
import Iconify from "@/components/ui/iconify";
import { Ride } from "@/sections/types";
import Link from "next/link";
import OrderRide from "./order-ride";
import { useUser } from "@/lib/user-provider";

interface Props {
  ride: Ride;
}

export default function RideCard({ ride }: Props) {
  const { user } = useUser();
  return (
    <Card className="flex-1 min-w-[300px] gap-2 bg-white px-3">
      <RideInfo label="Хөдлөх газар" value={ride.start_place} />
      <RideInfo label="Очих газар" value={ride.end_place} />
      <RideInfo label="Хөдлөх цаг" value={ride.start_time} />
      <RideInfo label="Автомашины дугаар" value={ride.plate} />
      <RideInfo label="Автомашины марк" value={ride.model} />
      <RideInfo
        label="Суудал дүүргэлт"
        value={`${ride.passenger_count}/${ride.capacity}`}
      />
      <RideInfo
        label="Зардал"
        value={`${Number(ride.ticket_price).toLocaleString()}₮`}
      />
      <div className="flex gap-4 justify-between">
        <Link
          href={ride ? `tel:${ride?.phone}` : "/auth/login"}
          aria-label={`Call ${ride?.phone}`}
          className="bg-primary text-white flex gap-2 items-center px-4 rounded-lg text-sm font-semibold"
        >
          {/* Жолоочтой холбогдох */}
          {user?.phone}
          <Iconify icon="solar:phone-linear" color="white" width={20} />
        </Link>
        <OrderRide ride={ride} />
      </div>
    </Card>
  );
}

interface InfoProps {
  label: string;
  value: string | number;
}

export function RideInfo({ label, value }: InfoProps) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
