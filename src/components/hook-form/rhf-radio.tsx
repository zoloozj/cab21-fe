import { useFormContext } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Iconify from "@/components/ui/iconify";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  label: string;
  value: any;
}

type Props = {
  name: string;
  placeholder?: string;
  options: Option[];
  parent: string;
};

export default function RHFRadio({
  name,
  placeholder = "",
  options,
  parent,
}: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col"
            >
              {options.map((option) => (
                <div key={option.value}>
                  <FormItem>
                    <label className="flex items-center justify-between w-full cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <div className="flex flex-col">
                          <p className="font-semibold text-md">
                            {option.label}
                          </p>
                          <span className="font-normal text-sm">{parent}</span>
                        </div>
                      </div>
                      <Iconify icon="solar:alt-arrow-right-linear" width={20} />
                    </label>
                  </FormItem>
                  <Separator className="my-2" />
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
