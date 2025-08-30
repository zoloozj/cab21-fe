import { Button } from "@/components/ui/button";
import RHFCombo from "@/components/hook-form/rhf-combo";
import RHFRadio from "@/components/hook-form/rhf-radio";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrevNextBtn from "./prev-next-btn";

interface Props {
  setStep: (a: number) => void;
}

export default function DestinationSelect({ setStep }: Props) {
  return (
    <div
      className="flex flex-col"
      style={{
        height: "calc(100vh - var(--header-height, 120px))",
        overflow: "hidden",
      }}
    >
      <p className="font-semibold my-4">Та хаашаа явах вэ?</p>
      <RHFCombo
        name="fromAimag"
        placeholder="хаашаа..."
        options={[
          { label: "Улаанбаатар", value: "ub" },
          { label: "Төв аймаг", value: "tuv" },
        ]}
      />
      <ScrollArea className="flex-1 min-h-0 py-2">
        <RHFRadio
          name="fromSoum"
          options={[
            { label: "Зуун мод", value: "zuunmod" },
            { label: "Алтан булаг", value: "altanbulag" },
          ]}
          parent="Төв аймаг"
        />
      </ScrollArea>
      <PrevNextBtn step={2} setStep={setStep} />
    </div>
  );
}
