import { Card } from "@/components/ui/card";
import { RideInfo } from "@/sections/filter-ride/components/ride-card";
import { Ride } from "@/sections/types";
import RideDetails from "./details";
import EditRideModal from "@/sections/admin/rides/components/edit-ride-modal";
import DeleteRideModal from "@/sections/admin/rides/components/delete-ride-modal";

interface Props {
  ride: Ride;
}

export default function MyRideCard({ ride }: Props) {
  return (
    <Card className="flex-1 min-w-[300px] gap-2 bg-white px-3 h-min">
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
      <div className="relative">
        <div className="m-0 p-0 flex justify-start gap-2 absolute">
          <EditRideModal ride={ride} />
          <DeleteRideModal ride={ride} />
        </div>
        <div className="flex justify-between items-center">
          <RideDetails key={ride.ride_id} ride={ride} />
        </div>
      </div>
    </Card>
  );
}
