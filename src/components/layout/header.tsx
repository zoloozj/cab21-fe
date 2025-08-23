import Image from "next/image";

import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="py-3 md:py-6 px-4 xl:px-[300px] m-0 bg-white dark:bg-gray-800">
      {/* Web Header */}
      <div className="m-0 justify-between hidden md:flex">
        <Image
          className="dark:invert hidden md:block"
          src="/assets/logo.svg"
          alt="Cab21 logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex gap-2">
          <IconButton icon="solar:magnifer-linear" title="Хайх" />
          <Link href="driver-travel">
            <IconButton
              icon="solar:add-circle-linear"
              title=" Зар оруулах"
              className="cursor-pointer"
            />
          </Link>
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
      {/* Mobile Header */}
      <div className="flex md:hidden justify-between m-0 items-center">
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
        <Image
          src="/assets/logo2.svg"
          width={100}
          height={100}
          alt="Аваад явий"
        />
        <div className="flex items-center">
          <IconButton icon="solar:magnifer-linear" title="Хайх" />
          <Link href="driver-travel" className="cursor-pointer">
            <IconButton icon="solar:add-circle-linear" title=" Зар оруулах" />
          </Link>
        </div>
      </div>
    </div>
  );
}
