import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import IconInput from "@/components/main/icon-input";
import { useRouter } from "next/navigation";
import RFHCheckbox from "@/components/hook-form/rhf-checkbox";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import TermsDialog from "./components/terms-dialog";

export default function CabInfo() {
  const router = useRouter();
  const { control, setValue } = useFormContext();
  const prevPage = () => {
    router.back();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-full">
        <div className="mb-5 relative w-full">
          <Link href="" onClick={prevPage} className="flex items-center gap-2">
            <Iconify
              icon="solar:alt-arrow-left-linear"
              width={20}
              color="#6a7282"
            />
            <span className="hidden md:block text-gray-500">Буцах</span>
          </Link>

          <div className="flex justify-center w-full -mt-5">
            <Image
              src="/assets/logo2.png"
              width={200}
              height={150}
              alt="Аваад явий"
              className=""
            />
          </div>
        </div>
        <p className="text-xl font-bold">Авто машины мэдээлэл</p>
        <div className="flex flex-col gap-3 mt-3">
          <IconInput
            icon="f7:number"
            name="plate"
            placeholder="Авто машины улсын дугаар"
          />
          <IconInput
            icon="fluent:vehicle-car-profile-20-regular"
            name="model"
            placeholder="Авто машины марк"
          />
          <IconInput
            icon="fluent:people-20-regular"
            name="passengerSeats"
            placeholder="Суудлын тоо"
            type="number"
          />
          <FormField
            control={control}
            name="terms"
            render={() => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <TermsDialog
                    onAccept={() =>
                      setValue("terms", true, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                  />
                </div>
                <FormMessage /> {/* terms алдаа энд харагдана */}
              </FormItem>
            )}
          />
        </div>
      </div>
      <Button type="submit" className="h-12">
        Бүртгэх
      </Button>
    </div>
  );
}
