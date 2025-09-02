import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  step: number;
  setStep: (a: number) => void;
  firstPage?: boolean;
  disabled?: boolean;
}

export default function PrevNextBtn({
  step,
  setStep,
  firstPage,
  disabled = false,
}: Props) {
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
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex-1">
            <Button
              type="button"
              className="h-12 w-full"
              onClick={nextPage}
              disabled={disabled}
            >
              Дараах
            </Button>
          </span>
        </TooltipTrigger>
        {disabled && (
          <TooltipContent>
            <p className="text-white">Та сонголт хийнэ үү!</p>
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
}
