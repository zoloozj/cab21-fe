import { Button } from "@/components/ui/button";
import RHFCurrencyInput from "@/components/hook-form/rhf-currency-input";
import PrevNextBtn from "@/sections/driver/components/prev-next-btn";
import { useFormContext } from "react-hook-form";

interface Props {
  setStep: (a: number) => void;
}

export default function PaymentInfo({ setStep }: Props) {
  const { watch } = useFormContext();
  const { ticketPrice } = watch();
  return (
    <div
      className="flex flex-col overflow-hidden text-center"
      style={{
        height: "calc(100vh - var(--header-height, 120px))",
        overflow: "hidden",
      }}
    >
      <p className="font-semibold my-4">Та төлбөрийн мэдээллээ оруулна уу.</p>
      <div className="flex-1 min-h-0 py-2">
        <RHFCurrencyInput
          name="ticketPrice"
          label=""
          className="h-12 text-center text-primary font-bold text-xl bg-white"
        />
      </div>
      <PrevNextBtn step={4} setStep={setStep} disabled={!ticketPrice} />
    </div>
  );
}
