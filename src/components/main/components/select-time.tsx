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
import { Calendar } from "@/components/ui/calendar";

interface Props {
  name: string;
  icon: string;
  placeholder: string;
}

export default function SelectDate({ name, icon, placeholder }: Props) {
  const { control, setValue, watch } = useFormContext();
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
                <div className="relative">
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                      "flex-col md:flex-row gap-1 text-xs md:text-sm items-top"
                    )}
                    size="lg"
                  >
                    <Iconify icon={icon} color="#98A2B3" />
                    <span>
                      {field.value
                        ? field.value.toLocaleDateString("en-CA")
                        : placeholder}
                    </span>
                  </Button>
                  {watch("startTime") && (
                    <Iconify
                      icon="solar:close-circle-broken"
                      color="#dc2626"
                      className="cursor-pointer absolute -right-2 top-0"
                      width={20}
                      onClick={() => setValue("startTime", null)}
                    />
                  )}
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-min p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(event) => {
                  field.onChange(event);
                  setOpen(false);
                }}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                captionLayout="dropdown"
                className="w-full mb-5"
              />
              {/* <Command>
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
              </Command> */}
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
