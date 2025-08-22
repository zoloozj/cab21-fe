import RHFInput from "@/components/hook-form/rhf-input";
import PrevNextBtn from "./prev-next-btn";
import { Button } from "@/components/ui/button";
import Iconify from "@/components/ui/iconify";
import { useFormContext } from "react-hook-form";

interface Props {
  setStep: (a: number) => void;
}

export default function PassengerNumber({ setStep }: Props) {
  const { setValue, watch } = useFormContext();
  const passengerN = watch("passengerNumber");
  return (
    <div className="flex flex-col h-full overflow-hidden text-center">
      <p className="font-semibold my-4">Зорчигчийн тоо.</p>
      <div className="flex-1 h-0 py-2">
        <div className="flex justify-evenly items-center ">
          {/* <Button size="lg" variant="outline" className="h-20 w-20"> */}
          <Iconify
            icon="solar:minus-circle-linear"
            width={50}
            className="cursor-pointer"
            onClick={() => {
              if (passengerN !== 1) {
                setValue("passengerNumber", passengerN - 1);
              }
            }}
          />
          {/* </Button> */}
          <RHFInput
            name="passengerNumber"
            label=""
            className="h-12 text-center text-gray-800 font-bold text-2xl w-20"
            type="number"
            disabled
          />
          {/* <Button size="lg" variant="ghost" className="h-10 w-10"> */}
          <Iconify
            icon="solar:add-circle-linear"
            width={50}
            className="cursor-pointer"
            onClick={() =>
              setValue("passengerNumber", watch("passengerNumber") + 1)
            }
          />
          {/* </Button> */}
        </div>
      </div>
      <PrevNextBtn step={5} setStep={setStep} />
    </div>
  );
}
