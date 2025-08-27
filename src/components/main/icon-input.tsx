import { ComponentProps } from "react";

import Iconify from "@/components/ui/iconify";
import RHFInput from "@/components/hook-form/rhf-input";

type Props = ComponentProps<"input"> & {
  icon: string;
  color?: string;
  name: string;
  desc?: boolean;
};

export default function IconInput({
  icon,
  name,
  color = "",
  desc,
  ...other
}: Props) {
  return (
    <div className="relative h-12 w-full mb-3">
      <Iconify
        width={20}
        color={color}
        icon={icon}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
      />
      <RHFInput
        name={name}
        className="pl-10 py-4 h-12 bg-white"
        {...other}
        desc={desc}
      />
    </div>
  );
}
