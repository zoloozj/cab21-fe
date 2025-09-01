import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Iconify from "@/components/ui/iconify";
import { Ride } from "@/sections/types";
import Link from "next/link";

interface Props {
  ride: Ride;
}

export default function RideCard({ ride }: Props) {
  return (
    <Card className="flex-1 min-w-[300px] gap-2 bg-white px-3">
      <RideInfo label="Хөдлөх газар" value={ride.start_place} />
      <RideInfo label="Очих газар" value={ride.end_place} />
      <RideInfo label="Хөдлөх цаг" value={ride.start_time} />
      <RideInfo label="Автомашины дугаар" value={ride.ride_id} />
      <RideInfo label="Автомашины марк" value={ride.ride_id} />
      <RideInfo
        label="Зардал"
        value={`${Number(ride.ticket_price).toLocaleString()}₮`}
      />
      <div className="flex gap-4 justify-between">
        <Link
          href={`tel:${ride.driver_user_id}`}
          aria-label={`Call ${ride.driver_user_id}`}
          className="bg-primary text-white flex gap-2 items-center px-4 rounded-lg text-sm font-semibold"
        >
          Жолоочтой холбогдох{" "}
          <Iconify icon="solar:phone-linear" color="white" width={20} />
        </Link>
        <div className="bg-[#6853BD]  flex text-white gap-2 justify-center items-center text-sm rounded-lg font-semibold py-2 px-6">
          Сонгох{" "}
          <Iconify icon="solar:arrow-right-linear" color="white" width={20} />
        </div>
      </div>
    </Card>
  );
}

interface InfoProps {
  label: string;
  value: string | number;
}

function RideInfo({ label, value }: InfoProps) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
