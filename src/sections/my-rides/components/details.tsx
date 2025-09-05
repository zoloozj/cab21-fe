import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Iconify from "@/components/ui/iconify";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function RideDetails() {
  return (
    <div className="flex gap-4 w-full justify-end">
      <Collapsible className="w-full text-end">
        <CollapsibleTrigger>
          <div className="bg-primary text-white flex gap-2 items-center px-4 h-12 rounded-lg text-sm font-semibold">
            Дэлгэрэнгүй
            <Iconify icon="solar:phone-linear" color="white" width={20} />
          </div>
        </CollapsibleTrigger>
        {[1, 2, 3].map((item, index) => (
          <div key={item}>
            <Separator className={cn(index === 0 && "hidden")} />
            <CollapsibleContent className="w-full my-2 text-justify">
              Yes. Free to use for personal and commercial projects. No
              attribution required.
            </CollapsibleContent>
          </div>
        ))}
      </Collapsible>
    </div>
  );
}
