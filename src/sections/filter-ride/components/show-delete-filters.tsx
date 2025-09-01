import Iconify from "@/components/ui/iconify";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShowDeleteFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const params = new URLSearchParams(Array.from(searchParams.entries()));
  return (
    <div className="text-muted-foreground text-sm flex">
      {paramsObject.startPlace && (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            params.delete("startPlace");
            router.push(`/filter${searchParams}`);
          }}
        >
          Хөдлөх газар: {paramsObject.startPlace}
        </div>
      )}
      {paramsObject.endPlace && (
        <div className="flex items-center">
          <Separator orientation="vertical" className="h-5 mx-3" />
          Очих газар: {paramsObject.endPlace}
        </div>
      )}
      {paramsObject.startTime && (
        <div className="flex items-center">
          <Separator orientation="vertical" className="h-5 mx-3" />
          Огноо: {paramsObject.startTime}
        </div>
      )}
    </div>
  );
}
