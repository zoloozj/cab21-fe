import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: boolean;
}

type Props = {
  name: string;
  placeholder: string;
  item: Option;
};
export default function RFHCheckbox({ item, name, placeholder }: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-row items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value === item.value}
                onCheckedChange={(checked) => {
                  return checked ? field.onChange(true) : field.onChange(false);
                }}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
          </FormItem>
        );
      }}
    />
  );
}
