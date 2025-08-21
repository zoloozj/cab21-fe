import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import RHFCombo from "@/components/hook-form/rhf-combo";
import RHFRadio from "@/components/hook-form/rhf-radio";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  setStep: (a: number) => void;
}

export default function FromSelect({ setStep }: Props) {
  const { watch } = useFormContext();

  const nextPage = () => {
    setStep(2);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <p className="font-semibold my-4">Та хаанаас хөдлөх вэ?</p>
      <RHFCombo
        name="fromAimag"
        placeholder="хаанаас..."
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
      <Button className="h-12" onClick={nextPage}>
        Дараах
      </Button>
    </div>
  );
}
