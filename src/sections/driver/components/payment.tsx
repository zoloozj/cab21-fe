import { Button } from "@/components/ui/button";
import RHFCurrencyInput from "@/components/hook-form/rhf-currency-input";
import PrevNextBtn from "./prev-next-btn";

interface Props {
  setStep: (a: number) => void;
}

export default function PaymentInfo({ setStep }: Props) {
  return (
    <div className="flex flex-col h-full overflow-hidden text-center">
      <p className="font-semibold my-4">Та төлбөрийн мэдээллээ оруулна уу.</p>
      <div className="flex-1 min-h-0 py-2">
        <RHFCurrencyInput
          name="payment"
          label=""
          className="h-12 text-center text-primary font-bold text-xl"
        />
      </div>
      <PrevNextBtn step={4} setStep={setStep} />
    </div>
  );
}
