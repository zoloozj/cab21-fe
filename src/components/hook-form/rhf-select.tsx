"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

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

interface Option {
  label: string;
  value: any;
}

type Props = {
  name: string;
  placeholder?: string;
  options: Option[];
  icon?: string;
};

export default function RHFSelect({
  name,
  placeholder,
  options,
  icon = "tabler:select",
}: Props) {
  const [open, setOpen] = useState(false);
  const { control, setValue } = useFormContext();
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
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full h-12 mt-2 justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Iconify
                      width={20}
                      icon={icon}
                      color="#6a7282"
                      // className="absolute left-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-500 z-10"
                    />
                    {field.value
                      ? options.find(
                          (language) => language.value === field.value
                        )?.label
                      : placeholder}
                  </div>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Хайлт..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Мэдээлэл олдсонгүй</CommandEmpty>
                  <CommandGroup>
                    {options.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        onSelect={() => {
                          setValue(name, language.value);
                          setOpen(false);
                        }}
                      >
                        {language.label}
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
