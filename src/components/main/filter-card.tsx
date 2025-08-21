import { Card } from "@/components/ui/card";
import IconButton from "@/components/ui/icon-button";
import { Separator } from "@/components/ui/separator";

export default function FilterCard() {
  return (
    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 md:mx-2 w-full lg:max-w-7xl">
      <Card className="mx-auto p-0 flex flex-row shadow-2xl w-full">
        <div className="m-0 py-2 flex flex-row gap-3 justify-evenly w-full">
          <IconButton title="Хаанаас" icon="lineicons:road-1" color="#98A2B3" />
          <Separator orientation="vertical" />
          <IconButton
            title="Хаашаа"
            icon="streamline-ultimate:trip-road"
            color="#98A2B3"
          />
          <Separator orientation="vertical" />
          <IconButton
            title="Өнөөдөр"
            icon="solar:calendar-outline"
            color="#98A2B3"
          />
          <Separator orientation="vertical" />
          <IconButton
            title="1 зорчигч"
            icon="solar:user-circle-outline"
            color="#98A2B3"
          />
        </div>
        <div className="flex justify-center items-center px-4 lg:px-10 -m-[1px] bg-[#FFB300] text-white font-bold rounded-r-lg cursor-pointer lg:w-md text-xs lg:text-lg">
          Хайх
        </div>
      </Card>
    </div>
  );
}
