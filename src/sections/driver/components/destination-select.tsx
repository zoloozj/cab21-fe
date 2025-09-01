import { Button } from "@/components/ui/button";
import RHFCombo from "@/components/hook-form/rhf-combo";
import RHFRadio from "@/components/hook-form/rhf-radio";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrevNextBtn from "./prev-next-btn";
import { aimags, soums } from "@/components/constant";
import { useFormContext } from "react-hook-form";

interface Props {
  setStep: (a: number) => void;
}

export default function DestinationSelect({ setStep }: Props) {
  const { watch } = useFormContext();
  return (
    <div
      className="flex flex-col"
      style={{
        height: "calc(100vh - var(--header-height, 120px))",
        overflow: "hidden",
      }}
    >
      <p className="font-semibold my-4">Та хаанаас хөдлөх вэ?</p>
      <RHFCombo name="endPlace" placeholder="хаанаас..." options={aimags} />
      <ScrollArea className="flex-1 min-h-0 py-2">
        <RHFRadio
          name="endPlaceSub"
          options={soums.filter((x) => x.parent === watch("endPlace"))}
          parent={
            aimags.find((x) => x.value === watch("endPlace"))?.label || ""
          }
        />
      </ScrollArea>
      <PrevNextBtn step={2} setStep={setStep} />
    </div>
  );
}
