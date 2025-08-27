import { Button } from "@/components/ui/button";

interface Props {
  step: number;
  setStep: (a: number) => void;
  firstPage?: boolean;
}

export default function PrevNextBtn({ step, setStep, firstPage }: Props) {
  const prevPage = () => {
    setStep(step - 1);
  };
  const nextPage = () => {
    setStep(step + 1);
  };
  return (
    <div className="flex gap-2 w-full">
      {!firstPage && (
        <Button
          type="button"
          className="h-12 flex-1"
          variant="outline"
          onClick={prevPage}
        >
          Буцах
        </Button>
      )}
      <Button type="button" className="h-12 flex-1" onClick={nextPage}>
        Дараах
      </Button>
    </div>
  );
}
