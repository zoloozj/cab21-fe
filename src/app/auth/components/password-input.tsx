import { useCallback, useState } from "react";

import Iconify from "@/components/ui/iconify";
import RHFInput from "@/components/hook-form/rhf-input";

interface Props {
  name: string;
  placeholder?: string;
}

export default function PasswordInput({
  name,
  placeholder = "Нууц үг",
}: Props) {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <div className="relative h-12 w-full">
      <Iconify
        width={20}
        color="#667085"
        icon="solar:lock-keyhole-minimalistic-linear"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
      />
      <RHFInput
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="px-10 py-2 text-md w-full h-12 bg-white"
      />
      <Iconify
        width={20}
        color="#667085"
        icon={show ? "solar:eye-closed-linear" : "solar:eye-linear"}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 cursor-pointer"
        onClick={toggle}
      />
    </div>
  );
}
