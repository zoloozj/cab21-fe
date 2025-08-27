import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  name: string;
  desc?: boolean;
};

export default function RHFInput({ name, desc, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel className="text-gray-500">{label}</FormLabel> */}
          <FormControl>
            <Input {...field} {...other} />
          </FormControl>
          <FormDescription className="-mt-1 ml-2">
            {desc ? `(${other.placeholder})` : null}
          </FormDescription>
          <FormMessage className="-mt-3" />
        </FormItem>
      )}
    />
  );
}
