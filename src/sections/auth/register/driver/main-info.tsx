import IconInput from "@/components/main/icon-input";
import { Button } from "@/components/ui/button";

export default function MainInfo() {
  return (
    <>
      <IconInput
        icon="solar:phone-rounded-linear"
        name="phone"
        placeholder="Утасны дугаар"
      />
      <IconInput
        icon="solar:phone-rounded-linear"
        name="lastName"
        placeholder="Овог"
      />
      <IconInput
        icon="solar:phone-rounded-linear"
        name="firstName"
        placeholder="Нэр"
      />
      <div className="text-center w-full">
        <Button
          type="button"
          className="mt-10 h-12 px-10 text-white font-bold text-md rounded-xl cursor-pointer"
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </>
  );
}
