import Link from "next/link";
import Image from "next/image";

import Iconify from "@/components/ui/iconify";
import PasswordInput from "@/app/auth/components/password-input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface Props {
  setStep: (a: number) => void;
  isLoading: boolean;
  prev: number;
}

export default function PasswordForm({ setStep, isLoading, prev }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-full">
        <div className="mb-5 relative w-full">
          <Link
            href=""
            onClick={() => setStep(prev)}
            className="flex items-center gap-2"
          >
            <Iconify
              icon="solar:alt-arrow-left-linear"
              width={20}
              color="#6a7282"
            />
            <span className="hidden md:block text-gray-500">Буцах</span>
          </Link>
          <div className="flex justify-center w-full -mt-5">
            <Image
              src="/assets/logo2.svg"
              width={100}
              height={100}
              alt="Аваад явий"
            />
          </div>
        </div>
        <p className="text-xl font-bold">Нууц үг</p>
        <div className="flex flex-col gap-6 mt-3">
          <PasswordInput name="password" />
          <PasswordInput name="confirmPassword" placeholder="Нууц үг давтах" />
        </div>
      </div>
      <div className="text-center w-full">
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 px-16 text-white font-bold text-lg rounded-xl cursor-pointer"
        >
          {isLoading ? <Loader2Icon className="animate-spin" /> : "Бүртгүүлэх"}
        </Button>
      </div>
    </div>
  );
}
