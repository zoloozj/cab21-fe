import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Iconify from "@/components/ui/iconify";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import PrevNextBtn from "./prev-next-btn";

interface Props {
  setStep: (a: number) => void;
}

export default function ReturnSelect({ setStep }: Props) {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <p className="font-semibold my-4 text-2xl">
        Та буцаж энэ маршрутаараа явах уу?
      </p>
      <div className="flex-1 h-0 py-2">
        <FormField
          control={control}
          name=""
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-2 justify-evenly"
                >
                  {[
                    { label: "Тийм", value: "1" },
                    { label: "Үгүй", value: "0" },
                  ].map((option) => (
                    <div key={option.value}>
                      <FormItem>
                        <label className="flex items-center justify-between cursor-pointer border py-4 px-6 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <div className="flex flex-col">
                              <p className="font-semibold text-md">
                                {option.label}
                              </p>
                            </div>
                          </div>
                        </label>
                      </FormItem>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <PrevNextBtn step={6} setStep={setStep} />
    </div>
  );
}
