import { Button } from "@/components/ui/button";

interface Props {
  setStep: (a: number) => void;
}

export default function TravelTimePicker({ setStep }: Props) {
  const nextPage = () => {
    setStep(5);
  };
  const prevPage = () => {
    setStep(3);
  };
  return (
    <div className="flex flex-col h-full overflow-hidden text-center">
      <p className="font-semibold my-4">Та явах цагаа сонгоно уу.</p>
      <div className="flex-1 min-h-0 py-2">Time</div>
      <div className="flex gap-2">
        <Button className="h-12" variant="outline" onClick={prevPage}>
          Буцах
        </Button>
        <Button className="h-12" onClick={nextPage}>
          Дараах
        </Button>
      </div>
    </div>
  );
}
