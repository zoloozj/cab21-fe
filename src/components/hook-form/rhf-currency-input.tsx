import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  name: string;
  label?: string;
};

export default function RHFCurrencyInput({ name, label, ...other }: Props) {
  function formatCurrency(value: string | number): string {
    const number =
      typeof value === "string"
        ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
        : value;
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace("MNT", "₮");
  }

  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value ? formatCurrency(field.value) : ""}
              onChange={(event) => {
                const rawValue = event.target.value.replace(/[^0-9.]/g, "");
                const numericValue = parseFloat(rawValue);
                field.onChange(isNaN(numericValue) ? "" : numericValue);
              }}
              onBlur={() => {
                if (field.value) {
                  const numericValue = parseFloat(field.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }
              }}
              {...other}
            />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
