import { Loader2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import RHFInput from "@/components/hook-form/rhf-input";

interface Props {
  setStep: (a: number) => void;
  isLoading: boolean;
}

export default function PassengerNumber({ setStep, isLoading }: Props) {
  const { setValue, watch } = useFormContext();
  const passengerN = watch("passengerSeat");
  return (
    <div
      className="flex flex-col overflow-hidden text-center"
      style={{
        height: "calc(100vh - var(--header-height, 120px))",
        overflow: "hidden",
      }}
    >
      <p className="font-semibold my-4">Зорчигчийн тоо.</p>
      <div className="flex-1 h-0 py-2">
        <div className="flex justify-evenly items-center ">
          <Iconify
            icon="solar:minus-circle-linear"
            width={50}
            className="cursor-pointer"
            onClick={() => {
              if (passengerN !== 1) {
                setValue("passengerSeat", passengerN - 1);
              }
            }}
          />
          <RHFInput
            name="passengerSeat"
            className="h-12 text-center text-gray-800 font-bold text-2xl w-20 bg-white"
            type="number"
            disabled
          />
          <Iconify
            icon="solar:add-circle-linear"
            width={50}
            className="cursor-pointer"
            onClick={() => setValue("passengerSeat", passengerN + 1)}
          />
          {/* </Button> */}
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <Button
          className="h-12 flex-1"
          type="button"
          variant="outline"
          onClick={() => setStep(4)}
        >
          Буцах
        </Button>
        <Button type="submit" className="h-12 flex-1" disabled={isLoading}>
          {isLoading ? <Loader2Icon className="animate-spin" /> : "Хадгалах"}
        </Button>
      </div>
    </div>
  );
}
