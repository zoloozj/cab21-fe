import Iconify from "@/components/ui/iconify";
import RHFInput from "@/components/hook-form/rhf-input";
import { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  icon: string;
  name: string;
};

export default function IconInput({ icon, name, ...other }: Props) {
  return (
    <div className="relative h-12 w-full mb-3">
      <Iconify
        width={20}
        color={icon}
        icon="solar:user-circle-linear"
        className="absolute left-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-500 z-10"
      />
      <RHFInput name={name} className="pl-10 py-4 h-12" {...other} />
    </div>
  );
}
