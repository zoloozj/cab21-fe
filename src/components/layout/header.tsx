import Image from "next/image";

import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";

export default function Header() {
  return (
    <div className="py-6 px-[300px] m-0 bg-white dark:bg-gray-800">
      <div className="m-0 flex justify-between">
        <Image
          className="dark:invert"
          src="/assets/logo.svg"
          alt="Cab21 logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex gap-2">
          <IconButton icon="solar:magnifer-linear" title="Хайх" />
          <IconButton icon="solar:add-circle-linear" title=" Зар оруулах" />

          <Button variant="ghost" className="flex gap-2 items-center" size="lg">
            <Iconify icon="solar:add-circle-linear" />
            Зар оруулах
          </Button>
          <Button variant="ghost" className="flex gap-2 items-center" size="lg">
            <Image
              className="dark:invert"
              src="/assets/profile.svg"
              alt="Cab21 logo"
              width={30}
              height={30}
              priority
            />
            <Iconify icon="solar:alt-arrow-down-linear" color="#667085" />
          </Button>
        </div>
      </div>
    </div>
  );
}
