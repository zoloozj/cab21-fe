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
import PrevNextBtn from "./prev-next-btn";
import { ScrollArea } from "@/components/ui/scroll-area";
import RHFInput from "@/components/hook-form/rhf-input";

interface Props {
  setStep: (a: number) => void;
}

export default function TravelDateSelect({ setStep }: Props) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col h-full overflow-hidden text-center">
      <p className="font-semibold my-4">Та хэзээ явхаар төлөвлөж байна вэ?</p>
      <ScrollArea className="flex-1 min-h-0 py-2">
        <FormField
          control={control}
          name="startDate"
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
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                captionLayout="dropdown"
                className="w-full mb-5"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <RHFInput
          name="startTime"
          placeholder="Явах цаг"
          type="time"
          step="60"
          lang="en-GB"
          className="text-center h-12"
        />
      </ScrollArea>
      <PrevNextBtn step={3} setStep={setStep} />
    </div>
  );
}
