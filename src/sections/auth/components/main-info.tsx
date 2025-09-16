import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import IconInput from "@/components/main/icon-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import TermsDialog from "@/sections/auth/register/cab/components/terms-dialog";

interface Props {
  setStep: (a: number) => void;
}

export default function PassengerMainInfo({ setStep }: Props) {
  const { getValues, setError, clearErrors, control, setValue } =
    useFormContext();

  const nextStep = useCallback(() => {
    let hasError = false;
    const {
      email,
      firstName,
      lastName,
      registryNumber,
      birthday,
      phone,
      terms,
    } = getValues();

    // Helper to mark an error and remember that the form has errors
    const markError = (name: string, message = "") => {
      setError(name, { type: "manual", message });
      hasError = true;
    };

    // 1) Required checks
    (
      [
        ["firstName", firstName],
        ["lastName", lastName],
        ["birthday", birthday],
        ["email", email],
        ["registryNumber", registryNumber],
        ["phone", phone],
        ["terms", terms],
      ] as const
    ).forEach(([key, value]) => {
      if (!value) {
        markError(key, "");
      } else {
        clearErrors(key);
      }
    });

    // 2) Format checks (only if present)
    if (email) {
      // simple, robust email pattern
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRe.test(email)) {
        markError("email", "И-Мэйл оруулна уу!");
      } else {
        clearErrors("email");
      }
    }

    if (registryNumber) {
      const regRe = /^[А-ЯЁҮӨҺa-яёүөһ]{2}\d{8}$/u;
      if (!regRe.test(registryNumber)) {
        markError("registryNumber", "Регистрийн буруу байна!");
      } else {
        clearErrors("registryNumber");
      }
    }

    if (!terms) {
      markError("terms", "Үйлчилгээний нөхцөлтэй танилцаж зөвшөөрнө үү!");
    } else clearErrors("terms");

    if (!hasError) setStep(2);
  }, [getValues, setError, clearErrors, setStep]);

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 min-h-0">
        <div className="mb-5 relative w-full">
          <Link href="/auth/login" className="flex items-center gap-2">
            <Iconify
              icon="solar:alt-arrow-left-linear"
              width={20}
              color="#6a7282"
            />
            <span className="hidden md:block text-gray-500">Буцах</span>
          </Link>

          <div className="flex justify-center w-full -mt-5">
            <Image
              src="/assets/logo.png"
              width={100}
              height={100}
              alt="Аваад явий"
            />
          </div>
        </div>
        <p className="text-xl font-bold">Ерөнхий мэдээлэл</p>
        <div className="flex flex-col gap-3 mt-3">
          <IconInput icon="mdi-light:email" name="email" placeholder="И-Мэйл" />
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
            name="registryNumber"
            placeholder="Регистрийн дугаар"
          />
          <IconInput
            icon="solar:phone-linear"
            name="phone"
            placeholder="Утасны дугаар"
            type="number"
          />
          <IconInput
            icon="solar:calendar-date-linear"
            name="birthday"
            placeholder="Төрсөн огноо"
            type="date"
            desc
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
      </ScrollArea>
      <div className="text-center w-full">
        <Button
          type="button"
          className="h-12 px-10 text-white font-bold text-md rounded-xl cursor-pointer"
          onClick={nextStep}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
