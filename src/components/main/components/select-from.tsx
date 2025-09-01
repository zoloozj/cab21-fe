import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import { aimags, soums } from "@/components/constant";

interface Props {
  name: string;
  nameSub: string;
  icon: string;
  placeholder: string;
}

export default function SelectFrom({
  name,
  nameSub,
  icon,
  placeholder,
}: Props) {
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="ghost"
                  className={cn("flex gap-1 items-top")}
                  size="lg"
                >
                  <Iconify icon={icon} color="#98A2B3" />
                  <span className="hidden md:block">
                    {field.value
                      ? soums.find((language) => language.value === field.value)
                          ?.label
                      : placeholder}
                  </span>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Хайх..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Хайлт олдсонгүй...</CommandEmpty>
                  <CommandGroup>
                    {soums.map((language) => (
                      <CommandItem
                        value={language.value}
                        key={language.value}
                        onSelect={() => {
                          setValue(name, language.value);
                          const group = aimags.find(
                            (a) => a.value === language.parent
                          )?.label;
                          setValue(nameSub, group);
                          setOpen(false);
                        }}
                      >
                        <div className="flex flex-col">
                          <span>{language.label}</span>

                          <span className="text-muted-foreground text-xs">
                            {
                              aimags.find((a) => a.value === language.parent)
                                ?.label
                            }
                          </span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto",
                            language.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
