import { useFormContext } from "react-hook-form";

import { aimags, soums } from "@/components/constant";
import RHFCombo from "@/components/hook-form/rhf-combo";
import RHFRadio from "@/components/hook-form/rhf-radio";
import { ScrollArea } from "@/components/ui/scroll-area";

import PrevNextBtn from "./prev-next-btn";

interface Props {
  setStep: (a: number) => void;
}

export default function FromSelect({ setStep }: Props) {
  const { watch } = useFormContext();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <p className="font-semibold my-4">Та хаанаас хөдлөх вэ?</p>
      <RHFCombo name="fromAimag" placeholder="хаанаас..." options={aimags} />
      <ScrollArea className="flex-1 min-h-0 py-2">
        <RHFRadio
          name="fromSoum"
          options={soums.filter((x) => x.parent === watch("fromAimag"))}
          parent={
            aimags.find((x) => x.value === watch("fromAimag"))?.label || ""
          }
        />
      </ScrollArea>
      <PrevNextBtn step={1} setStep={setStep} firstPage />
    </div>
  );
}
