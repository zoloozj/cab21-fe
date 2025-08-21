import { format } from "date-fns";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Props {
  setStep: (a: number) => void;
}

export default function TravelDateSelect({ setStep }: Props) {
  const { control } = useFormContext();
  const nextPage = () => {
    setStep(4);
  };
  return (
    <div className="flex flex-col h-full overflow-hidden text-center">
      <p className="font-semibold my-4">Та хэзээ явхаар төлөвлөж байна вэ?</p>
      <FormField
        control={control}
        name="travelDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] mx-auto text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "dd/MM/yyyy")
                ) : (
                  <span>Өдөр сонгоно уу!</span>
                )}
              </Button>
            </FormControl>
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date()}
              captionLayout="dropdown"
              className="w-full mb-5"
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="h-12" onClick={nextPage}>
        Дараах
      </Button>
    </div>
  );
}
