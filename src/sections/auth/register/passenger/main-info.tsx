import Link from "next/link";
import Image from "next/image";

import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import IconInput from "@/components/main/icon-input";
import RHFSelect from "@/components/hook-form/rhf-select";

interface Props {
  setStep: (a: number) => void;
}

export default function PassengerMainInfo({ setStep }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-full">
        <div className="mb-5 relative w-full">
          <Link href="/auth/register" className="flex items-center gap-2">
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
        <p className="text-xl font-bold">Ерөнхий мэдээлэл</p>
        <IconInput
          icon="solar:phone-linear"
          name="phone"
          placeholder="Утасны дугаар"
          type="number"
        />
        <IconInput
          icon="solar:user-circle-linear"
          name="lastName"
          placeholder="Овог"
        />
        <IconInput
          icon="solar:user-circle-linear"
          name="firstName"
          placeholder="Нэр"
        />
        <IconInput
          icon="ant-design:number-outlined"
          name="age"
          placeholder="Нас"
        />
        <RHFSelect
          icon="streamline-ultimate:gender-hetero"
          name="gender"
          placeholder="Хүйс"
          options={[
            { label: "Эрэгтэй", value: "male" },
            { label: "Эмэгтэй", value: "female" },
          ]}
        />
      </div>{" "}
      <div className="text-center w-full">
        <Button
          type="button"
          className="h-12 px-10 text-white font-bold text-md rounded-xl cursor-pointer"
          onClick={() => setStep(2)}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
